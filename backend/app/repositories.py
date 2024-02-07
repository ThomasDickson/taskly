# db
from sqlalchemy.orm import Session

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
    
    
    def get_all(self, search: str = '', ascending: bool = True) -> List[Task]:
        """Get all tasks from the database with search and sort parameters"""
        tasks = self.db.query(Task)
        
        # search query (case insensitive)
        tasks = tasks.filter(Task.description.ilike(f'%{search}%'))

        # sorting
        order_by = Task.due_date
        if not ascending: 
            order_by = Task.due_date.desc()

        tasks = tasks.order_by(order_by).all()
        return tasks


    def create(self, description: str, due_date: date, comments: str) -> Task:
        """Creates a new task in the database."""
        task = Task(description, due_date, comments)

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
        