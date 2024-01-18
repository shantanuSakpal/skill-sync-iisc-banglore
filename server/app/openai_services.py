from openai import OpenAI
from dotenv import load_dotenv
import os

load_dotenv()
client = OpenAI(api_key=os.getenv('OPEN_AI_SECRET_KEY'))

def generate_curriculum(extracted_text):


    # Define a prompt
    prompt = '''extract this json data-> [
        {
        
            "subject_name": "Time Series Analysis",
            "chapters" : [
                {
                    "chapter_name": "Intro to time Series",
                    "topics " : [
                        ""
                    ]
                }
            
            ]

        },
        {
            "subject_name" : "Machine Learning 2 ",
            "chapters" : [
                {
                    "chapter_name": "Introduction to Artificial Neural Learning:",
                    "topics " : [
                        "Activation functions",
                        "McCulloch Pitts Neuron"
                    ]
                },
                {
                    "chapter_name": "Supervised Learning Networks",
                    "topics " : [
                        "Activation functions",
                        "Multilayer Networks"
                    ]
                }
                
            ]

        }
    ]->  ( list of subject and further details  ) from this syllabus data -> give complete json and only return the json output no other description   '''

    response = client.chat.completions.create(
    model="gpt-3.5-turbo-0613",
    messages=[
            {"role": "system", "content": "You are a helpful assistant."},
            {"role": "user", "content": prompt + extracted_text},
        ],
    max_tokens=500
    )

    # Get the generated text from the response
    generated_json = response['choices'][0]['message']['content'].strip()

    return generated_json

