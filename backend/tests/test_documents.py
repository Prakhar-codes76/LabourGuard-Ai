import io

def test_document_upload_and_validation(client):
    # Register & Login user
    reg_resp = client.post("/api/auth/register", json={
        "name": "Doc Officer",
        "email": "doc.officer@labourguard.org",
        "password": "Password123!",
        "role": "inspector"
    })
    token = reg_resp.json()["access_token"]
    headers = {"Authorization": f"Bearer {token}"}

    # 1. Invalid file extension upload (.exe)
    invalid_file = ("script.exe", b"binary data", "application/octet-stream")
    resp_inv = client.post("/api/documents/upload", files={"file": invalid_file}, headers=headers)
    assert resp_inv.status_code == 400

    # 2. Valid PDF upload
    pdf_content = b"%PDF-1.4 ... Sample Labour Register PDF Content ..."
    valid_file = ("wage_register.pdf", pdf_content, "application/pdf")
    resp_valid = client.post("/api/documents/upload", files={"file": valid_file}, headers=headers)
    assert resp_valid.status_code == 200
    data = resp_valid.json()
    assert "document_id" in data
    assert data["filename"] == "wage_register.pdf"
    assert data["status"] == "uploaded"
