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
    due_date = Column(Date, nullable=False)
    comments = Column(Text)


    def __init__(self, description: str, due_date: date, comments: str):
        self.description = description
        self.due_date = due_date
        self.comments = comments
