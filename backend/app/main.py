from fastapi import FastAPI
from database import Base, engine

from crud import router

app = FastAPI()

# initialise db
Base.metadata.create_all(bind=engine)

app.include_router(router, prefix='/api/tasks')