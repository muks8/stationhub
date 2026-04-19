from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from src.routes.auth     import router as auth_router
from src.routes.products import router as products_router
from src.routes.orders   import router as orders_router
import os

app = FastAPI(title="StationHub API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[os.environ.get("FRONTEND_URL", "*")],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth_router,     prefix="/api/auth", tags=["Auth"])
app.include_router(products_router, prefix="/api",      tags=["Products"])
app.include_router(orders_router,   prefix="/api",      tags=["Orders"])

@app.get("/health")
def health():
    return {"status": "healthy", "service": "stationhub-backend"}

@app.get("/")
def root():
    return {"message": "StationHub API Running!"}