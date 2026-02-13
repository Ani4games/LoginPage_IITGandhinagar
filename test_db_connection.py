import mysql.connector
from mysql.connector import Error
import os
from dotenv import load_dotenv

load_dotenv()

print(f"Testing connection to: {os.getenv('DB_HOST')}:{os.getenv('DB_PORT')}")
print(f"User: {os.getenv('DB_USER')}")

try:
    connection = mysql.connector.connect(
        host=os.getenv("DB_HOST"),
        user=os.getenv("DB_USER"),
        password=os.getenv("DB_PASSWORD"),
        database=os.getenv("DB_NAME"),
        port=int(os.getenv("DB_PORT"))
    )
    if connection.is_connected():
        db_info = connection.get_server_info()
        print(f"Successfully connected to MySQL Server version {db_info}")
        cursor = connection.cursor()
        cursor.execute("select database();")
        record = cursor.fetchone()
        print(f"You're connected to database: {record[0]}")
        cursor.close()
        connection.close()
except Error as e:
    print(f"Error while connecting to MySQL: {e}")
