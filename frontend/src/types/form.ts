export type DocumentType = 'prescription' | 'patient_details';

export interface PatientDetails {
  patient_name: string;
  phone_number: string;
  medical_problems: string;
  hepatitis_vaccination: string;
  allergies: string;
}

export interface Prescription {
  patient_name: string;
  medicine: string;
  dosage: string;
  refills: string;
  doctor: string;
  prescription_date: string;
}

export type FormState = PatientDetails | Prescription;
