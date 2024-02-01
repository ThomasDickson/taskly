from fastapi.testclient import TestClient
from main import app

from database import get_db, get_test_db, Base, test_engine

client = TestClient(app)

# initialise test db
Base.metadata.create_all(bind=test_engine)

# override db dependency with test db
app.dependency_overrides[get_db] = get_test_db


def test_get_all():
    response = client.get('/api/tasks/')
    assert response.status_code == 201
    assert response.content == []


def test_get_task():
    response = client.get('/api/tasks/9ba68b44-6d15-4add-a4ad-da9e81832233')
    assert response.status_code == 200


def test_get_task_invalid_uuid():
    response = client.get('/api/tasks/9ba68b44-6d15-4add-a4ad-da12332233')
    assert response.status_code == 422


def test_get_task_not_exist():
    response = client.get('/api/tasks/9ba68b44-6d15-4add-a4ad-da9e81832233')
    assert response.status_code == 404
