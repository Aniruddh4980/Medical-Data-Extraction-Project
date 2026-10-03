from backend.src.parser_prescription import PrescriptionParser
import pytest

@pytest.fixture()
def doc1_maria():
    document_text = '''
Name: Marta Sharapova Date: 5/11/2022

Address: 9 tennis court, new Russia, DC

Prednisone 20 mg
Lialda 2.4 gram

Directions:

Prednisone, Taper 5 mig every 3 days,
Finish in 2.5 weeks
Lialda - take 2 pill everyday for 1 month

Refill: 2 times
'''
    return PrescriptionParser(document_text)

@pytest.fixture()
def doc2_jerry():
    document_text = '''
Patient Medical Record

Patient Information Birth Date

Jerry Lucas May 2 1998

(279) 920-8204 Weight:

4218 Wheeler Ridge Dr 57

Buffalo, New York, 14201 Height:

United States gnt
170

In Case of Emergency

eee

Joe Lucas . 4218 Wheeler Ridge Dr
Buffalo, New York, 14201
Home phone United States
Work phone

General Medical History

Chicken Pox (Varicelia): Measles: ..

IMMUNE NOT IMMUNE

Have you had the Hepatitis B vaccination?

‘Yes

| List any Medical Problems (asthma, seizures, headaches):
N/A

7?
v

17/12/2020


'''
    return PrescriptionParser(document_text)

@pytest.fixture()
def doc3_empty():
    return PrescriptionParser('')

def test_get_name(doc1_maria, doc2_virat, doc3_empty):
    assert doc1_maria.get_field('patient_name') == 'Marta Sharapova'
    assert doc2_virat.get_field('patient_name') == 'Virat Kohli'
    assert doc3_empty.get_field('patient_name') == None

def test_get_address(doc1_maria, doc2_virat, doc3_empty):
    assert doc1_maria.get_field('patient_address') == '9 tennis court, new Russia, DC'
    assert doc2_virat.get_field('patient_address') == '2 cricket blvd, New Delhi'
    assert doc3_empty.get_field('patient_address') == None

def test_get_medicines(doc1_maria, doc2_virat, doc3_empty):
    assert doc1_maria.get_field('medicines') == ('Prednisone 20 mg'
                                                 '\nLialda 2.4 gram')
    assert doc2_virat.get_field('medicines') == '| Omeprazole 40 mg'
    assert doc3_empty.get_field('medicines') == None

def test_get_directions(doc1_maria, doc2_virat, doc3_empty):
    assert doc1_maria.get_field('directions') == ('Prednisone, Taper 5 mig every 3 days,'
                                                  '\nFinish in 2.5 weeks'
                                                  '\nLialda - take 2 pill everyday for 1 month')
    assert doc2_virat.get_field('directions') == 'Use two tablets daily for three months'
    assert doc3_empty.get_field('directions') == None

def test_get_refill(doc1_maria, doc2_virat, doc3_empty):
    assert doc1_maria.get_field('refill') == '2 times'
    assert doc2_virat.get_field('refill') == '3 times'
    assert doc3_empty.get_field('refill') == None

def test_parse(doc1_maria, doc2_virat, doc3_empty):
    record_maria = doc1_maria.parse()
    assert record_maria['patient_name'] == 'Marta Sharapova'
    assert record_maria['patient_address'] == '9 tennis court, new Russia, DC'
    assert (record_maria['medicines'] == 'Prednisone 20 mg'
                                         '\nLialda 2.4 gram')
    assert (record_maria['directions'] == 'Prednisone, Taper 5 mig every 3 days,'
                                          '\nFinish in 2.5 weeks'
                                          '\nLialda - take 2 pill everyday for 1 month')
    assert record_maria['refill'] == '2 times'

    record_virat = doc2_virat.parse()
    assert record_virat['patient_name'] == 'Virat Kohli'
    assert record_virat['patient_address'] == '2 cricket blvd, New Delhi'
    assert record_virat['medicines'] == '| Omeprazole 40 mg'
    assert record_virat['directions'] == 'Use two tablets daily for three months'
    assert record_virat['refill'] == '3 times'

    record_empty = doc3_empty.parse()
    assert record_empty['patient_name'] == None
    assert record_empty['patient_address'] == None
    assert record_empty['medicines'] == None
    assert record_empty['directions'] == None
    assert record_empty['refill'] == None