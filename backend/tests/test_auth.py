import uuid

def test_register_and_login(client):
    test_email = f"officer_{uuid.uuid4().hex[:6]}@labourguard.org"
    
    # 1. Register
    reg_resp = client.post("/api/auth/register", json={
        "name": "Inspector Test",
        "email": test_email,
        "password": "Password123!",
        "role": "inspector"
    })
    assert reg_resp.status_code == 200
    reg_data = reg_resp.json()
    assert "access_token" in reg_data
    assert reg_data["user"]["email"] == test_email

    # 2. Duplicate registration check
    dup_resp = client.post("/api/auth/register", json={
        "name": "Inspector Duplicate",
        "email": test_email,
        "password": "Password123!",
        "role": "inspector"
    })
    assert dup_resp.status_code == 400

    # 3. Login
    login_resp = client.post("/api/auth/login", json={
        "email": test_email,
        "password": "Password123!"
    })
    assert login_resp.status_code == 200
    login_data = login_resp.json()
    token = login_data["access_token"]

    # 4. Protected Route GET /api/auth/me
    me_resp = client.get("/api/auth/me", headers={"Authorization": f"Bearer {token}"})
    assert me_resp.status_code == 200
    assert me_resp.json()["email"] == test_email
