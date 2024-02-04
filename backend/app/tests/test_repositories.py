from fastapi import Depends
from fastapi.testclient import TestClient
from main import app
import pytest

# db
from test_db import test_engine
from db import Base
from sqlalchemy.orm import Session

# repositories
from repositories import TaskRepository

# types
from datetime import date

client = TestClient(app)


# fixture to initialise db session and clean up with each test
@pytest.fixture
def db():
    # initialise test db
    Base.metadata.create_all(bind=test_engine)

    session = Session(test_engine)
    yield session

    session.close()

    # drop all data
    Base.metadata.drop_all(bind=test_engine)


# Fixture to provide the repository with the clean database session
@pytest.fixture
def task_repository(db: Session):
    return TaskRepository(db)


def test_create_task(task_repository: TaskRepository):
    task_data = {
        'description': 'Test Task', 
        'due_date': date.today(),
        'comments': None
    }

    # create task with mock data
    task = task_repository.create(**task_data)
    
    assert task.id is not None
    assert task.description == task_data['description']
    assert task.due_date == task_data['due_date']
    assert task.comments == task_data['comments']


def test_get_task(task_repository: TaskRepository):
    task_data = {
        'description': 'Test Task', 
        'due_date': date.today(),
        'comments': None
    }

    # create a task with mock data
    task = task_repository.create(**task_data)
    assert task.id is not None

    # retrieve the task
    retrieved_task = task_repository.get(task.id)
    
    # ensure it exists in DB
    assert retrieved_task is not None
    assert retrieved_task.id == task.id


def test_delete_task(task_repository: TaskRepository):
    task_data = {
        'description': 'Test Task', 
        'due_date': date.today(),
        'comments': None
    }

    # create a task with mock data
    task = task_repository.create(**task_data)
    assert task.id is not None

    # delete the task
    task_repository.delete(task)

    # ensure it no longer exists
    deleted_task = task_repository.get(task.id)
    assert deleted_task is None


def test_update_task(task_repository: TaskRepository):
    task_data = {
        'description': 'Test Task', 
        'due_date': date.today(),
        'comments': None
    }

    # create a task with mock data
    task = task_repository.create(**task_data)
    assert task.id is not None

    update_data = {
        'description': 'New Task Desc',
        'comments': 'New Comment'
    }

    updated_task = task_repository.update(task, **update_data)

    assert updated_task.id == task.id
    assert updated_task.description == update_data['description']
    assert updated_task.comments == update_data['comments']



