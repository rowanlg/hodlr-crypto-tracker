from requests import Request, Session
from requests.exceptions import ConnectionError, Timeout, TooManyRedirects
import json
from dotenv import load_dotenv
import os
# from os.path import join, dirname
load_dotenv("./.env")
######### problem with env

# url = 'https://sandbox-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest'
# parameters = {
#   'symbol': "BTC",
#   'convert':'GBP'
# }
# headers = {
#   'Accepts': 'application/json',
#   'X-CMC_PRO_API_KEY': os.environ.get("CMC_PRO_API_KEY"),
# }

# session = Session()
# session.headers.update(headers)

# try:
#   response = session.get(url, params=parameters)
#   data = json.loads(response.text)
#   print(data)
# except (ConnectionError, Timeout, TooManyRedirects) as e:
#   print(e)


url = 'https://api.coingecko.com/api/v3/coins/'
parameters = {
  'id': "bitcoin",
}
headers = {
  'Accepts': 'application/json',
}

session = Session()
session.headers.update(headers)

try:
  response = session.get(url, params=parameters)
  data = json.loads(response.text)
  print(data)
except (ConnectionError, Timeout, TooManyRedirects) as e:
  print(e)