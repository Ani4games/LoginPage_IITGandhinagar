# Backend Login Service

This is a **FastAPI** based authentication service designed to handle user login, token generation (JWT), and role-based access control. It connects to a MySQL database.

## Features

*   **Login API**: Verifies credentials and issues JWT Access Tokens.
*   **Role Management**: Automatically maps users to `admin`, `staff`, or `user` roles.
*   **Token Verification**: Middleware to protect endpoints.
*   **Profile Access**: Fetch full user details using the token.
*   **Logout**: Invalidate tokens (server-side blacklist).
*   **Prepared for OTP**: Placeholders for future SMS/Email OTP integration.

## Setup

1.  **Clone the repository**:
    ```bash
    git clone <your-repo-url>
    cd backend_login_service
    ```

2.  **Create a Virtual Environment**:
    ```bash
    python -m venv venv
    venv\Scripts\activate  # On Windows
    # source venv/bin/activate  # On Mac/Linux
    ```

3.  **Install Dependencies**:
    ```bash
    pip install -r requirements.txt
    ```

4.  **Configure Environment**:
    *   Copy `.env.example` to `.env`
    *   Update the database credentials in `.env`

5.  **Run the Server**:
    ```bash
    uvicorn main:app --reload
    ```

## API Endpoints

*   `POST /login`: `{email, password}` -> Returns JWT Token.
*   `GET /auth/status`: Check if token is valid and get user role.
*   `GET /user/profile`: Get full user details.
*   `POST /logout`: Invalidate current token.

## Project Structure

*   `main.py`: Main application and API routes.
*   `db.py`: Database connection logic.
*   `login_only.py` / `test_login_tool.py`: Scripts for testing.
