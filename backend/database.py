from pymongo import MongoClient
import os
from dotenv import load_dotenv

load_dotenv()
MONGO_URL = os.getenv("MONGO_URL", "mongodb+srv://rk4817341:database123@learning.tp7iemb.mongodb.net/?retryWrites=true&w=majority&appName=Learning")

client = MongoClient(MONGO_URL)
db = client['account_manager_db']
users_collection = db['users']
