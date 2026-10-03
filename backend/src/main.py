from fastapi import FastAPI, Form, UploadFile, File
import uvicorn
import uuid
import os
from extractor import extract
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post('/extract_from_doc')
def extract_from_doc(
        file_format: str = Form(...),
        file: UploadFile = File(...),
):
    contents = file.file.read()
    
    # Calculate absolute path to the backend/uploads directory
    current_dir = os.path.dirname(os.path.abspath(__file__))
    backend_dir = os.path.dirname(current_dir)
    uploads_dir = os.path.join(backend_dir, 'uploads')
    
    # Ensure uploads directory exists
    os.makedirs(uploads_dir, exist_ok=True)
    
    file_path = os.path.join(uploads_dir, str(uuid.uuid4()) + '.pdf')
    
    with open(file_path, 'wb') as f:
        f.write(contents)

    try:
        data = extract(file_path, file_format)
    except Exception as e:
        data = {
            'error': str(e)
        }

    if os.path.exists(file_path):
        os.remove(file_path)

    return data

if __name__ == "__main__":
    uvicorn.run(app, host="127.0.0.1", port=8000)