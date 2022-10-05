from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()

class Investment(BaseModel):
  name: str
  ticker: str
  price_bought_for: float
  amount: float

fake_database = {
  1: {
    "name": "Bitcoin",
    "ticker": "BTC",
    "price_bought_for": 13450.55,
    "amount": 5.44,
  },
  2: {
    "name": "Ethereum",
    "ticker": "ETH",
    "price_bought_for": 2002.55,
    "amount": 55.29,
  }
}

@app.get("/")
async def root():
    return {"message": "Hello World"}

@app.post('/user/investments')
async def create_investment(investment: Investment):
  new_id = len(fake_database.keys()) + 1
  fake_database[new_id] = {
    "name": investment.name,
    "ticker": investment.ticker,
    "price_bought_for": investment.price_bought_for,
    "amount": investment.amount,
  }
  return fake_database