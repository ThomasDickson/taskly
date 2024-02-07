from fastapi.testclient import TestClient
from main import app

# db
from test_db import test_engine, get_test_db
from db import get_db, Base

# testing
import pytest

# types
from datetime import date


# fixture to initialise db session and clean up with each test
@pytest.fixture
def client():
    # initialise test db
    Base.metadata.create_all(bind=test_engine)

    # override db dependency with test db
    app.dependency_overrides[get_db] = get_test_db

    with TestClient(app) as client:
        yield client

    # drop all data
    Base.metadata.drop_all(bind=test_engine)

def test_get_all(client):
    response = client.get('/api/tasks/')
    assert response.status_code == 200
    assert response.json() == []


def test_get_task(client):
    # create a new task
    task_data = {
        'description': 'Test Task', 
        'due_date': str(date.today())
    }
    response = client.post('/api/tasks', json=task_data)
    data = response.json()
    
    # get task
    response = client.get(f'/api/tasks/{data["id"]}')
    assert response.status_code == 200


def test_get_task_invalid_uuid(client):
    response = client.get('/api/tasks/9ba68b44-6d15-4add-a4ad-da12332233')
    assert response.status_code == 422  # ensure validation error
 

def test_get_task_not_exist(client):
    response = client.get('/api/tasks/9ba68b44-6d15-4add-a4ad-da9e81832233')
    assert response.status_code == 404  # ensure specified task doesn't exist


def test_create_task(client):
    # create a task
    task_data = {
        'description': 'Test Task', 
        'due_date': str(date.today())
    }
    response = client.post('/api/tasks', json=task_data)
    
    response_data = response.json()

    assert response.status_code == 201
    assert response_data['id'] is not None  # ensure ID assigned
    assert response_data['description'] == task_data['description']  # ensure description is same as input
    assert response_data['due_date'] == task_data['due_date']  # ensure due_date is same as input


def test_delete_task(client):
    # create task
    task_data = {
        'description': 'Test Task', 
        'due_date': str(date.today())
    }
    response = client.post('/api/tasks', json=task_data)
    
    assert response.status_code == 201  # ensure created successfully

    response_data = response.json()
    assert response_data['id'] is not None

    response = client.delete(f'/api/tasks/{response_data["id"]}')
    assert response.status_code == 204  # ensure deleted successfully



def test_update_task(client):
    # create task
    original_data = {
        'description': 'Test Task', 
        'due_date': str(date.today())
    }
    response = client.post('/api/tasks', json=original_data)
    
    assert response.status_code == 201  # ensure created successfully
    response_data = response.json()

    new_data = {
        'description': 'New Task Desc',
        'comments': 'Test 123'
    }

    # update task with new data
    response = client.patch(f'/api/tasks/{response_data["id"]}', json=new_data)

    update_data = response.json()

    assert response.status_code == 200
    assert update_data['description'] == new_data['description']  # ensure description updated
    assert update_data['due_date'] == original_data['due_date']  # ensure due date not changed
    assert update_data['comments'] == new_data['comments']  # ensure comments updated
 

    

