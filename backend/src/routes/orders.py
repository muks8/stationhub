from typing import List
from fastapi import APIRouter, Depends, HTTPException, status
from src.database import get_connection
from src.models import CreateOrderRequest, OrderResponse, OrderDetail
from src.auth import verify_token

router = APIRouter()


@router.post("", response_model=OrderResponse)
def create_order(body: CreateOrderRequest, token_data: dict = Depends(verify_token)):
    user_id = token_data["sub"]

    if not body.items:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Order must contain at least one item")

    conn = get_connection()
    try:
        cursor = conn.cursor()

        cursor.execute(
            "INSERT INTO orders (user_id, total_amount, status, created_at) "
            "OUTPUT INSERTED.id, INSERTED.total_amount, INSERTED.status "
            "VALUES (?, ?, 'pending', GETDATE())",
            (user_id, body.total_amount)
        )
        order_row = cursor.fetchone()
        order_id, total_amount, order_status = order_row

        for item in body.items:
            cursor.execute(
                "INSERT INTO order_items (order_id, product_id, quantity, price) VALUES (?, ?, ?, ?)",
                (order_id, item.product_id, item.quantity, item.price)
            )

        conn.commit()
    except Exception:
        conn.rollback()
        conn.close()
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Failed to create order")
    finally:
        conn.close()

    return OrderResponse(id=order_id, total_amount=float(total_amount), status=order_status)


@router.get("", response_model=List[OrderDetail])
def get_orders(token_data: dict = Depends(verify_token)):
    user_id = token_data["sub"]

    conn = get_connection()
    try:
        cursor = conn.cursor()
        cursor.execute(
            "SELECT id, user_id, total_amount, status, created_at FROM orders WHERE user_id = ? ORDER BY created_at DESC",
            (user_id,)
        )
        rows = cursor.fetchall()
    finally:
        conn.close()

    return [
        OrderDetail(
            id=row[0],
            user_id=row[1],
            total_amount=float(row[2]),
            status=row[3],
            created_at=row[4],
        )
        for row in rows
    ]
