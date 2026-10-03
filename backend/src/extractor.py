from pdf2image import convert_from_path
import pytesseract
import util
from parser_prescription import PrescriptionParser
from parser_patient_details import PatientDetailsParser

POPPLER_PATH = r'C:\poppler-26.02.0\Library\bin'
pytesseract.pytesseract.tesseract_cmd=r'C:\Program Files\Tesseract-OCR\tesseract.exe'

def extract(file_path, file_format):
    # Extracting text from pdf file
    pages = convert_from_path(file_path, poppler_path=POPPLER_PATH)
    document_text = ''
    for page in pages:
        processed_img = util.preprocess_image(page)
        text = pytesseract.image_to_string(processed_img, lang='eng')
        document_text += '\n' + text

    if file_format == 'prescription':
        extracted_data = PrescriptionParser(document_text).parse()
    elif file_format =='patient_details':
        extracted_data = PatientDetailsParser(document_text).parse()
    else:
        raise Exception(f"Invalid document format: {file_format}")

    return extracted_data

if __name__ == '__main__':
    data = extract('../resources/patient_details/pd_2.pdf', 'patient_details')
    print(data)