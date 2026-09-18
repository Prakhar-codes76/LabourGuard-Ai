# LabourGuard AI - AI-Powered Labour Compliance Inspection & Risk Analysis

LabourGuard AI is an intelligent document inspection, risk intelligence, and statutory compliance analysis platform designed for modern labour inspectors, field enforcement officers, and compliance administrators.

> **Hackathon Prototype Disclaimer**: LabourGuard AI is a technical prototype developed for hackathon demonstration. It is not affiliated with any official government ministry or legal authority. All AI-generated outputs and DEMO compliance rule evaluations are decision-support indicators requiring human verification.

---

## 1. Problem Statement

Manual labour inspection of wage registers, safety logs, and establishment returns is labor-intensive, prone to human oversight, and often lacks objective risk prioritization. LabourGuard AI automates text extraction, clause verification, missing data detection, and risk scoring to empower inspectors with instant AI-assisted audit intelligence.

---

## 2. Core Features

- **Multi-Format Document Parsing**: PDF text extraction and OCR image processor integration.
- **Server-Side Gemini AI Integration**: Automated extraction of employer metadata, clause verification, discrepancy detection, and statutory evidence mapping.
- **Transparent Risk Scoring Model**: Explainable scoring model ($0\text{--}100$) with impact weightings for missing fields, discrepancies, and findings.
- **Interactive Command Center**: Real-time KPI summary cards, Recharts visualizations, search/filtering, and establishment inspection registries.
- **Official Legal Audit Reports**: Structured printable reports with SHA256 document verification hashes and officer signature blocks.
- **System Health Monitoring**: Live background health checks for FastAPI, PostgreSQL, Gemini AI, and OCR services.

---

## 3. Technology Stack

- **Frontend**: React 18, Vite 6, Tailwind CSS 4, Recharts, Lucide Icons
- **Backend**: Python 3.14, FastAPI, SQLAlchemy 2.0, Pydantic v2, PyJWT, Bcrypt
- **Database**: PostgreSQL (with graceful fallback to in-memory mode for offline demonstrations)
- **AI Engine**: Google Gemini API (`gemini-1.5-flash`) via server-side service
- **OCR Engine**: Modular `OCRProcessor` interface with fallback status reporting

---

## 4. Directory Architecture

```
LabourGuard AI/
├── backend/
│   ├── app/
│   │   ├── main.py                # FastAPI entry point & CORS configuration
│   │   ├── core/                  # Security (bcrypt & JWT), settings, config
│   │   ├── api/                   # REST API routers (/auth, /documents, /health, /analyses)
│   │   ├── models/                # SQLAlchemy database models (User, Document, Analysis, Finding, Report)
│   │   ├── schemas/               # Pydantic validation schemas
│   │   ├── services/              # Gemini AI service & OCR interface
│   │   ├── database/              # PostgreSQL connection & graceful fallback
│   │   ├── auth/                  # JWT authentication middleware
│   │   ├── document_processing/   # PDF & file text extractor
│   │   ├── compliance/            # DEMO rules engine, risk scoring & evaluation
│   │   └── reports/               # Printable legal audit report generator
│   ├── uploads/                   # Secure document file storage
│   ├── tests/                     # Pytest test suite (health, auth, docs, scoring)
│   ├── requirements.txt
│   └── .env.example
├── src/
│   ├── components/                # React UI components (Landing, Login, Dashboard, etc.)
│   ├── services/                  # Unified API Client (apiClient.js)
│   └── data/                      # Mock datasets & officer role presets
├── public/                        # Visual assets & images
├── package.json
└── README.md
```

---

## 5. Setup Instructions for Windows

### Prerequisites
- **Python**: 3.10+ (Tested on Python 3.14)
- **Node.js**: v18+ & npm
- **PostgreSQL**: Optional local instance or remote PostgreSQL URI (e.g. `postgresql://postgres:postgres@localhost:5432/labourguard`).

---

### Backend Setup & Server Execution

1. Open PowerShell and navigate to the project directory:
   ```powershell
   cd "C:\Users\admin\Desktop\LabourGuard AI"
   ```

2. Create & activate Python virtual environment:
   ```powershell
   python -m venv backend/venv
   .\backend\venv\Scripts\Activate.ps1
   ```

3. Install Python dependencies:
   ```powershell
   .\backend\venv\Scripts\python -m pip install -r backend/requirements.txt
   ```

4. Configure `.env` file:
   Copy `.env.example` to `.env` in `backend/`:
   ```powershell
   Copy-Item backend/.env.example backend/.env
   ```
   Edit `backend/.env` with your settings:
   ```env
   DATABASE_URL=postgresql://postgres:postgres@localhost:5432/labourguard
   GEMINI_API_KEY=your_gemini_api_key_here
   JWT_SECRET=super_secret_jwt_key_labourguard_ai_2026
   FRONTEND_URL=http://localhost:5173
   ```

5. Run Pytest test suite:
   ```powershell
   $env:PYTHONPATH="backend"
   .\backend\venv\Scripts\python -m pytest backend/tests
   ```

6. Start FastAPI Backend Server:
   ```powershell
   $env:PYTHONPATH="backend"
   .\backend\venv\Scripts\python -m uvicorn app.main:app --host 127.0.0.1 --port 8000 --reload
   ```

   - **API Base URL**: `http://localhost:8000/api`
   - **Interactive API Documentation (Swagger UI)**: `http://localhost:8000/docs`
   - **Health Check**: `http://localhost:8000/api/health`

---

### Frontend Setup & Startup

1. Open a new PowerShell terminal:
   ```powershell
   cd "C:\Users\admin\Desktop\LabourGuard AI"
   ```

2. Install Node dependencies:
   ```powershell
   npm install
   ```

3. Start Vite Frontend Dev Server:
   ```powershell
   npm run dev
   ```

   - **Application URL**: `http://localhost:5173`

---

## 6. 3-5 Minute Hackathon Presentation Flow

1. **Landing Page**: Introduce LabourGuard AI hero, architecture overview, and press **"Start Inspection"**.
2. **Login Portal**: Click preset **Inspector** login or log in with credentials to issue JWT token.
3. **Command Center**: View real-time KPI metrics, risk level distributions, and inspection activity graphs.
4. **Document Upload**: Navigate to **Documents (AI OCR)**, select a PDF/image file or click a pre-analyzed sample document.
5. **Real-time Pipeline**: Observe active stage progress (Text Extraction $\rightarrow$ Gemini AI Engine $\rightarrow$ DEMO Rules $\rightarrow$ Risk Scoring).
6. **Findings & Discrepancies**: Inspect extracted metadata, missing statutory clauses, evidence snippets, and transparent risk factors.
7. **Legal Audit Report**: Click **"Generate Legal Inspection Report"**, review verification disclaimer, and trigger browser print (`Ctrl+P` / Print button).
8. **Dashboard Statistics**: Return to Dashboard to view updated inspection counts.

---

## 7. Security & Privacy

- **API Key Security**: `GEMINI_API_KEY` is kept strictly server-side.
- **Authentication**: Direct `bcrypt` password hashing and `PyJWT` Bearer session validation.
- **File Validation**: Strict MIME type filtering (`.pdf`, `.png`, `.jpg`, `.jpeg`) and size limits ($10\text{ MB}$).
- **Legal Compliance**: Mandatory `"Requires Verification"` tags on all AI outputs.

---

## 8. Known Limitations & Future Scope

- **Limitations**: Statutory rules are implemented as configurable DEMO rules until connected to authoritative legal registries.
- **Future Scope**: Direct integration with state labour ministry portals, mobile field inspector application with offline caching, and automated GIS GIS heatmapping.
