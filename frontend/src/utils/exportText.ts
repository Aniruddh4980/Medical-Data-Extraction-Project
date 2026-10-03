import { saveAs } from 'file-saver';
import type { FormState, DocumentType } from '../types/form';
import { patientFieldsConfig, prescriptionFieldsConfig } from '../components/DynamicForm';
import toast from 'react-hot-toast';

/**
 * Formats the form data and triggers a text file download.
 * Each field is written as key: value on a new line.
 */
export const exportFormDataToTxt = (
  formData: FormState,
  activeTab: DocumentType,
  originalFileName: string
) => {
  try {
    const fields = activeTab === 'prescription' ? prescriptionFieldsConfig : patientFieldsConfig;
    
    // Build text content
    const textLines = fields.map((field) => {
      const value = (formData as any)[field.name] || '';
      return `${field.name}: ${value}`;
    });
    
    const fileContent = textLines.join('\n');
    const blob = new Blob([fileContent], { type: 'text/plain;charset=utf-8' });
    
    // Generate filename
    const baseName = originalFileName.substring(0, originalFileName.lastIndexOf('.')) || 'document';
    const downloadFileName = `${baseName}_extracted.txt`;
    
    saveAs(blob, downloadFileName);
    toast.success('File downloaded.');
  } catch (error) {
    console.error('Export failed:', error);
    toast.error('Failed to export data.');
  }
};
