from fastapi import Depends
from fastapi.testclient import TestClient
from main import app
import pytest

# db
from test_db import test_engine
from db import Base
from sqlalchemy.orm import Session

# models
from models import Task

# types
from datetime import datetime

client = TestClient(app)


# initialise test db session
@pytest.fixture
def db():
    Base.metadata.create_all(bind=test_engine)

    session = Session(test_engine)
    yield session

    session.close()


def test_save_task(db: Session):
    # create task with mock data
    task_data = {
        "description": "Test Task", 
        "due_date": datetime.now()
    }
    task = Task(**task_data)
    task.save(db)

    assert task.id is not None
    assert db.query(Task).get(task.id) is not None
