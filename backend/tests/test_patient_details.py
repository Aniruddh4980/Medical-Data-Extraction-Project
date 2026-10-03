from backend.src.parser_patient_details import PatientDetailsParser
import pytest

@pytest.fixture()
def doc1_kathy():
    document_text = '''
17/12/2020

Patient Medical Record

Patient Information Birth Date
Kathy Crawford May 6 1972
(737) 988-0851 Weight’
9264 Ash Dr 95

New York City, 10005

United States Height:
190
In Case of Emergency
nr ——
Simeone Crawford 9266 Ash Dr
New York City, New York, 10005
Home phone United States
(990) 375-4621 Work phone

Genera! Medical History

ee

a a — ee SE -

Chicken Pox (Varicella): Measites:

IMMUNE IMMUNE

Have you had the Hepatitis B vaccination?

No

List any Medical Problems (asthma, seizures, headaches}:

Migraine

5 Name of Insurance Company:
Random insuarance Company

_ Policy Number:
| 7115207313

Do you have medical insurance?
Yes
Medical Insurance Details

List any allergies:
Peanuts

List any medication taken regularly:

Triptans

4789 Bollinger Rd
Jersey City, New Jersey, 07030

Expiry Date:
30 December 2020

'''
    return PatientDetailsParser(document_text)

@pytest.fixture()
def doc2_jerry():
    document_text = '''
17/12/2020

Patient Medical Record

Patient Information Birth Date

Jerry Lucas May 2 1998

(279) 920-8204 Weight:

4218 Wheeler Ridge Dr 97

Buffalo, New York, 14201 Heicht:

United States eign.
170

In Case of Emergency

Joe Lucas | 4218 Wheeler Ridge Dr
Buffalo, New York, 14201
Home phone , United States
Work phone

General Medical History

Chicken Pox (Varicelia): Measles:

IMMUNE NOT IMMUNE

Have you had the Hepatitis B vaccination?

Yes

List any Medical Problems (asthma, seizures, headaches):
N/A
a IED
SS si essere

Name of Insurance Company:

Random Insuarance Company 4218 Smeeler Ridge Dr
5638746258
Expiry Date:

31 December 2020

Do you have medical insurance?

Yes

Medical Insurance Details

List any allergies:

N/A

List any medication taken reguiarly:

N/A
'''
    return PatientDetailsParser(document_text)

@pytest.fixture()
def doc3_empty():
    return PatientDetailsParser('')

def test_get_name(doc1_kathy, doc2_jerry, doc3_empty):
    assert doc1_kathy.get_field('patient_name') == 'Kathy Crawford'
    assert doc2_jerry.get_field('patient_name') == 'Jerry Lucas'
    assert doc3_empty.get_field('patient_name') == None

def test_get_number(doc1_kathy, doc2_jerry, doc3_empty):
    assert doc1_kathy.get_field('phone_number') == '(737) 988-0851'
    assert doc2_jerry.get_field('phone_number') == '(279) 920-8204'
    assert doc3_empty.get_field('phone_number') == None

def test_get_vaccine_status(doc1_kathy, doc2_jerry, doc3_empty):
    assert doc1_kathy.get_field('vaccine_status') == 'No'
    assert doc2_jerry.get_field('vaccine_status') == 'Yes'
    assert doc3_empty.get_field('vaccine_status') == None

def test_get_medical_problems(doc1_kathy, doc2_jerry, doc3_empty):
    assert doc1_kathy.get_field('medical_problems') == 'Migraine'
    assert doc2_jerry.get_field('medical_problems') == 'N/A'
    assert doc3_empty.get_field('medical_problems') == None

def test_parse(doc1_kathy, doc2_jerry, doc3_empty):
    record_kathy = doc1_kathy.parse()
    assert record_kathy == {
            'patient_name': 'Kathy Crawford',
            'phone_number': '(737) 988-0851',
            'vaccine_status': 'No',
            'medical_problems': 'Migraine',
        }

    record_jerry = doc2_jerry.parse()
    assert record_jerry == {
        'patient_name': 'Jerry Lucas',
        'phone_number': '(279) 920-8204',
        'vaccine_status': 'Yes',
        'medical_problems': 'N/A',
    }

    record_empty = doc3_empty.parse()
    assert record_empty == {
        'patient_name': None,
        'phone_number': None,
        'vaccine_status': None,
        'medical_problems': None,
    }