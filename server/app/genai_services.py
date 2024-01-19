import google.generativeai as genai
from dotenv import load_dotenv
import os

# Load environment variables from .env


def gemenai_output(prompt : str) -> str: 
    load_dotenv()

# Access the environment variable
    GENAI_KEY = os.getenv("GENAI_SECRET_KEY")

    genai.configure(api_key=GENAI_KEY)
    # Set up the model
    generation_config = {
    "temperature": 0.8,
    "top_p": 1,
    "top_k": 1,
    "max_output_tokens": 2048,
    }

    safety_settings = [
    {
        "category": "HARM_CATEGORY_HARASSMENT",

        "threshold": "BLOCK_MEDIUM_AND_ABOVE"
    },
    {
        "category": "HARM_CATEGORY_HATE_SPEECH",
        "threshold": "BLOCK_MEDIUM_AND_ABOVE"
    },
    {
        "category": "HARM_CATEGORY_SEXUALLY_EXPLICIT",
        "threshold": "BLOCK_MEDIUM_AND_ABOVE"
    },
    {
        "category": "HARM_CATEGORY_DANGEROUS_CONTENT",
        "threshold": "BLOCK_MEDIUM_AND_ABOVE"
    },
    ]

    model = genai.GenerativeModel(model_name="gemini-pro",
                                generation_config=generation_config,
                                safety_settings=safety_settings)

    prompt_parts = [prompt]

    response = model.generate_content(prompt_parts)
    print(response.text)


    return response.text





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
    ]->  ( list of subject and further details  ) from this syllabus data -> give complete json and only return the json output no other description -> syllabus data   ''' + extracted_text

    output = gemenai_output(prompt )

    return output



