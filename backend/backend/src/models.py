from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime


class LoginRequest(BaseModel):
    username: str
    password: str


class LoginResponse(BaseModel):
    token: str
    username: str
    display_name: str


class Product(BaseModel):
    id: int
    name: str
    price: float
    category: str
    image: Optional[str] = None
    description: Optional[str] = None
    featured: bool = False
    created_at: Optional[datetime] = None


class OrderItem(BaseModel):
    product_id: int
    quantity: int
    price: float


class CreateOrderRequest(BaseModel):
    items: List[OrderItem]
    total_amount: float


class OrderResponse(BaseModel):
    id: int
    total_amount: float
    status: str


class OrderDetail(BaseModel):
    id: int
    user_id: int
    total_amount: float
    status: str
    created_at: Optional[datetime] = None
