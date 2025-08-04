import requests
import json

BASE_URL = 'http://127.0.0.1:8000'

def test_with_csrf():
    session = requests.Session()
    
    # Step 1: Get CSRF token by visiting a page
    print("1. Getting CSRF token...")
    response = session.get(f'{BASE_URL}/api/posts/')
    csrf_token = session.cookies.get('csrftoken')
    print(f"CSRF token obtained: {csrf_token[:10] if csrf_token else 'None'}...")
    
    # Step 2: Login
    print("\n2. Testing Login...")
    login_data = {
        "email": "dhanushgp6@gmail.com",  # Your email
        "password": "123456"   # Replace with your actual password
    }
    
    headers = {'Content-Type': 'application/json'}
    if csrf_token:
        headers['X-CSRFToken'] = csrf_token
    
    response = session.post(f'{BASE_URL}/api/auth/login/', json=login_data, headers=headers)
    print(f"Login Status: {response.status_code}")
    
    if response.status_code != 200:
        print(f"Login Error: {response.text}")
        return
    
    print("✓ Login successful!")
    
    # Step 3: Create Post
    print("\n3. Testing Create Post...")
    post_data = {
        "content": "Hello LinkedIn! This is my first post from the API! 🚀"
    }
    
    # Update CSRF token after login
    csrf_token = session.cookies.get('csrftoken')
    headers = {'Content-Type': 'application/json'}
    if csrf_token:
        headers['X-CSRFToken'] = csrf_token
    
    response = session.post(f'{BASE_URL}/api/posts/', json=post_data, headers=headers)
    print(f"Create Post Status: {response.status_code}")
    
    if response.status_code == 201:
        print("✓ Post created successfully!")
        post = response.json()
        print(f"Full response: {post}")  # Let's see the actual structure
        
        # Handle different response formats
        if 'id' in post:
            print(f"Post ID: {post['id']}")
            print(f"Content: {post['content']}")
            print(f"Author: {post['author']['full_name']}")
        else:
            print("Post created but response format is different")
    else:
        print(f"✗ Post creation failed: {response.text}")

    
    # Step 4: Get all posts
    print("\n4. Testing Get All Posts...")
    response = session.get(f'{BASE_URL}/api/posts/')
    print(f"Get Posts Status: {response.status_code}")
    
    if response.status_code == 200:
        posts = response.json()
        count = len(posts['results']) if 'results' in posts else len(posts)
        print(f"✓ Found {count} posts")
        
        if count > 0:
            latest_post = posts['results'][0] if 'results' in posts else posts[0]
            print(f"Latest post: {latest_post['content'][:50]}...")
    
    # Step 5: Stats
    print("\n5. Testing Stats...")
    response = session.get(f'{BASE_URL}/api/stats/')
    if response.status_code == 200:
        stats = response.json()
        print(f"✓ Stats: {stats}")

if __name__ == "__main__":
    test_with_csrf()
