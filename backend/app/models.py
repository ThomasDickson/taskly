# db
from sqlalchemy import Column, String, UUID, Date, Text
from sqlalchemy.orm import Session
from db import Base

# types
import uuid
from datetime import date


class Task(Base):
    __tablename__ = 'task'

    id = Column(UUID, primary_key=True, default=uuid.uuid4, nullable=False)  # auto-generate new UUID4 for each new db entry
    description = Column(String, nullable=False)
    due_date = Column(Date)
    comments = Column(Text)


    def __init__(self, description: str, due_date: date, comments: str):
        self.description = description
        self.due_date = due_date
        self.comments = comments


    # def save(self, db: Session) -> None:
    #     db.add(self)
    #     db.commit()
    #     db.refresh(self)
    
    # def update(self, **data) -> None:
    #     for key, value in data.items():
    #         setattr(self, key, value)

    # def delete(self, db: Session) -> None:
    #     db.delete(self)
    #     db.commit()

    # @staticmethod
    # def one(id: UUID, db: Session) -> 'Task':
    #     return db.query(Task).get(id)
    
    # @staticmethod
    # def all(db: Session) -> List['Task']:
    #     return db.query(Task).all()
    
