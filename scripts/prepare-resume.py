"""Repair only the LinkedIn hyperlink in the website's resume copy."""
from pathlib import Path
from pypdf import PdfReader, PdfWriter
from pypdf.generic import NameObject, TextStringObject

source = Path('D:/Grind/Resume stuff/Full Stack/No phone number/Sourav Chandhok resume.pdf')
target = Path('dist/resume.pdf')
reader = PdfReader(source)
writer = PdfWriter()
writer.clone_document_from_reader(reader)
count = 0
for page in writer.pages:
    for annotation in page.get('/Annots', []):
        action = annotation.get_object().get('/A')
        if action and 'linkedin.com/in/souravchandhok' in str(action.get('/URI', '')):
            action[NameObject('/URI')] = TextStringObject('https://www.linkedin.com/in/souravchandhok')
            count += 1
assert count == 1
with target.open('wb') as stream:
    writer.write(stream)
reopened = PdfReader(target)
assert [p.extract_text() for p in reader.pages] == [p.extract_text() for p in reopened.pages]
assert all(not str(a.get_object().get('/A', {}).get('/URI', '')).startswith('file:') for p in reopened.pages for a in p.get('/Annots', []))
print('Repaired one LinkedIn URL; resume text and source PDF preserved.')
