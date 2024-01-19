import os
from PyPDF2 import PdfReader
from openai import OpenAI
from dotenv import load_dotenv
import json
import json

load_dotenv()
client = OpenAI(api_key=os.getenv('OPEN_AI_SECRET_KEY'))

def main(file_name) :

    resume_path = os.path.abspath(f'./utils/{file_name}')

    def extract_text_from_pdf(file_path):
        with open(file_path, 'rb') as file:
            pdf_reader = PdfReader(file)
            text = ''
            for page_num in range(len(pdf_reader.pages)):
                page = pdf_reader.pages[page_num]
                text += page.extract_text()
            return text


    resume_text = extract_text_from_pdf(resume_path)

    FORMAT = """[
    {
        "college_name": ["Marathwada Mitra Mandal’s College of Engineering"],
        "company_names": None,
        "degree": ["B.E. IN COMPUTER ENGINEERING"],
        "designation": ["Manager",
                        "TECHNICAL CONTENT WRITER",
                        "DATA ENGINEER"],
        "email": "omkarpathak27@gmail.com",
        "mobile_number": "8087996634",
        "name": "Omkar Pathak",
        "no_of_pages": 3,
        "skills": ["Operating systems",
                "Linux",
                "Github",
                "Testing",
                "Content",
                "Automation",
                "Python",
                "Css",
                "Website",
                "Django",
                "Opencv",
                "Programming",
                "C",
                ...],
        "total_experience": 1.83
    }
    ]"""


    def generate_resume_dictionary(text, formatt=FORMAT):
        response = client.chat.completions.create(
            model="gpt-3.5-turbo-1106",
            messages=[
                {"role": "system",
                    "content": f"Generate a dictionary from the given resume text by the user in the following format:\n\n{formatt}"},
                {"role": "user", "content": f"Generate a dictionary from the given resume text:\n\n{text}"}
            ]
        )
        return response.choices[0].message.content

    resume_dictionary = generate_resume_dictionary(resume_text)

    resume_dict = json.loads(resume_dictionary)
    # Save resume_dict as a JSON file
    json_path = os.path.abspath('./utils/resume_dictionary.json')
    with open(json_path, 'w') as json_file:
        json.dump(resume_dict, json_file)

    return resume_dict

if __name__ == '__main__':
    main(file_name)

