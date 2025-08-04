import requests
import json

BASE_URL = 'http://127.0.0.1:8000'

# Use your real user credentials
login_data = {
    "email": "dhanushgp6@gmail.com",  # Your actual email
    "password": "YOUR_ACTUAL_PASSWORD"  # Replace with your actual password
}

session = requests.Session()

print("1. Testing Login...")
response = session.post(f'{BASE_URL}/api/auth/login/', json=login_data)
print(f"Login Status: {response.status_code}")

if response.status_code != 200:
    print(f"Login failed: {response.text}")
    exit()

# Get CSRF token
print("\n2. Getting CSRF token...")
csrf_response = session.get(f'{BASE_URL}/api/auth/profile/')
print(f"Profile Status: {csrf_response.status_code}")

print("\n3. Testing Create Post...")
post_data = {
    "content": "Hello LinkedIn! This is my first post. 🚀"
}

# Get CSRF token from cookies
csrf_token = session.cookies.get('csrftoken')
headers = {
    'Content-Type': 'application/json',
}

if csrf_token:
    headers['X-CSRFToken'] = csrf_token
    print(f"Using CSRF token: {csrf_token[:10]}...")

response = session.post(f'{BASE_URL}/api/posts/', json=post_data, headers=headers)
print(f"Create Post Status: {response.status_code}")
print(f"Response: {response.text}")

print("\n4. Testing Get All Posts...")
response = session.get(f'{BASE_URL}/api/posts/')
print(f"Get Posts Status: {response.status_code}")
posts = response.json()
print(f"Posts Count: {len(posts['results']) if 'results' in posts else len(posts)}")

print("\n5. Testing Posts Stats...")
response = session.get(f'{BASE_URL}/api/stats/')
print(f"Stats Status: {response.status_code}")
print(f"Stats: {response.json()}")

print("\n6. Testing User Posts...")
response = session.get(f'{BASE_URL}/api/users/1/posts/')
print(f"User Posts Status: {response.status_code}")
