// LabourGuard AI - FastAPI Client Service
const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:8000/api";

class APIClient {
  constructor() {
    this.token = localStorage.getItem("lg_auth_token") || null;
  }

  setToken(token) {
    this.token = token;
    if (token) {
      localStorage.setItem("lg_auth_token", token);
    } else {
      localStorage.removeItem("lg_auth_token");
    }
  }

  getToken() {
    return this.token || localStorage.getItem("lg_auth_token");
  }

  getHeaders(isMultipart = false) {
    const headers = {};
    const token = this.getToken();
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }
    if (!isMultipart) {
      headers["Content-Type"] = "application/json";
    }
    return headers;
  }

  async handleResponse(response) {
    if (!response.ok) {
      let errorMessage = `HTTP Error ${response.status}`;
      try {
        const errorData = await response.json();
        if (errorData.detail) {
          errorMessage = typeof errorData.detail === 'string' ? errorData.detail : JSON.stringify(errorData.detail);
        }
      } catch (e) {
        if (response.status === 401) errorMessage = "Authentication failure: Invalid or expired session token.";
        else if (response.status === 403) errorMessage = "Permission denied: You do not have access to this resource.";
        else if (response.status === 404) errorMessage = "Requested document or record not found.";
        else if (response.status === 413) errorMessage = "File too large: Upload size exceeds maximum permitted limit.";
        else if (response.status >= 500) errorMessage = "Backend service internal processing error.";
      }
      throw new Error(errorMessage);
    }
    return await response.json();
  }

  // Health Endpoint
  async checkHealth() {
    try {
      const response = await fetch(`${API_BASE}/health`, {
        method: "GET",
        headers: this.getHeaders()
      });
      return await this.handleResponse(response);
    } catch (err) {
      return {
        api: "unavailable",
        database: "unavailable",
        ai_service: "not_configured",
        ocr_service: "not_configured",
        error: err.message
      };
    }
  }

  // Auth Endpoints
  async register(name, email, password, role = "inspector") {
    try {
      const response = await fetch(`${API_BASE}/auth/register`, {
        method: "POST",
        headers: this.getHeaders(),
        body: JSON.stringify({ name, email, password, role })
      });
      const data = await this.handleResponse(response);
      if (data.access_token) {
        this.setToken(data.access_token);
      }
      return data;
    } catch (err) {
      throw new Error(err.message || "Registration failed. Check network or user parameters.");
    }
  }

  async login(email, password) {
    try {
      const response = await fetch(`${API_BASE}/auth/login`, {
        method: "POST",
        headers: this.getHeaders(),
        body: JSON.stringify({ email, password })
      });
      const data = await this.handleResponse(response);
      if (data.access_token) {
        this.setToken(data.access_token);
      }
      return data;
    } catch (err) {
      throw new Error(err.message || "Authentication failure. Please check email and password.");
    }
  }

  async getCurrentUser() {
    try {
      const response = await fetch(`${API_BASE}/auth/me`, {
        method: "GET",
        headers: this.getHeaders()
      });
      return await this.handleResponse(response);
    } catch (err) {
      this.setToken(null);
      throw new Error(err.message);
    }
  }

  logout() {
    this.setToken(null);
  }

  // Document Upload Endpoint
  async uploadDocument(file) {
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch(`${API_BASE}/documents/upload`, {
        method: "POST",
        headers: this.getHeaders(true),
        body: formData
      });
      return await this.handleResponse(response);
    } catch (err) {
      throw new Error(err.message || "Document upload failed.");
    }
  }

  // Document Analyze Endpoint
  async analyzeDocument(documentId) {
    try {
      const response = await fetch(`${API_BASE}/documents/${documentId}/analyze`, {
        method: "POST",
        headers: this.getHeaders()
      });
      return await this.handleResponse(response);
    } catch (err) {
      throw new Error(err.message || "Document compliance analysis failed.");
    }
  }

  // Stats Endpoint
  async getDashboardStats() {
    try {
      const response = await fetch(`${API_BASE}/analyses/stats/summary`, {
        method: "GET",
        headers: this.getHeaders()
      });
      return await this.handleResponse(response);
    } catch (err) {
      return null;
    }
  }

  // Analysis Report Endpoint
  async getAnalysisReport(analysisId) {
    try {
      const response = await fetch(`${API_BASE}/analyses/${analysisId}/report`, {
        method: "GET",
        headers: this.getHeaders()
      });
      return await this.handleResponse(response);
    } catch (err) {
      throw new Error(err.message || "Failed to fetch inspection report.");
    }
  }
}

export const apiClient = new APIClient();
