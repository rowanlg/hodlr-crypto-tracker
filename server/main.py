from fastapi import FastAPI
from datetime import datetime
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
import requests
from requests.exceptions import ConnectionError, Timeout, TooManyRedirects
import json


app = FastAPI()


##### CORS Settings #####
origins = [
    "http://localhost.tiangolo.com",
    "https://localhost.tiangolo.com",
    "http://localhost",
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["GET", "PUT", "POST", "DELETE"],
    allow_headers=["*"],
)

##### Data model for User #####
class User(BaseModel):
  user_id: int
  name: str
  total_capital: float
  investments: float
  liquidity: float

##### Data model for Buys #####
class Buy(BaseModel):
  name: str
  ticker: str
  price_bought_for: float
  amount: float
  datetime: datetime
  location: str

##### Data model for Sells #####
class Sell(BaseModel):
  name: str
  ticker: str
  price_sold_for: float
  amount: float
  datetime: datetime
  location: str

##### Fake database to act as data until SQL server is setup #####
fake_database = {
  "buys": {
    0: {
      "name": "Bitcoin",
      "ticker": "BTC",
      "price_bought_for": 13450.55,
      "amount": 5.44,
      "datetime": "2021-09-15T15:53:00+05:00",
      "location": "Binance"
    },
    1: {
      "name": "Ethereum",
      "ticker": "ETH",
      "price_bought_for": 1502.55,
      "amount": 55.29,
      "datetime": "2022-09-13T15:53:00+05:00",
      "location": "Coinbase"
    }
  },
  "sells": {
    0: {
      "name": "Bitcoin",
      "ticker": "BTC",
      "price_bought_for": 13450.55,
      "amount": 5.44,
      "datetime": "2022-10-01T15:53:00+05:00",
      "location": "Binance"
    },
    1: {
      "name": "Ethereum",
      "ticker": "ETH",
      "price_bought_for": 70000.55,
      "amount": 55.29,
      "datetime": "2022-10-01T15:53:00+05:00",
      "location": "Coinbase"
    }
  }
}



##### Get all buys #####
@app.get('/user/buys')
async def get_buys():
  return fake_database["buys"]

##### Get all sells #####
@app.get('/user/sells')
async def get_buys():
  return fake_database["sells"]


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
    "datetime": investment.datetime,
    "location": investment.location
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
    "datetime": investment.datetime,
    "location": investment.location
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
    "datetime": investment.datetime,
    "location": investment.location
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
    "datetime": investment.datetime,
    "location": investment.location
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


url_string = ""
counter = 0

for item in fake_database["buys"].items():
  if (counter == 0):
    url_string += item[1]['name'].lower()
    counter += 1
  elif (counter > 0):
    url_string += "%2C" + item[1]['name'].lower()
    counter += 1


url = f'https://api.coingecko.com/api/v3/simple/price?ids={url_string}&vs_currencies=gbp'


try:
  response = requests.get(url, None)
  data = json.loads(response.text)
  print(data)
except (ConnectionError, Timeout, TooManyRedirects) as e:
  print(e)

##### Get Prices of invested coins #####
@app.get('/user/prices')
async def get_prices():
  return data