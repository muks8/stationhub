import os
import pyodbc

def get_connection():
    server = os.environ["DB_SERVER"]
    database = os.environ["DB_NAME"]
    username = os.environ["DB_USER"]
    password = os.environ["DB_PASSWORD"]

    connection_string = (
        f"DRIVER={{ODBC Driver 18 for SQL Server}};"
        f"SERVER={server};"
        f"DATABASE={database};"
        f"UID={username};"
        f"PWD={password};"
        f"Encrypt=yes;"
        f"TrustServerCertificate=no;"
        f"Connection Timeout=30;"
    )

    return pyodbc.connect(connection_string)
