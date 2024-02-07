from fastapi import APIRouter, Depends, Response, HTTPException, Query

# db
from sqlalchemy.orm import Session
from db import get_db

# repositories
from repositories import TaskRepository

# schemas
from schemas import *

# types
from typing import List

router = APIRouter()


def get_repository(db: Session = Depends(get_db)):
    return TaskRepository(db)

@router.get('/')
def get_all_tasks(
    search: Optional[str] = Query(None),
    page: int = Query(1),
    db: Session = Depends(get_db)
) -> List[TaskBase]:
    repository = TaskRepository(db)
    return repository.get_all()


@router.get('/{task_id}')
def get_task(task_id: UUID, repository: TaskRepository = Depends(get_repository)) -> TaskBase:
    task = repository.get(task_id)
    if not task:
        raise HTTPException(detail='Task not found.', status_code=404)
    
    return task

@router.post('/', status_code=201)
def create_task(request: TaskCreate, repository: TaskRepository = Depends(get_repository)) -> TaskBase:
    return repository.create(**request.model_dump())


@router.delete('/{task_id}', status_code=204)
def delete_task(task_id: UUID, repository: TaskRepository = Depends(get_repository)) -> Response:
    task = repository.get(task_id) # task = Task.one(task_id, db)
    # if task doesn't exist
    if not task:
        raise HTTPException(detail='Task not found.', status_code=404)
    
    repository.delete(task)

    return Response(status_code=204)


@router.patch('/{task_id}')
def update_task(
    task_id: UUID, request: TaskUpdate, repository: TaskRepository = Depends(get_repository)
) -> TaskBase:
    task = repository.get(task_id)
    # if task doesn't exist
    if not task:
        raise HTTPException(detail='Task not found.', status_code=404)
    
    # update any non-null fields
    repository.update(task, **request.model_dump(exclude_unset=True))
    return task