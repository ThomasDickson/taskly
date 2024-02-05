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


# @router.get('/')
# def get_all_tasks(
#     search: Optional[str] = Query(None),
#     page: int = Query(1),
#     db: Session = Depends(get_db)
# ) -> List[TaskBase]:
#     return Task.all(db)


@router.get('/')
def get_all_tasks(
    search: Optional[str] = Query(None),
    page: int = Query(1),
    db: Session = Depends(get_db)
) -> List[TaskBase]:
    repository = TaskRepository(db)
    return repository.get_all()


# @router.get('/{task_id}')
# def get_task(task_id: UUID, db: Session = Depends(get_db)) -> TaskBase:
#     task = Task.one(task_id, db)
#     # if task doesn't exist
#     if not task:
#         raise HTTPException(detail='Task not found.', status_code=404)
    
#     return task



@router.get('/{task_id}')
def get_task(task_id: UUID, db: Session = Depends(get_db)) -> TaskBase:
    repository = TaskRepository(db)

    task = repository.get(task_id)
    if not task:
        raise HTTPException(detail='Task not found.', status_code=404)
    
    return task

@router.post('/', status_code=201)
def create_task(request: TaskCreate, db: Session = Depends(get_db)) -> TaskBase:
    repository = TaskRepository(db)
    return repository.create(**request.model_dump())


# @router.post('/', status_code=201)
# def create_task(request: TaskCreate, db: Session = Depends(get_db)) -> TaskBase:
#     task = Task(**request.model_dump())
#     task.save(db)

#     return task


@router.delete('/{task_id}', status_code=204)
def delete_task(task_id: UUID, db: Session = Depends(get_db)) -> Response:
    repository = TaskRepository(db)

    task = repository.get(task_id) # task = Task.one(task_id, db)
    # if task doesn't exist
    if not task:
        raise HTTPException(detail='Task not found.', status_code=404)
    
    repository.delete(task)

    return Response(status_code=204)


# @router.patch('/{task_id}')
# def update_task(
#     task_id: UUID, 
#     request: TaskUpdate, 
#     db: Session = Depends(get_db)
# ) -> TaskBase:
#     task = Task.one(task_id, db)
#     # if task doesn't exist
#     if not task:
#         raise HTTPException(detail='Task not found.', status_code=404)
    
#     # update any non-null fields
#     task.update(**request.model_dump(exclude_unset=True))
#     task.save(db)
    
#     return task

@router.patch('/{task_id}')
def update_task(
    task_id: UUID, request: TaskUpdate, db: Session = Depends(get_db)
) -> TaskBase:
    repository = TaskRepository(db)

    task = repository.get(task_id)
    # if task doesn't exist
    if not task:
        raise HTTPException(detail='Task not found.', status_code=404)
    
    # update any non-null fields
    repository.update(task, **request.model_dump(exclude_unset=True))
    return task