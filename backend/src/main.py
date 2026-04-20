import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from src.routes import auth, products, orders

app = FastAPI(title="StationHub API")

frontend_url = os.environ.get("FRONTEND_URL", "*")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[frontend_url],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router, prefix="/api/auth", tags=["auth"])
app.include_router(products.router, prefix="/api/products", tags=["products"])
app.include_router(orders.router, prefix="/api/orders", tags=["orders"])


@app.get("/health")
def health_check():
    return {"status": "healthy", "service": "stationhub-backend"}
