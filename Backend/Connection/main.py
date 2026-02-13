from fastapi import FastAPI, HTTPException, Depends, Header
from fastapi.responses import JSONResponse
from pydantic import BaseModel
import hashlib
from db import get_db_connection
from mysql.connector import Error
import jwt
import datetime
from typing import Optional

app = FastAPI()

# --- Configuration ---
SECRET_KEY = "supersecretkey"  # Change this in production
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

# In-memory blacklist for logout (since we cannot modify DB schema)
BLACKLISTED_TOKENS = set()

# --- Models ---
class LoginRequest(BaseModel):
    email: str
    password: str

# --- OTP Placeholders ---
def generate_otp():
    """Placeholder for future OTP generation logic."""
    # TODO: Implement OTP generation here
    pass

def verify_otp():
    """Placeholder for future OTP verification logic."""
    # TODO: Implement OTP verification here
    pass

# --- Helper Functions ---
def determine_role(is_admin, position):
    """Maps database fields to roles: admin, staff, user"""
    if is_admin == 1:
        return "admin"
    if position and "Staff" in str(position):
        return "staff"
    return "user"

def create_access_token(data: dict):
    """Generates a JWT token with expiry."""
    to_encode = data.copy()
    expire = datetime.datetime.utcnow() + datetime.timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

def verify_token(authorization: Optional[str] = Header(None)):
    """
    Dependency to verify token from Authorization header.
    Extracts memberid and role.
    """
    if not authorization:
        raise HTTPException(status_code=401, detail="Missing Authorization Header")
    
    try:
        scheme, token = authorization.split()
        if scheme.lower() != 'bearer':
            raise HTTPException(status_code=401, detail="Invalid Authentication Scheme")
            
        if token in BLACKLISTED_TOKENS:
            raise HTTPException(status_code=401, detail="Token has been logged out")

        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        return payload
    except (ValueError, jwt.ExpiredSignatureError, jwt.InvalidTokenError):
        raise HTTPException(status_code=401, detail="Invalid or Expired Token")

# --- Endpoints ---

@app.post("/login")
def login(request: LoginRequest):
    connection = get_db_connection()
    if connection is None:
        return JSONResponse(status_code=500, content={"status": "error", "message": "Database connection failed"})

    try:
        cursor = connection.cursor(dictionary=True)
        
        # 1. Hash the incoming password using MD5
        hashed_password = hashlib.md5(request.password.encode()).hexdigest()
        
        # 2. Verify credentials
        query = """
            SELECT memberid, fname, lname, is_admin, department, mobile, position
            FROM login 
            WHERE email = %s AND password = %s
        """
        cursor.execute(query, (request.email, hashed_password))
        user = cursor.fetchone()
        
        if user:
            # Determine role
            role_name = determine_role(user["is_admin"], user["position"])
            
            # Generate Token
            token_payload = {
                "memberid": user["memberid"],
                "role": role_name,
                "is_admin": user["is_admin"]
            }
            access_token = create_access_token(token_payload)
            
            # Placeholder for OTP trigger
            # generate_otp() 
            
            return {
                "status": "success",
                "message": "Login successful",
                "token": access_token,
                "token_type": "bearer",
                "expires_in": ACCESS_TOKEN_EXPIRE_MINUTES * 60
            }
        else:
            return JSONResponse(status_code=401, content={"status": "error", "message": "Invalid email or password"})

    except Error as e:
        return JSONResponse(status_code=500, content={"status": "error", "message": f"Database error: {str(e)}"})
    finally:
        if connection and connection.is_connected():
            cursor.close()
            connection.close()

@app.get("/auth/status")
def auth_status(current_user: dict = Depends(verify_token)):
    """Returns authentication status and role details."""
    connection = get_db_connection()
    if not connection:
         return JSONResponse(status_code=500, content={"status": "error", "message": "Database error"})
         
    try:
        cursor = connection.cursor(dictionary=True)
        cursor.execute("SELECT department FROM login WHERE memberid = %s", (current_user["memberid"],))
        user_data = cursor.fetchone()
        
        return {
            "authenticated": True,
            "role": current_user["role"],
            "department": user_data["department"] if user_data else None,
            "memberid": current_user["memberid"]
        }
    finally:
        if connection and connection.is_connected():
            cursor.close()
            connection.close()

@app.post("/logout")
def logout(authorization: Optional[str] = Header(None)):
    """Invalidates the token (adds to blacklist)."""
    if authorization:
        try:
            scheme, token = authorization.split()
            if scheme.lower() == 'bearer':
                BLACKLISTED_TOKENS.add(token)
        except ValueError:
            pass
            
    return {"status": "success", "message": "Logged out successfully"}

@app.get("/user/profile")
def user_profile(current_user: dict = Depends(verify_token)):
    """Authenticated endpoint to get full user profile."""
    connection = get_db_connection()
    if not connection:
        return JSONResponse(status_code=500, content={"status": "error", "message": "Database connection failed"})

    try:
        cursor = connection.cursor(dictionary=True)
        query = """
            SELECT memberid, fname, lname, email, position, is_admin, 
                   department, mobile, rollno, course, research_area
            FROM login 
            WHERE memberid = %s
        """
        cursor.execute(query, (current_user["memberid"],))
        user = cursor.fetchone()
        
        if user:
            return {
                "status": "success",
                "profile": user
            }
        else:
            return JSONResponse(status_code=404, content={"status": "error", "message": "User not found"})
            
    except Error as e:
        return JSONResponse(status_code=500, content={"status": "error", "message": f"Database error: {str(e)}"})
    finally:
        if connection and connection.is_connected():
            cursor.close()
            connection.close()

@app.get("/")
def root():
    return {"message": "Login Service Updated. POST /login to authenticate."}
