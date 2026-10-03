import axios from 'axios';
import type { DocumentType } from '../types/form';

const API_BASE_URL = 'http://127.0.0.1:8000';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
});

/**
 * Uploads a PDF document to be parsed/extracted by the FastAPI backend.
 * @param file The PDF file object
 * @param fileFormat The target schema format ('prescription' | 'patient_details')
 */
export const extractDocument = async (file: File, fileFormat: DocumentType) => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('file_format', fileFormat);

  const response = await apiClient.post('/extract_from_doc', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  
  return response.data;
};
