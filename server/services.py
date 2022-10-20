import fastapi
from fastapi import security
import jwt
import datetime 
from sqlalchemy import orm
from passlib import hash
import os
from dotenv import load_dotenv
import database, models, schemas

load_dotenv()

oauth2schema = security.OAuth2PasswordBearer(tokenUrl="/api/token")

JWT_SECRET = os.getenv('SECRET_KEY')


def create_database():
    return database.Base.metadata.create_all(bind=database.engine)


def get_db():
    db = database.SessionLocal()
    try:
        yield db
    finally:
        db.close()


async def get_user_by_email(email: str, db: orm.Session):
    return db.query(models.User).filter(models.User.email == email).first()


async def create_user(user: schemas.UserCreate, db: orm.Session):
    user_obj = models.User(
        email=user.email, hashed_password=hash.bcrypt.hash(user.hashed_password)
    )
    db.add(user_obj)
    db.commit()
    db.refresh(user_obj)
    return user_obj


async def authenticate_user(email: str, password: str, db: orm.Session):
    user = await get_user_by_email(db=db, email=email)

    if not user:
        return False

    if not user.verify_password(password):
        return False

    return user


async def create_token(user: models.User):
    user_obj = schemas.User.from_orm(user)

    token = jwt.encode(user_obj.dict(), JWT_SECRET)

    return dict(access_token=token, token_type="bearer")


async def get_current_user(
    db: orm.Session = fastapi.Depends(get_db),
    token: str = fastapi.Depends(oauth2schema),
):
    try:
        payload = jwt.decode(token, JWT_SECRET, algorithms=["HS256"])
        user = db.query(models.User).get(payload["id"])
    except:
        raise fastapi.HTTPException(
            status_code=401, detail="Invalid Email or Password"
        )

    return schemas.User.from_orm(user)


async def create_investment(user: schemas.User, db: orm.Session, investment: schemas.ItemCreate):
    investment = models.Item(**investment.dict(), owner_id=user.id)
    db.add(investment)
    db.commit()
    db.refresh(investment)
    return schemas.Item.from_orm(investment)

async def create_coin(user: schemas.User, db: orm.Session, coins_held: schemas.CoinsHeldCreate):
    coins_held = models.CoinsHeld(**coins_held.dict(), owner_id=user.id)
    db.add(coins_held)
    db.commit()
    db.refresh(coins_held)
    return schemas.CoinsHeld.from_orm(coins_held)

async def get_investments(user: schemas.User, db: orm.Session):
    items = db.query(models.Item).filter_by(owner_id=user.id)

    return list(map(schemas.Item.from_orm, items))

async def get_coins_held(user: schemas.User, db: orm.Session):
    coins = db.query(models.CoinsHeld).filter_by(owner_id=user.id)

    return list(map(schemas.CoinsHeld.from_orm, coins))


async def investment_selector(investment_id: int, user: schemas.User, db: orm.Session):
    investment = (
        db.query(models.Item)
        .filter_by(owner_id=user.id)
        .filter(models.Item.id == investment_id)
        .first()
    )

    if investment is None:
        raise fastapi.HTTPException(status_code=404, detail="Investment does not exist")

    return investment


async def get_investment(investment_id: int, user: schemas.User, db: orm.Session):
    investment = await investment_selector(investment_id=investment_id, user=user, db=db)

    return schemas.Lead.from_orm(investment)


async def delete_investment(investment_id: int, user: schemas.User, db: orm.Session):
    investment = await investment_selector(investment_id, user, db)

    db.delete(investment)
    db.commit()

async def update_investment(investment_id: int, item: schemas.ItemCreate, user: schemas.User, db: orm.Session):
    investment_db = await investment_selector(investment_id, user, db)

    investment_db.type = item.type
    investment_db.name = item.name
    investment_db.ticker = item.ticker
    investment_db.price_bought_for = item.price_bought_for
    investment_db.amount = item.amount
    investment_db.datetime = item.datetime
    investment_db.location = item.location

    db.commit()
    db.refresh(investment_db)

    return schemas.Item.from_orm(investment_db)

async def coin_selector(coin_name: str, user: schemas.User, db: orm.Session):
    coin = (
        db.query(models.CoinsHeld)
        .filter_by(owner_id=user.id)
        .filter(models.CoinsHeld.name == coin_name)
        .first()
    )

    if coin is None:
        raise fastapi.HTTPException(status_code=404, detail="Investment does not exist")

    return coin

async def update_coin(coin_name: str, item: schemas.CoinsHeldCreate, user: schemas.User, db: orm.Session):
    coins_db = await coin_selector(coin_name, user, db)

    coins_db.name = item.name
    coins_db.amount = item.amount

    db.commit()
    db.refresh(coins_db)

    return schemas.CoinsHeld.from_orm(coins_db)