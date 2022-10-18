from enum import unique
from sqlalchemy import Boolean, Column, ForeignKey, Integer, String, Float
from sqlalchemy.orm import relationship
from passlib import hash
from database import Base



class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True)
    username = Column(String, unique=True, index=True)
    hashed_password = Column(String)
    # is_active = Column(Boolean, default=True)
    # coins_held = Column(List)

    items = relationship("Item", back_populates="owner")
    coins_held = relationship("CoinsHeld", back_populates="owner")

    def verify_password(self, password: str):
        return hash.bcrypt.verify(password, self.hashed_password)

class Item(Base):
    __tablename__ = "items"

    id = Column(Integer, primary_key=True, index=True)
    type = Column(String, index=True)
    name = Column(String, index=True)
    ticker = Column(String, index=True)
    price_bought_for = Column(Float, index=True)
    amount = Column(Float, index=True)
    datetime = Column(String, index=True)
    location = Column(String, index=True)
    owner_id = Column(Integer, ForeignKey("users.id"))

    owner = relationship("User", back_populates="items")

class CoinsHeld(Base):
    __tablename__ = "coins_held"

    name = Column(String, primary_key=True, index=True, unique=True)
    amount = Column(Float, index=True)
    owner_id = Column(Integer, ForeignKey("users.id"))

    owner = relationship("User", back_populates="coins_held")
