from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.types import Date
from sqlalchemy.orm import relationship
from .db import Base

Id = lambda: Column(Integer, primary_key=True, index=True)
Foreign = lambda key: Column(Integer, ForeignKey(key))

class User(Base):
    __tablename__ = "Users"

    id = Id()
    username = Column(String, unique=True)
    password = Column(String)

    panels = relationship("Panel", cascade='all, delete')

class Panel(Base):
    __tablename__ = "Panels"

    id = Id()

    user_id = Foreign('Users.id')
    user = relationship("User", back_populates='panels')

    sort_order = Column(Integer)
    panel_type = Column(String)
    settings = relationship("Setting", cascade='all, delete')

    def __getitem__(self, index):
        print('looking in', self, 'for', index, 'in settings', self.settings)
        return list(filter(lambda x: x.key == index, self.settings))[0].value

class Setting(Base):
    __tablename__ = "Settings"

    id = Id()

    panel_id = Foreign('Panels.id')
    panel = relationship("Panel", back_populates="settings")

    key = Column(String)
    value = Column(String)