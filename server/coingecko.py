import requests
from main import *
from requests.exceptions import ConnectionError, Timeout, TooManyRedirects
import json
# from dotenv import load_dotenv


for item in main.fake_database.buys.items():
  print(item)
url = 'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=gbp'


try:
  response = requests.get(url, None)
  data = json.loads(response.text)
  print(data)
except (ConnectionError, Timeout, TooManyRedirects) as e:
  print(e)