import google.generativeai as genai
from dotenv import load_dotenv
import os
import json

# Load environment variables from .env


def gemenai_output(transcript: str, emotions: str, userdata: str, question: str) -> str:
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
        {"category": "HARM_CATEGORY_HARASSMENT", "threshold": "BLOCK_MEDIUM_AND_ABOVE"},
        {
            "category": "HARM_CATEGORY_HATE_SPEECH",
            "threshold": "BLOCK_MEDIUM_AND_ABOVE",
        },
        {
            "category": "HARM_CATEGORY_SEXUALLY_EXPLICIT",
            "threshold": "BLOCK_MEDIUM_AND_ABOVE",
        },
        {
            "category": "HARM_CATEGORY_DANGEROUS_CONTENT",
            "threshold": "BLOCK_MEDIUM_AND_ABOVE",
        },
    ]

    model = genai.GenerativeModel(
        model_name="gemini-pro",
        generation_config=generation_config,
        safety_settings=safety_settings,
    )

    prompt_parts = [
        transcript,
        userdata,
        question,
        emotions,
        '''Analyze the user's answer and profile. Provide feedback on the content of the answer, highlighting areas where the user excelled and pointing out aspects that could be improved. Suggest additional information or details that the user could have included in their response based on their profile.
Additionally, assess the user's confidence level during the answer. Comment on whether the user appeared confident, underconfident, unsure, or any other relevant observations. Offer specific suggestions on how the user can enhance their confidence and communication skills.Also consider users emotions when he answered the question.
Output: Give entire response in first person (you)
Generate a well-structured response that includes constructive feedback on the user's answer, suggestions for improvement, and insights into their confidence level. Aim to guide the user in presenting more effective and compelling responses in future interviews.Also give appropriate coorect answer for the the question asked."''',
    ]

    response = model.generate_content(prompt_parts)
    print(response.text)

    return response.text
