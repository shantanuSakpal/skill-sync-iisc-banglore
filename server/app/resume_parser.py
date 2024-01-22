import os
from PyPDF2 import PdfReader
from openai import OpenAI
from dotenv import load_dotenv
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
        "industryCategories": ["Cybersecurity","Cloud Computing","Artificial Intelligence","Robotics"],
        "degree": ["B.E. IN COMPUTER ENGINEERING"],
        "jobs": ["Manager",
                        "TECHNICAL CONTENT WRITER",
                        "DATA ENGINEER"],
        "mobile_number": "8087996634",
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

    skill_tags = """Angular, JavaScript, React, Vue.js, Node.js, Python, Java, C#, PHP, Ruby, HTML, Bootstrap, Django, Flask, Express.js, RESTful API Development, GraphQL, Databases (MySQL, PostgreSQL, MongoDB), Responsive Web Design, Git/GitHub, Webpack, Jira, Unit Testing, Continuous Integration/Continuous Deployment (CI/CD), Agile/Scrum Methodologies, Containerization (Docker), Microservices Architecture, Cloud Platforms (AWS, Azure, Google Cloud), Web Security, Machine Learning, Blockchain, UI/UX Design, Mobile App Development (iOS/Android), C++, SQL, Linux, Kubernetes, TypeScript, Go, Ruby, R, Scala, Spark, Pandas, CI/CD, gRPC, Protobuf, Bash, Selenium, Spacy, OpenCV, TensorFlow, Other"""

    job_tags = """App Developer, Software Engineer, Web Developer, Data Scientist, Database Administrator, Network Engineer, Security Analyst, Cloud Architect, Machine Learning Engineer, Data Analyst, Data Scientist, Blockchain Developer, Big Data Engineer, IoT Engineer, AI Researcher, Roboticist, Computer Hardware Engineer, Embedded Systems Engineer, Full Stack Developer, DevOps Engineer, QA Automation Tester, HPC Engineer, Computational Linguist, Bioinformatician, Information Security Analyst, Cryptographer, Data Engineer, Growth Hacker"""

    industryCategories_tags = """Software, IT Services, Computer Hardware, Cybersecurity, Cloud Computing, Artificial Intelligence, Robotics, Blockchain, Big Data, Telecommunications, Semiconductors, Consumer Electronics, Computer Networking, Data Management, Video Games, Ecommerce Platforms, SaaS, Analytics, IoT, Quantum Computing"""


    def generate_resume_dictionary(text, formatt=FORMAT):
        response = client.chat.completions.create(
            model="gpt-3.5-turbo-1106",
            messages=[
                {"role": "system",
                    "content": f"Generate a dictionary from the given resume text by the user in the following format:\n\n{formatt}\n\n Also make sure that the job elements belong to the following list:\n\n{job_tags}\n\n Also make sure that the industryCategories elements belong to the following list:\n\n{industryCategories_tags}\n\n Also make sure that the skills elements belong to the following list:\n\n{skill_tags}\n\n"},
                {"role": "user", "content": f"Generate a dictionary from the given resume text:\n\n{text}"}
            ]
        )
        return response.choices[0].message.content

    resume_dictionary = generate_resume_dictionary(resume_text)
    print(resume_dictionary)
    # Save resume_dict as a JSON file
    resume_dict = json.loads(resume_dictionary)
    json_path = os.path.abspath('./utils/resume_dictionary.json')
    with open(json_path, 'w') as json_file:
        json.dump(resume_dict, json_file)

    return resume_dict

# if __name__ == '__main__':
#     main(file_name)

