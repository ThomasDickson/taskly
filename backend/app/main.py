from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from db import Base, engine

from crud import router

# initialise db
Base.metadata.create_all(bind=engine)

app = FastAPI()

# enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=['http://localhost:3000'],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(router, prefix='/api/tasks', tags=['Tasks'])