from sqlalchemy import create_engine
from sqlalchemy.orm import declarative_base
from sqlalchemy.orm import sessionmaker

"""
    -----------------------------------------
    Config for live database
    -----------------------------------------
"""

SQLALCHEMY_DATABASE_URL = 'postgresql://postgres:postgres@localhost:5432/taskly'

engine = create_engine(SQLALCHEMY_DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

Base = declarative_base()
