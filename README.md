# Medical Data Extraction System 📄🏥

[![Python](https://img.shields.io/badge/Python-3.10%2B-blue?logo=python&logoColor=white)](https://www.python.org/)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.100%2B-009688?logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com/)
[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5%2B-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-6%2B-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-4.0-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

An end-to-end, full-stack intelligent medical document processing application. It automatically converts scanned healthcare PDFs—such as **Doctor Prescriptions** and **Patient Detail Records**—into validated, structured digital data using **Computer Vision (OpenCV)**, **Optical Character Recognition (Tesseract OCR)**, and **Regex Pattern Parsing**.

---

## 📑 Table of Contents

- [Key Features](#-key-features)
- [System Architecture](#-system-architecture)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Prerequisites](#-prerequisites)
- [Installation & Setup](#-installation--setup)
- [Running the Application](#-running-the-application)
- [API Reference](#-api-reference)
- [Extracted Data Schema](#-extracted-data-schema)
- [Testing](#-testing)
- [License](#-license)

---

## ✨ Key Features

- **Automated Text & Data Extraction**: Ingests multi-page medical PDFs and accurately extracts clinical and demographic fields.
- **Advanced Image Preprocessing**: Employs an OpenCV pipeline (grayscale conversion, median blurring, bicubic upscaling, adaptive Gaussian thresholding, morphological noise removal) to optimize degraded, noisy scans for OCR.
- **Smart Document Classification**: Automatically classifies uploaded files into `Prescription` or `Patient Details` based on filename prefixes (`pre_*` vs. `pd_*`).
- **Interactive Split-Screen UI**:
  - Embedded PDF viewer with page navigation, zoom controls, and fit-to-width mode.
  - Live side-by-side editable form fields allowing medical staff to review and adjust extracted fields in real time.
- **Structured Export**: Instant one-click export of validated records into clean, standardized `.txt` files for EHR/EMR downstream ingestion.
- **Single-Command Developer Workflow**: Concurrent launch of both Vite frontend and FastAPI backend via a single command (`npm run dev`).

---

## 🏛️ System Architecture

```text
┌─────────────────┐         HTTP (Multipart)         ┌─────────────────────┐
│  React Frontend │ ───────────────────────────────> │   FastAPI Backend   │
│ (Vite + React)  │ <─────────────────────────────── │  (Uvicorn @ :8000)  │
└─────────────────┘          JSON Response           └──────────┬──────────┘
         │                                                      │
         │ Upload PDF                                           ▼
         │                                              ┌──────────────────┐
         │                                              │ pdf2image        │
         │                                              │ (Poppler Engine) │
         │                                              └─────────┬────────┘
         │                                                        │ PIL Images
         │                                                        ▼
         │                                              ┌──────────────────┐
         │                                              │ OpenCV Pipeline  │
         │                                              │ (Denoise/Thresh) │
         │                                              └─────────┬────────┘
         │                                                        │ Clean Image
         │                                                        ▼
         │                                              ┌──────────────────┐
         │                                              │ Tesseract OCR    │
         │                                              │ (Raw Text Dump)  │
         │                                              └─────────┬────────┘
         │                                                        │
         │                                                        ▼
         │                                              ┌──────────────────┐
         │                                              │ Regex Parsers    │
         │                                              │ (Field Mapping)  │
         │                                              └─────────┬────────┘
         ▼                                                        │
┌─────────────────┐                                               │
│ Structured Form │ <─────────────────────────────────────────────┘
│ & Export (.txt) │
└─────────────────┘
```

---

## 🛠️ Tech Stack

### Frontend
- **Framework**: [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- **Bundler & Dev Server**: [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **PDF Rendering**: [`react-pdf`](https://github.com/wojtekmaj/react-pdf) / `pdfjs-dist`
- **UI Notifications**: [`react-hot-toast`](https://react-hot-toast.com/)
- **Icons**: [`react-icons`](https://react-icons.github.io/react-icons/)
- **HTTP Client**: [`axios`](https://axios-http.com/)
- **Task Runner**: [`concurrently`](https://github.com/open-cli-tools/concurrently)

### Backend
- **Framework**: [FastAPI](https://fastapi.tiangolo.com/) with [Uvicorn](https://www.uvicorn.org/)
- **OCR Engine**: [Tesseract OCR](https://github.com/tesseract-ocr/tesseract) via `pytesseract`
- **PDF Conversion**: `pdf2image` backed by [Poppler](https://poppler.freedesktop.org/)
- **Image Processing**: `opencv-python` (OpenCV), `numpy`, `pillow`
- **Data Manipulation**: `pandas`
- **Testing**: `pytest`

---

## 📂 Project Structure

```bash
Medical_data_extraction-project/
├── backend/
│   ├── resources/                     # Sample medical PDF documents & assets
│   │   ├── patient_details/           # Sample patient detail PDFs (pd_1.pdf, etc.)
│   │   └── prescription/              # Sample prescription PDFs (pre_1.pdf, etc.)
│   ├── src/
│   │   ├── extractor.py               # PDF-to-image conversion & OCR execution
│   │   ├── main.py                    # FastAPI application & /extract_from_doc endpoint
│   │   ├── parser_generic.py          # Base medical parser class
│   │   ├── parser_patient_details.py  # Regex logic for patient records
│   │   ├── parser_prescription.py     # Regex logic for doctor prescriptions
│   │   └── util.py                    # OpenCV image processing & thresholding
│   ├── tests/                         # Pytest unit tests for regex parsers
│   │   ├── test_patient_details.py
│   │   └── test_prescription_parser.py
│   └── requirements.txt               # Backend Python dependencies
├── frontend/
│   ├── public/                        # Static assets & SVG icons
│   ├── src/
│   │   ├── components/                # Modular UI components
│   │   │   ├── ActionButtons.tsx      # Extract & Export buttons
│   │   │   ├── DocumentTabs.tsx       # Prescription / Patient Details switcher
│   │   │   ├── DynamicForm.tsx        # Dynamic editable form container
│   │   │   ├── FormField.tsx          # Reusable styled input field
│   │   │   ├── Header.tsx             # Navbar & branding
│   │   │   ├── LoadingSpinner.tsx     # Processing overlay
│   │   │   ├── PdfViewer.tsx          # PDF rendering with zoom & pagination
│   │   │   └── UploadArea.tsx         # Drag-and-drop file upload zone
│   │   ├── pages/
│   │   │   └── Home.tsx               # Main application workspace
│   │   ├── services/
│   │   │   └── api.ts                 # Axios API integration with FastAPI
│   │   ├── types/
│   │   │   └── form.ts                # TypeScript interfaces & types
│   │   └── utils/
│   │       └── exportText.ts          # Structured .txt download utility
│   ├── package.json                   # Frontend dependencies & npm scripts
│   ├── tsconfig.json                  # TypeScript configuration
│   └── vite.config.ts                 # Vite bundler configuration
└── README.md                          # Project documentation
```

---

## ⚙️ Prerequisites

Before getting started, make sure you have the following installed:

1. **Python 3.10+**: [Download Python](https://www.python.org/downloads/)
2. **Node.js 18+ & npm**: [Download Node.js](https://nodejs.org/)
3. **Tesseract OCR**:
   - **Windows**: Download the installer from [UB-Mannheim Tesseract](https://github.com/UB-Mannheim/tesseract/wiki).
     - Default installation path: `C:\Program Files\Tesseract-OCR\tesseract.exe`
   - **macOS**: `brew install tesseract`
   - **Linux (Ubuntu/Debian)**: `sudo apt-get install tesseract-ocr`
4. **Poppler**:
   - **Windows**: Download the latest binary from [Poppler for Windows](https://github.com/oschwartz10612/poppler-windows/releases) and extract it (e.g., `C:\poppler-xx.xx.x\Library\bin`).
   - **macOS**: `brew install poppler`
   - **Linux (Ubuntu/Debian)**: `sudo apt-get install poppler-utils`

> **Note**: Verify or update the paths in `backend/src/extractor.py` if your Tesseract or Poppler installation path differs:
> ```python
> POPPLER_PATH = r'C:\poppler-26.02.0\Library\bin'
> pytesseract.pytesseract.tesseract_cmd = r'C:\Program Files\Tesseract-OCR\tesseract.exe'
> ```

---

## 🚀 Installation & Setup

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/Medical_data_extraction-project.git
cd Medical_data_extraction-project
```

### 2. Set Up the Python Virtual Environment
In the root directory of the project, create and activate a virtual environment:

```bash
# Windows
python -m venv .venv
.venv\Scripts\activate

# macOS / Linux
python3 -m venv .venv
source .venv/bin/activate
```

Install backend dependencies:
```bash
pip install -r backend/requirements.txt
```

### 3. Install Frontend Dependencies
```bash
cd frontend
npm install
```

---

## 💻 Running the Application

### Option A: One-Command Startup (Recommended)
From inside the `frontend/` directory, run:

```bash
npm run dev
```

This uses `concurrently` to spin up both servers at once:
- **Frontend**: `http://localhost:5173`
- **Backend API**: `http://127.0.0.1:8000`

---

### Option B: Run Services Separately

**Terminal 1 — Backend:**
```bash
# Activate your virtual environment first
cd backend/src
python main.py
```
*The FastAPI backend will start on `http://127.0.0.1:8000`.*

**Terminal 2 — Frontend:**
```bash
cd frontend
npm run dev
```
*The Vite frontend will start on `http://localhost:5173`.*

---

## 📡 API Reference

### Extract Document
Extracts structured information from an uploaded medical PDF file.

- **URL**: `/extract_from_doc`
- **Method**: `POST`
- **Content-Type**: `multipart/form-data`

#### Request Parameters
| Parameter | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `file` | `file` (binary) | Yes | The medical PDF document to parse |
| `file_format` | `string` | Yes | Either `'prescription'` or `'patient_details'` |

#### Example Response (`prescription`)
```json
{
  "patient_name": "John Doe",
  "patient_address": "123 Elm Street, Springfield",
  "medicines": "Amoxicillin 500mg, Paracetamol 650mg",
  "directions": "Take twice daily after meals",
  "refill": "2"
}
```

#### Example Response (`patient_details`)
```json
{
  "patient_name": "Jane Smith",
  "phone_number": "(555) 019-2834",
  "hepatitis_b_vaccination": "Yes",
  "medical_problems": "Hypertension, Mild Asthma"
}
```

Interactive Swagger documentation is available at `http://127.0.0.1:8000/docs`.

---

## 📋 Extracted Data Schema

| Document Type | Field | Description |
| :--- | :--- | :--- |
| **Prescription** | `patient_name` | Name of the patient |
| | `patient_address` | Address / residence of the patient |
| | `medicines` | Prescribed medications & dosages |
| | `directions` | Instructions for intake & timing |
| | `refill` | Number of authorized refills |
| **Patient Details** | `patient_name` | Full name of the patient |
| | `phone_number` | Contact / mobile number |
| | `hepatitis_b_vaccination` | Vaccination status (`Yes` / `No`) |
| | `medical_problems` | Prior medical history and chronic conditions |

---

## 🧪 Testing

To run the automated backend parser test suite:

```bash
# From project root with .venv activated
pytest backend/tests
```

Unit tests validate:
- Accurate extraction of names, addresses, and medication instructions against sample test documents.
- Error handling when documents are poorly formatted or missing required markers.

---

## 🤝 Contributing

Contributions, bug reports, and feature requests are welcome!
1. Fork the Project.
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`).
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`).
4. Push to the Branch (`git push origin feature/AmazingFeature`).
5. Open a Pull Request.

---

## 📝 License

Distributed under the [MIT License](LICENSE).
