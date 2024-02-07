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
from datetime import date, timedelta

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


# fixture to provide the repository with a clean database session
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


def test_get_all_tasks(task_repository: TaskRepository):
    # create a task with mock data
    task_a = task_repository.create(
        description='Task A', 
        due_date=date.today(),
        comments=None
    )

    task_b = task_repository.create(
        description='Task B', 
        due_date=date.today(),
        comments=None
    )

    assert task_a.id is not None
    assert task_b.id is not None

    # retrieve the tasks
    tasks = task_repository.get_all()

    # ensure both tasks were retrieved
    assert len(tasks) == 2
    assert task_a in tasks
    assert task_b in tasks


def test_get_all_tasks_with_search(task_repository: TaskRepository):
    # create a task with mock data
    task_a = task_repository.create(
        description='Task A', 
        due_date=date.today(),
        comments=None
    )

    task_b = task_repository.create(
        description='Task B', 
        due_date=date.today(),
        comments=None
    )

    assert task_a.id is not None
    assert task_b.id is not None

    # retrieve the tasks
    tasks = task_repository.get_all(search='b')

    # ensure only task b was retrieved
    assert len(tasks) == 1
    assert task_b in tasks
    assert task_a not in tasks


def test_get_all_tasks_asc(task_repository: TaskRepository):
    # create a task with mock data
    task_a = task_repository.create(
        description='Task A', 
        due_date=date.today(),
        comments=None
    )

    task_b = task_repository.create(
        description='Task B', 
        due_date=date.today() + timedelta(days=1),
        comments=None
    )

    assert task_a.id is not None
    assert task_b.id is not None

    # retrieve the tasks
    tasks = task_repository.get_all()

    # ensure correct order
    assert len(tasks) == 2
    assert tasks[0] == task_a
    assert tasks[1] == task_b


def test_get_all_tasks_desc(task_repository: TaskRepository):
    # create a task with mock data
    task_a = task_repository.create(
        description='Task A', 
        due_date=date.today(),
        comments=None
    )

    task_b = task_repository.create(
        description='Task B', 
        due_date=date.today() + timedelta(days=1),
        comments=None
    )

    assert task_a.id is not None
    assert task_b.id is not None

    # retrieve the tasks
    tasks = task_repository.get_all(ascending=False)

    # ensure correct order
    assert len(tasks) == 2
    assert tasks[0] == task_b
    assert tasks[1] == task_a


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

    # ensure updated task contains new data
    assert updated_task.id == task.id
    assert updated_task.description == update_data['description']
    assert updated_task.comments == update_data['comments']



