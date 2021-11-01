from sqlalchemy import Column, Integer, String
from sqlalchemy.types import Date
from .db import Base

class User(Base):
    __tablename__ = "Users"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True)
    password = Column(String)