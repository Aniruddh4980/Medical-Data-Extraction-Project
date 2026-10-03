import React from 'react';
import type { DocumentType, FormState } from '../types/form';
import { FormField } from './FormField';

interface DynamicFormProps {
  activeTab: DocumentType;
  formData: FormState;
  onFieldChange: (name: string, value: string) => void;
  disabled?: boolean;
}

export const patientFieldsConfig = [
  { name: 'patient_name', label: 'Patient Name' },
  { name: 'phone_number', label: 'Phone Number' },
  { name: 'medical_problems', label: 'Medical Problems' },
  { name: 'hepatitis_vaccination', label: 'Hepatitis Vaccination' },
  { name: 'allergies', label: 'Allergies' },
];

export const prescriptionFieldsConfig = [
  { name: 'patient_name', label: 'Patient Name' },
  { name: 'medicine', label: 'Medicine' },
  { name: 'dosage', label: 'Dosage' },
  { name: 'refills', label: 'Refills' },
  { name: 'doctor', label: 'Doctor' },
  { name: 'prescription_date', label: 'Prescription Date' },
];

export const DynamicForm: React.FC<DynamicFormProps> = ({
  activeTab,
  formData,
  onFieldChange,
  disabled = false,
}) => {
  const fields = activeTab === 'prescription' ? prescriptionFieldsConfig : patientFieldsConfig;

  return (
    <form className="flex flex-col gap-4 w-full" onSubmit={(e) => e.preventDefault()}>
      {fields.map((field) => (
        <FormField
          key={field.name}
          label={field.label}
          name={field.name}
          value={(formData as any)[field.name] || ''}
          onChange={onFieldChange}
          disabled={disabled}
        />
      ))}
    </form>
  );
};
