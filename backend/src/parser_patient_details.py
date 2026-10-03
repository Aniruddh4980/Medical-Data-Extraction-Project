import re
from pprint import pprint
from parser_generic import MedicalDocParser

class PatientDetailsParser(MedicalDocParser):
    def __init__(self, text):
        MedicalDocParser.__init__(self, text)

    def parse(self):
        return {
            'patient_name': self.get_field('patient_name'),
            'phone_number': self.get_field('phone_number'),
            'vaccine_status': self.get_field('vaccine_status'),
            'medical_problems': self.get_field('medical_problems'),
        }

    def get_field(self, field_name):
        pattern_dict = {
            'patient_name': {'pattern': 'Date\s+([A-Za-z]+\s+[A-Za-z]+)', 'flags': 0},
            'phone_number': {'pattern': '(\(\d*\).*)Weight', 'flags': 0},
            'vaccine_status': {'pattern': 'vaccination\?\s+(Yes|No)', 'flags': 0},
            'medical_problems': {'pattern': 'headaches\W*(.*)', 'flags': 0},
        }

        pattern_object = pattern_dict.get(field_name)
        if pattern_object:
            matches = re.findall(pattern_object['pattern'], self.text, flags=pattern_object['flags'])
            if len(matches) > 0:
                return matches[0].strip()

if __name__ == '__main__':
    document_text = '''
17/12/2020

Patient Medical Record

Patient Information Birth Date
Kathy Crawford May 6 1972
(737) 988-0851 Weight’
9264 Ash Dr 95
'''

    pp = PatientDetailsParser(document_text)
    pprint(pp.parse())