import requests
import json

def test_login_automated():
    print("--- Automated Login Service Tester (v2 Token Support) ---")
    base_url = "http://127.0.0.1:8000"
    
    # 1. Check if server is running
    try:
        response = requests.get(base_url + "/")
        print(f"Server Status: {response.json()['message']}")
    except requests.exceptions.ConnectionError:
        print("Error: Could not connect to server.")
        return

    # 2. Get credentials (hardcoded for test)
    email = "iitbnfadmin@ee.iitb.ac.in"
    password = "1"

    # 3. Send Login Request
    payload = {
        "email": email,
        "password": password
    }
    
    try:
        print("\nLogging in...")
        response = requests.post(base_url + "/login", json=payload)
        data = response.json()
        
        print(f"Status Code: {response.status_code}")
        print("Login Response:")
        print(json.dumps(data, indent=2))
        
        if response.status_code == 200 and "token" in data:
            token = data["token"]
            headers = {"Authorization": f"Bearer {token}"}
            
            # 4. Test Auth Status
            print("\n--- Testing /auth/status ---")
            status_resp = requests.get(base_url + "/auth/status", headers=headers)
            print(f"Status: {status_resp.status_code}")
            print(json.dumps(status_resp.json(), indent=2))
            
            # 5. Test Profile
            print("\n--- Testing /user/profile ---")
            profile_resp = requests.get(base_url + "/user/profile", headers=headers)
            print(f"Status: {profile_resp.status_code}")
            print(json.dumps(profile_resp.json(), indent=2))
            
            # 6. Test Logout
            print("\n--- Testing /logout ---")
            logout_resp = requests.post(base_url + "/logout", headers=headers)
            print(f"Status: {logout_resp.status_code}")
            print(json.dumps(logout_resp.json(), indent=2))
            
            # 7. Verify Token Invalid after Logout
            print("\n--- Verifying Token Invalid ---")
            verify_resp = requests.get(base_url + "/auth/status", headers=headers)
            print(f"Status Code after logout: {verify_resp.status_code}")
            print(verify_resp.json())

    except Exception as e:
        print(f"Request failed: {e}")

if __name__ == "__main__":
    test_login_automated()
