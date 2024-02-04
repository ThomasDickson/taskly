from pydantic import BaseModel, Field
from typing import Optional
from datetime import date
from uuid import UUID


class TaskBase(BaseModel):
    id: UUID
    description: str
    due_date: Optional[date]
    comments: Optional[str]


class TaskCreate(BaseModel):
    description: str
    due_date: Optional[date] = None
    comments: Optional[str] = None


class TaskUpdate(BaseModel):
    description: Optional[str] = None
    due_date: Optional[date] = None
    comments: Optional[str] = None
