from fastapi import FastAPI
from datetime import datetime
from pydantic import BaseModel

app = FastAPI()

class Buy(BaseModel):
  name: str
  ticker: str
  price_bought_for: float
  amount: float
  datetime: datetime

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
@app.get('/user/investments/{item_id}')
async def get_investment(item_id: int):
  return fake_database["buys"][item_id]

##### Create a new buy #####
@app.post('/user/investments')
async def create_investment(investment: Buy):
  new_id = len(fake_database["buys"].keys()) + 1
  fake_database["buys"][new_id] = {
    "name": investment.name,
    "ticker": investment.ticker,
    "price_bought_for": investment.price_bought_for,
    "amount": investment.amount,
  }
  return fake_database["buys"]

##### Update a buy by item_id #####
@app.put('/user/investments{item_id}')
async def update_investment(item_id: int, investment: Buy):
  fake_database["buys"][item_id] = {
    "name": investment.name,
    "ticker": investment.ticker,
    "price_bought_for": investment.price_bought_for,
    "amount": investment.amount,
  }
  return fake_database["buys"]

##### Delete a buy by item_id #####
@app.delete('/user/investments/{item_id}')
async def delete_investment(item_id: int):
  del fake_database["buys"][item_id]
  return fake_database["buys"]