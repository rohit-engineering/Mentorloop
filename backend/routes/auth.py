from fastapi import APIRouter, HTTPException
from models import UserCreate, UserLogin
from database import users_collection
from utils.hashing import hash_password, verify_password

auth_router = APIRouter()

@auth_router.post("/signup")
def signup(user: UserCreate):
    if users_collection.find_one({"email": user.email}):
        raise HTTPException(status_code=400, detail="Email already exists")

    user_dict = user.dict()
    user_dict["password"] = hash_password(user.password)
    users_collection.insert_one(user_dict)
    
    return {
        "message": "Signup successful",
        "email": user.email,
        "role": user.role
    }

@auth_router.post("/login")
def login(user: UserLogin):
    db_user = users_collection.find_one({"email": user.email})
    if not db_user:
        raise HTTPException(status_code=404, detail="User not found")

    if not verify_password(user.password, db_user["password"]):
        raise HTTPException(status_code=401, detail="Incorrect password")

    return {
        "message": "Login successful",
        "email": db_user["email"],
        "role": db_user.get("role", "learner")  # default to learner if missing
    }
