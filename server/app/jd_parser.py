import os
from PyPDF2 import PdfReader
from openai import OpenAI
from dotenv import load_dotenv
import json

load_dotenv()
client = OpenAI(api_key=os.getenv('OPEN_AI_SECRET_KEY'))

def main(file_name) :

    jd_path = os.path.abspath(f'./utils/{file_name}')

    def extract_text_from_pdf(file_path):
        with open(file_path, 'rb') as file:
            pdf_reader = PdfReader(file)
            text = ''
            for page_num in range(len(pdf_reader.pages)):
                page = pdf_reader.pages[page_num]
                text += page.extract_text()
            return text


    jd_text = extract_text_from_pdf(jd_path)

    FORMAT = """[
    {
        "job_title": "// The job title",
        "job_description": "// A short description of the job"
    }
    ]"""

    def generate_jd_object(text, formatt=FORMAT):
        response = client.chat.completions.create(
            model="gpt-3.5-turbo-1106",
            messages=[
                {"role": "system",
                    "content": f"Generate a dictionary from the given text extracted from a Job description document in the following format:\n\n{formatt}\n\n "},
                {"role": "user", "content": f"Generate a dictionary from the given text extracted from a Job description PDF:\n\n{text}"}
            ]
        )
        return response.choices[0].message.content

    jd_dictionary = generate_jd_object(jd_text)
    jd_dict = json.loads(jd_dictionary)
    # json_path = os.path.abspath('./utils/resume_dictionary.json')
    # with open(json_path, 'w') as json_file:
    #     json.dump(resume_dict, json_file)

    return jd_dict

# if __name__ == '__main__':
#     main(file_name)

