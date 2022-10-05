from fastapi import FastAPI
from datetime import datetime
from pydantic import BaseModel

app = FastAPI()

##### Data model for Buys #####
class Buy(BaseModel):
  name: str
  ticker: str
  price_bought_for: float
  amount: float
  datetime: datetime

##### Data model for Sells #####
class Sell(BaseModel):
  name: str
  ticker: str
  price_sold_for: float
  amount: float
  datetime: datetime

##### Fake database to act as data until SQL server is setup #####
fake_database = {
  "buys": {
    1: {
      "name": "Bitcoin",
      "ticker": "BTC",
      "price_bought_for": 13450.55,
      "amount": 5.44,
      "datetime": "2022-09-15T15:53:00+05:00"
    },
    2: {
      "name": "Ethereum",
      "ticker": "ETH",
      "price_bought_for": 2002.55,
      "amount": 55.29,
      "datetime": "2022-09-15T15:53:00+05:00"
    }
  },
  "sells": {
    1: {
      "name": "Bitcoin",
      "ticker": "BTC",
      "price_bought_for": 13450.55,
      "amount": 5.44,
      "datetime": "2022-10-01T15:53:00+05:00"
    },
    2: {
      "name": "Ethereum",
      "ticker": "ETH",
      "price_bought_for": 2002.55,
      "amount": 55.29,
      "datetime": "2022-10-01T15:53:00+05:00"
    }
  }
}

##### Get an buy by item_id #####
@app.get('/user/buy/{item_id}')
async def get_buy(item_id: int):
  return fake_database["buys"][item_id]

##### Get an sell by item_id #####
@app.get('/user/sell/{item_id}')
async def get_sell(item_id: int):
  return fake_database["sells"][item_id]


##### Create a new buy #####
@app.post('/user/buy')
async def create_buy(investment: Buy):
  new_id = len(fake_database["buys"].keys()) + 1
  fake_database["buys"][new_id] = {
    "name": investment.name,
    "ticker": investment.ticker,
    "price_bought_for": investment.price_bought_for,
    "amount": investment.amount,
  }
  return fake_database["buys"]

##### Create a new sell #####
@app.post('/user/sell')
async def create_sell(investment: Sell):
  new_id = len(fake_database["sells"].keys()) + 1
  fake_database["sells"][new_id] = {
    "name": investment.name,
    "ticker": investment.ticker,
    "price_bought_for": investment.price_sold_for,
    "amount": investment.amount,
  }
  return fake_database["sells"]


##### Update a buy by item_id #####
@app.put('/user/buy/{item_id}')
async def update_buy(item_id: int, investment: Buy):
  fake_database["buys"][item_id] = {
    "name": investment.name,
    "ticker": investment.ticker,
    "price_bought_for": investment.price_bought_for,
    "amount": investment.amount,
  }
  return fake_database["buys"]

##### Update a sell by item_id #####
@app.put('/user/sell/{item_id}')
async def update_buy(item_id: int, investment: Sell):
  fake_database["sells"][item_id] = {
    "name": investment.name,
    "ticker": investment.ticker,
    "price_bought_for": investment.price_sold_for,
    "amount": investment.amount,
  }
  return fake_database["sells"]


##### Delete a buy by item_id #####
@app.delete('/user/buy/{item_id}')
async def delete_buy(item_id: int):
  del fake_database["buys"][item_id]
  return fake_database["buys"]

##### Delete a sell by item_id #####
@app.delete('/user/sell/{item_id}')
async def delete_buy(item_id: int):
  del fake_database["sells"][item_id]
  return fake_database["sells"]