from typing import List, Optional
from fastapi import APIRouter, Depends, HTTPException, Query, status
from src.database import get_connection
from src.models import Product
from src.auth import verify_token

router = APIRouter()


def row_to_product(row) -> Product:
    return Product(
        id=row[0],
        name=row[1],
        price=float(row[2]),
        category=row[3],
        image=row[4],
        description=row[5],
        featured=bool(row[6]),
        created_at=row[7],
    )


@router.get("", response_model=List[Product])
def get_products(
    category: Optional[str] = Query(default=None),
    featured: Optional[str] = Query(default=None),
    _: dict = Depends(verify_token),
):
    conn = get_connection()
    try:
        cursor = conn.cursor()

        query = "SELECT id, name, price, category, image, description, featured, created_at FROM products WHERE 1=1"
        params = []

        if category:
            query += " AND category = ?"
            params.append(category)

        if featured is not None:
            featured_val = 1 if featured.lower() == "true" else 0
            query += " AND featured = ?"
            params.append(featured_val)

        query += " ORDER BY created_at DESC"
        cursor.execute(query, params)
        rows = cursor.fetchall()
    finally:
        conn.close()

    return [row_to_product(row) for row in rows]


@router.get("/{product_id}", response_model=Product)
def get_product(product_id: int, _: dict = Depends(verify_token)):
    conn = get_connection()
    try:
        cursor = conn.cursor()
        cursor.execute(
            "SELECT id, name, price, category, image, description, featured, created_at FROM products WHERE id = ?",
            (product_id,)
        )
        row = cursor.fetchone()
    finally:
        conn.close()

    if row is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Product not found")

    return row_to_product(row)
