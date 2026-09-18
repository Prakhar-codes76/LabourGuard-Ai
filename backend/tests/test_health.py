def test_health_check(client):
    response = client.get("/api/health")
    assert response.status_code == 200
    data = response.json()
    assert "api" in data
    assert data["api"] in ["ok", "operational"]
    assert "database" in data
    assert "ai_service" in data
    assert "ocr_service" in data
