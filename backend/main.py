from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes.auth import auth_router
from models import UserCreate, UserLogin

app = FastAPI()

# CORS Setup for frontend connection
app.add_middleware(
    CORSMiddleware,
   allow_origins=[
    "http://localhost:5173",  # local testing
    "https://rohit-engineering.github.io",  # GitHub Pages
    "https://rohit-engineering.github.io/Mentorloop/",  # Specific path if hosted inside subdirectory
],  # Frontend port
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth_router)
