from fastapi import APIRouter, HTTPException, Depends
from src.database import get_connection
from src.models import OrderRequest, OrderResponse
from src.routes.auth import get_current_user

router = APIRouter()

@router.post("/orders", response_model=OrderResponse)
def create_order(order: OrderRequest, user=Depends(get_current_user)):
    try:
        conn   = get_connection()
        cursor = conn.cursor()

        # Order banao
        cursor.execute(
            "INSERT INTO orders (user_id, total_amount, status) OUTPUT INSERTED.id VALUES (?, ?, 'confirmed')",
            int(user["sub"]), order.total_amount
        )
        order_id = cursor.fetchone()[0]

        # Order items save karo
        for item in order.items:
            cursor.execute(
                "INSERT INTO order_items (order_id, product_id, quantity, price) VALUES (?, ?, ?, ?)",
                order_id, item.product_id, item.quantity, item.price
            )

        conn.commit()
        conn.close()
        return {"id": order_id, "total_amount": order.total_amount, "status": "confirmed"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/orders")
def get_orders(user=Depends(get_current_user)):
    try:
        conn   = get_connection()
        cursor = conn.cursor()
        cursor.execute(
            "SELECT id, total_amount, status, created_at FROM orders WHERE user_id=? ORDER BY created_at DESC",
            int(user["sub"])
        )
        rows = cursor.fetchall()
        conn.close()
        return [
            {"id": r[0], "total_amount": float(r[1]), "status": r[2], "created_at": str(r[3])}
            for r in rows
        ]
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))