from sqlalchemy import create_engine
from sqlalchemy.orm import declarative_base
from sqlalchemy.orm import sessionmaker

""" 
    -------------------------
    LIVE DB CONFIG
    -------------------------
"""

SQLALCHEMY_DATABASE_URL = "postgresql://postgres:postgres@localhost:5432/taskly"

engine = create_engine(SQLALCHEMY_DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

Base = declarative_base()

""" 
    -------------------------
    TEST DB CONFIG
    -------------------------
"""

SQLALCHEMY_TEST_DATABASE_URL = "postgresql://postgres:postgres@localhost:5432/taskly_test"

test_engine = create_engine(SQLALCHEMY_TEST_DATABASE_URL)
SessionLocalTest = sessionmaker(autocommit=False, autoflush=False, bind=test_engine)

def get_test_db():
    db = SessionLocalTest()
    try:
        yield db
    finally:
        db.close()