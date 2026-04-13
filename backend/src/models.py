from pydantic import BaseModel
from typing import Optional, List

class LoginRequest(BaseModel):
    username: str
    password: str

class LoginResponse(BaseModel):
    token: str
    username: str
    display_name: str

class ProductResponse(BaseModel):
    id: int
    name: str
    price: float
    category: str
    image: str
    description: str
    featured: bool

class OrderItemRequest(BaseModel):
    product_id: int
    quantity: int
    price: float

class OrderRequest(BaseModel):
    items: List[OrderItemRequest]
    total_amount: float

class OrderResponse(BaseModel):
    id: int
    total_amount: float
    status: str