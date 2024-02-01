from pydantic import BaseModel
from typing import Optional
from datetime import datetime
from uuid import UUID

class TaskBase(BaseModel):
    id: UUID
    description: str
    due_date: Optional[datetime]


class TaskCreate(BaseModel):
    description: str
    due_date: Optional[datetime] = None


class TaskUpdate(BaseModel):
    description: Optional[str] = None
    due_date: Optional[datetime] = None
