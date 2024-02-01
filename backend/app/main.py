from fastapi import FastAPI
from db import Base, engine

from crud import router

# initialise db
Base.metadata.create_all(bind=engine)

app = FastAPI()

app.include_router(router, prefix='/api/tasks')