from typing import List, Union
from datetime import datetime
from pydantic import BaseModel

########## ITEMS ##########
class ItemBase(BaseModel):
    type: str
    name: str
    ticker: str
    price_bought_for: float
    amount: float
    datetime: datetime
    location: str

class ItemCreate(ItemBase):
    pass

class Item(ItemBase):
    id: int
    owner_id: int

    class Config:
        orm_mode = True


########## USER ##########
class UserBase(BaseModel):
    email: str


class UserCreate(UserBase):
    hashed_password: str

    class Config:
        orm_mode = True


class User(UserBase):
    id: int

    class Config:
        orm_mode = True

class UserInDB(User):
    hashed_password: str


########## COINS HELD ##########
class CoinsHeldBase(BaseModel):
    name: str
    amount: float

class CoinsHeldCreate(CoinsHeldBase):
    pass

class CoinsHeld(CoinsHeldBase):
    owner_id: int

    class Config:
        orm_mode = True

########## TOKEN ##########
# class Token(BaseModel):
#     access_token: str
#     token_type: str

# class TokenData(BaseModel):
#     username: Union[str, None] = None





# class ItemBase(BaseModel):
#     type: str
#     name: str
#     ticker: str
#     price_bought_for: float
#     amount: float
#     datetime: datetime
#     location: str


# class ItemCreate(ItemBase):
#     pass


# class Item(ItemBase):
#     id: int
#     owner_id: int

#     class Config:
#         orm_mode = True


# class UserBase(BaseModel):
#     email: str
#     username: str


# class UserCreate(UserBase):
#     password: str


# class User(UserBase):
#     id: int
#     is_active: bool
#     items: List[Item] = []

#     class Config:
#         orm_mode = True