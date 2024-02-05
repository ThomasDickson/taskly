from pydantic import BaseModel
from typing import Optional
from datetime import date
from uuid import UUID


class TaskBase(BaseModel):
    """Base model for returning a Task"""
    id: UUID
    description: str
    due_date: Optional[date]
    comments: Optional[str]


class TaskCreate(BaseModel):
    """Model for creating a new Task"""
    description: str
    due_date: Optional[date] = None
    comments: Optional[str] = None


class TaskUpdate(BaseModel):
    """Model for updating an existing Task"""
    description: Optional[str] = None
    due_date: Optional[date] = None
    comments: Optional[str] = None
