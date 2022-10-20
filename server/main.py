from typing import List
import fastapi
from fastapi import security

from sqlalchemy import orm
from fastapi.middleware.cors import CORSMiddleware
import services, schemas

import requests
from requests.exceptions import ConnectionError, Timeout, TooManyRedirects
import json

app = fastapi.FastAPI()

##### CORS Settings #####
origins = [
    "http://localhost.tiangolo.com",
    "https://localhost.tiangolo.com",
    "http://localhost",
    "http://localhost:3000",
    "http://localhost:3000/login",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["GET", "PUT", "POST", "DELETE"],
    allow_headers=["*"],
)


@app.on_event("startup")
async def startup():
    services.create_database()

@app.post("/api/users")
async def create_user(
    user: schemas.UserCreate, db: orm.Session = fastapi.Depends(services.get_db)
):
    db_user = await services.get_user_by_email(user.email, db)
    if db_user:
        raise fastapi.HTTPException(status_code=400, detail="Email already in use")

    user = await services.create_user(user, db)

    return await services.create_token(user)


@app.post("/api/token")
async def generate_token(
    form_data: security.OAuth2PasswordRequestForm = fastapi.Depends(),
    db: orm.Session = fastapi.Depends(services.get_db),
):
    user = await services.authenticate_user(form_data.username, form_data.password, db)

    if not user:
        raise fastapi.HTTPException(status_code=401, detail="Invalid Credentials")

    return await services.create_token(user)


@app.get("/api/users/me", response_model=schemas.User)
async def get_user(user: schemas.User = fastapi.Depends(services.get_current_user)):
    return user


@app.post("/api/investment", response_model=schemas.Item)
async def create_investment(
    investment: schemas.ItemCreate,
    user: schemas.User = fastapi.Depends(services.get_current_user),
    db: orm.Session = fastapi.Depends(services.get_db),
):
    return await services.create_investment(user=user, db=db, investment=investment)


@app.post("/api/coins_held", response_model=schemas.CoinsHeld)
async def create_coin(
    coins_held: schemas.CoinsHeldCreate,
    user: schemas.User = fastapi.Depends(services.get_current_user),
    db: orm.Session = fastapi.Depends(services.get_db),
):
    return await services.create_coin(user=user, db=db, coins_held=coins_held)

@app.get("/api/investments", response_model=List[schemas.Item])
async def get_investments(
    user: schemas.User = fastapi.Depends(services.get_current_user),
    db: orm.Session = fastapi.Depends(services.get_db),
):
    return await services.get_investments(user=user, db=db)

@app.get("/api/coins_held", response_model=List[schemas.CoinsHeld])
async def get_coins_held(
    user: schemas.User = fastapi.Depends(services.get_current_user),
    db: orm.Session = fastapi.Depends(services.get_db),
):
    return await services.get_coins_held(user=user, db=db)


@app.get("/api/investments/{investment_id}", status_code=200)
async def get_investments(
    investment_id: int,
    user: schemas.User = fastapi.Depends(services.get_current_user),
    db: orm.Session = fastapi.Depends(services.get_db),
):
    return await services.get_investment(investment_id, user, db)


@app.delete("/api/investment/{investment_id}", status_code=204)
async def delete_investment(
    investment_id: int,
    user: schemas.User = fastapi.Depends(services.get_current_user),
    db: orm.Session = fastapi.Depends(services.get_db),
):
    await services.delete_investment(investment_id, user, db)
    return {"message", "Successfully Deleted"}


@app.put("/api/investment/{investment_id}", status_code=200)
async def update_investment(
    investment_id: int,
    investment: schemas.ItemCreate,
    user: schemas.User = fastapi.Depends(services.get_current_user),
    db: orm.Session = fastapi.Depends(services.get_db),
):
    await services.update_investment(investment_id, investment, user, db)
    return {"message", "Successfully Updated"}

@app.put("/api/coins_held/{coin_name}", status_code=200)
async def update_coin(
    coin_name: str,
    coins_held: schemas.CoinsHeldCreate,
    user: schemas.User = fastapi.Depends(services.get_current_user),
    db: orm.Session = fastapi.Depends(services.get_db),
):
    await services.update_coin(coin_name, coins_held, user, db)
    return {"message", "Successfully Updated"}


@app.get("/")
async def root():
    return {"message": "Hodlr Crypto Tracker"}


##### Get Prices of invested coins #####
@app.get('/api/prices')
async def get_prices(
    user: schemas.User = fastapi.Depends(services.get_current_user),
    db: orm.Session = fastapi.Depends(services.get_db),
):
    url_string = ""
    counter = 0
    coins_held = await services.get_coins_held(user=user, db=db)

    # print(coins_held)

    for item in coins_held:
        if (counter == 0):
            url_string += item.name.lower()
            counter += 1
        elif (counter > 0):
            url_string += "%2C" + item.name.lower()
            counter += 1


    print(url_string)

    url = f'https://api.coingecko.com/api/v3/simple/price?ids={url_string}&vs_currencies=gbp&include_24hr_change=true'

    try:
        response = requests.get(url, None)
        data = json.loads(response.text)
        print(data)
    except (ConnectionError, Timeout, TooManyRedirects) as e:
        print(e)

    return data

