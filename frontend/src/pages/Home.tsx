import React, { useState } from 'react';
import { Header } from '../components/Header';
import { UploadArea } from '../components/UploadArea';
import { PdfViewer } from '../components/PdfViewer';
import { NavigationBar } from '../components/NavigationBar';
import { DocumentTabs } from '../components/DocumentTabs';
import { DynamicForm } from '../components/DynamicForm';
import { ActionButtons } from '../components/ActionButtons';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { extractDocument } from '../services/api';
import { exportFormDataToTxt } from '../utils/exportText';
import type { DocumentType, PatientDetails, Prescription } from '../types/form';
import toast from 'react-hot-toast';

const initialPatientState: PatientDetails = {
  patient_name: '',
  phone_number: '',
  medical_problems: '',
  hepatitis_vaccination: '',
  allergies: '',
};

const initialPrescriptionState: Prescription = {
  patient_name: '',
  medicine: '',
  dosage: '',
  refills: '',
  doctor: '',
  prescription_date: '',
};

export const Home: React.FC = () => {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [activeTab, setActiveTab] = useState<DocumentType>('prescription');
  const [isExtracting, setIsExtracting] = useState<boolean>(false);

  // Separate states for the two forms to preserve user changes when toggling tabs
  const [patientData, setPatientData] = useState<PatientDetails>(initialPatientState);
  const [prescriptionData, setPrescriptionData] = useState<Prescription>(initialPrescriptionState);

  const handleFileSelect = (file: File) => {
    setUploadedFile(file);
    setCurrentPage(1);
    setTotalPages(1);
    // Reset data when a new file is uploaded
    setPatientData(initialPatientState);
    setPrescriptionData(initialPrescriptionState);
    
    const fileName = file.name.toLowerCase();
    if (fileName.startsWith('pre')) {
      setActiveTab('prescription');
    } else if (fileName.startsWith('pd')) {
      setActiveTab('patient_details');
    }
  };

  const handleRemoveFile = () => {
    setUploadedFile(null);
    setCurrentPage(1);
    setTotalPages(1);
    setPatientData(initialPatientState);
    setPrescriptionData(initialPrescriptionState);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handlePdfLoadSuccess = (numPages: number) => {
    setTotalPages(numPages);
  };

  const handleTabChange = (tab: DocumentType) => {
    setActiveTab(tab);
  };

  const handleFieldChange = (name: string, value: string) => {
    if (activeTab === 'prescription') {
      setPrescriptionData((prev) => ({ ...prev, [name]: value }));
    } else {
      setPatientData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleAutoExtract = async () => {
    if (!uploadedFile) {
      toast.error('Please upload a PDF file first.');
      return;
    }

    const fileName = uploadedFile.name.toLowerCase();
    if (activeTab === 'prescription' && !fileName.startsWith('pre')) {
      toast.error('Incorrect form type');
      return;
    }
    if (activeTab === 'patient_details' && !fileName.startsWith('pd')) {
      toast.error('Incorrect form type');
      return;
    }

    setIsExtracting(true);
    try {
      const data = await extractDocument(uploadedFile, activeTab);
      
      if (data.error) {
        toast.error(`Extraction failed: ${data.error}`);
        return;
      }

      if (activeTab === 'prescription') {
        setPrescriptionData({
          patient_name: data.patient_name || '',
          medicine: data.medicines || '',
          dosage: data.directions || '',
          refills: data.refill || '',
          doctor: data.doctor || '',
          prescription_date: data.prescription_date || '',
        });
      } else {
        setPatientData({
          patient_name: data.patient_name || '',
          phone_number: data.phone_number || '',
          medical_problems: data.medical_problems || '',
          hepatitis_vaccination: data.vaccine_status || '',
          allergies: data.allergies || '',
        });
      }
      toast.success('Extraction complete.');
    } catch (error: any) {
      console.error('Extraction request failed:', error);
      if (error.response) {
        toast.error('Extraction failed.');
      } else {
        toast.error('Unable to reach server.');
      }
    } finally {
      setIsExtracting(false);
    }
  };

  const handleExport = () => {
    const currentData = activeTab === 'prescription' ? prescriptionData : patientData;
    const originalName = uploadedFile ? uploadedFile.name : 'patient_record.pdf';
    exportFormDataToTxt(currentData, activeTab, originalName);
  };

  const currentFormData = activeTab === 'prescription' ? prescriptionData : patientData;

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col font-sans relative">
      <Header />
      
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 py-6 md:px-6 md:py-8 flex flex-col relative">
        {/* Absolute loader overlay for the main content area when processing */}
        {isExtracting && <LoadingSpinner />}

        <div className="grid grid-cols-1 lg:grid-cols-10 gap-6 items-start flex-1">
          
          {/* PDF Viewer Panel (Left - 40% / lg:col-span-4) */}
          <div className="lg:col-span-4 bg-white rounded-xl shadow-lg border border-[#E5E7EB] p-4 flex flex-col min-h-[500px] w-full">
            <h2 className="text-base font-bold text-gray-800 border-b border-gray-150 pb-3 mb-4 flex items-center justify-between">
              <span>Document Preview</span>
              {uploadedFile && (
                <span className="text-xs font-semibold px-2 py-0.5 bg-blue-50 text-blue-700 rounded-full">
                  PDF Loaded
                </span>
              )}
            </h2>
            
            <div className="flex-1 flex flex-col justify-between">
              {uploadedFile ? (
                <>
                  <PdfViewer
                    file={uploadedFile}
                    currentPage={currentPage}
                    onLoadSuccess={handlePdfLoadSuccess}
                    onRemoveFile={handleRemoveFile}
                  />
                  <NavigationBar
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                    disabled={isExtracting}
                  />
                </>
              ) : (
                <UploadArea onFileSelect={handleFileSelect} />
              )}
            </div>
          </div>
          
          {/* Form Panel (Right - 60% / lg:col-span-6) */}
          <div className="lg:col-span-6 bg-white rounded-xl shadow-lg border border-[#E5E7EB] p-4 flex flex-col min-h-[500px] w-full">
            <h2 className="text-base font-bold text-gray-800 border-b border-gray-150 pb-3 mb-4">
              Form Data Fields
            </h2>
            
            <DocumentTabs
              activeTab={activeTab}
              onTabChange={handleTabChange}
              disabled={isExtracting}
            />
            
            <div className="flex-1 flex flex-col justify-between">
              <DynamicForm
                activeTab={activeTab}
                formData={currentFormData}
                onFieldChange={handleFieldChange}
                disabled={isExtracting}
              />
              
              <ActionButtons
                onExtract={handleAutoExtract}
                onExport={handleExport}
                extractDisabled={!uploadedFile}
                exportDisabled={!uploadedFile}
                isExtracting={isExtracting}
              />
            </div>
          </div>

        </div>
      </main>
    </div>
  );
};
