# db
from sqlalchemy import Column, String, UUID, DateTime
from sqlalchemy.orm import Session
from db import Base

# types
import uuid
from typing import List
from datetime import datetime


class Task(Base):
    __tablename__ = 'task'

    id = Column(UUID, primary_key=True, default=uuid.uuid4, nullable=False)
    description = Column(String, nullable=False)
    due_date = Column(DateTime)

    def __init__(self, description: str, due_date: datetime):
        self.description = description
        self.due_date = due_date

    def save(self, db: Session) -> None:
        db.add(self)
        db.commit()
        db.refresh(self)
    
    def update(self, **data) -> None:
        for key, value in data.items():
            setattr(self, key, value)

    def delete(self, db: Session) -> None:
        db.delete(self)
        db.commit()

    @staticmethod
    def one(id: UUID, db: Session) -> 'Task':
        return db.query(Task).get(id)
    
    @staticmethod
    def all(db: Session) -> List['Task']:
        return db.query(Task).all()
    
