from fastapi import APIRouter, HTTPException, Depends
from src.database import get_connection
from src.models import ProductResponse
from src.routes.auth import get_current_user
from typing import List, Optional

router = APIRouter()

@router.get("/products", response_model=List[ProductResponse])
def get_products(
    category: Optional[str] = None,
    featured: Optional[bool] = None,
    user=Depends(get_current_user)
):
    try:
        conn   = get_connection()
        cursor = conn.cursor()

        query  = "SELECT id, name, price, category, image, description, featured FROM products WHERE 1=1"
        params = []

        if category and category != "All":
            query  += " AND category=?"
            params.append(category)
        if featured is not None:
            query  += " AND featured=?"
            params.append(1 if featured else 0)

        cursor.execute(query, params)
        rows = cursor.fetchall()
        conn.close()

        return [
            {
                "id": r[0], "name": r[1], "price": float(r[2]),
                "category": r[3], "image": r[4],
                "description": r[5], "featured": bool(r[6])
            }
            for r in rows
        ]
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/products/{product_id}", response_model=ProductResponse)
def get_product(product_id: int, user=Depends(get_current_user)):
    try:
        conn   = get_connection()
        cursor = conn.cursor()
        cursor.execute(
            "SELECT id, name, price, category, image, description, featured FROM products WHERE id=?",
            product_id
        )
        row = cursor.fetchone()
        conn.close()
        if not row:
            raise HTTPException(status_code=404, detail="Product not found")
        return {
            "id": row[0], "name": row[1], "price": float(row[2]),
            "category": row[3], "image": row[4],
            "description": row[5], "featured": bool(row[6])
        }
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
