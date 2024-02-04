# db
from sqlalchemy.orm import Session
from db import get_db

# types
from datetime import date
from typing import List
from uuid import UUID

# models
from models import Task


class TaskRepository:
    """
        Repository responsible for performing CRUD operations on the task table.
    """

    def __init__(self, db: Session) -> None:
        self.db = db

    
    def get(self, id: UUID) -> Task:
        """Get one task from the database by ID"""
        return self.db.query(Task).get(id)
    
    
    def get_all(self) -> List[Task]:
        """Get all tasks from the database"""
        return self.db.query(Task).all()


    def create(self, description: str, due_date: date, comments: str) -> Task:
        """Creates a new task in the database."""
        task = Task(description=description, due_date=due_date, comments=comments)

        self.db.add(task)
        self.db.commit()
        self.db.refresh(task)

        return task
    

    def delete(self, task: Task) -> None:
        """Delete a task from the database"""
        self.db.delete(task)
        self.db.commit()
        

    def update(self, task: Task, **data: dict) -> Task:
        """Update a task in the database"""
        for key, value in data.items():
            setattr(task, key, value)

        self.db.commit()
        self.db.refresh(task)

        return task
        