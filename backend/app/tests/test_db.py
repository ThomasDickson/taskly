from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

"""
    -----------------------------------------
    Config for testing database
    -----------------------------------------
"""

SQLALCHEMY_TEST_DATABASE_URL = "postgresql://postgres:postgres@localhost:5432/taskly_test"

test_engine = create_engine(SQLALCHEMY_TEST_DATABASE_URL)
TestSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=test_engine)

def get_test_db():
    db = TestSessionLocal()
    try:
        yield db
    finally:
        db.close()