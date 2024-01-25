import requests
import os
import json
from dotenv import load_dotenv




def gpt_output(prompt: str) -> str:
        
    load_dotenv()

    # Access the environment variable
    OPENAI_KEY = os.getenv("OPEN_AI_SECRET_KEY")

    api_key = OPENAI_KEY
    url = "https://api.openai.com/v1/chat/completions"

    headers = {
        "Content-Type": "application/json",
        "Authorization": f"Bearer {api_key}"
    }

    data = {
        "model": "gpt-3.5-turbo-0613",
        "messages": [
            # {"role": "system", "content": "You are a helpful assistant."},
            {"role": "user", "content": prompt},
        ]
    }

    response = requests.post(url, headers=headers, json=data)


    if response.status_code == 200:
        print("API call successful!")

        # Extracting the assistant's response
        assistant_response = response.json()['choices'][0]['message']['content']
        
        return assistant_response
    else:
        return f"API call failed with status code {response.status_code}: {response.text}"



def generate_roadmap(skills , curriculum, aspiration, time_period):
    with open("utils/empty_roadmap.json", "r") as json_file:
            roadmap = json.load(json_file)
    prompt = f" this is the skills of the user  -> {skills}, -> and he is studing these subject in his Academic curriculum -> {curriculum}, generate the roadmap to become -> {aspiration} in {time_period} days -> in this roadmap json format -> {roadmap} -> return only the json data and add task and subtask properly with 2 3 lines of description, Add description explaining the subtask to be done in the task and add 2 3 subtask in each task and their description -> give in details output json (make sure to return only the json becoz i am using gpt api and json.loads to your output)and please don't explain the roadmap i need only the json as string  "
    output = gpt_output(prompt )
    print(output)
    
    generated_roadmap = json.loads(output)


    return generated_roadmap



def generate_curriculum(extracted_text):


    # Define a prompt
    prompt = '''extract this json data-> [
        {
        
            "subject_name": "",
            "chapters" : [
                {
                    "chapter_name": "",
                    "topics " : [
                        ""
                    ]
                }
            
            ]

        },
        {
            "subject_name" : " ",
            "chapters" : [
                {
                    "chapter_name": "",
                    "topics " : [
                        "",
                        ""
                    ]
                },
               
                
            ]

        }
    ]->  ( list of subject and further details  ) from this syllabus data -> give complete json and only return the json output no other description -> extract the details from this syllabus data into above given json format (return only the json output)   -> ''' + extracted_text

    output = gpt_output(prompt )
  
    
    resume_dict = json.loads(output)

    # Save resume_dict as a JSON file
    # json_path = os.path.abspath('./utils/resume_dictionary.json')
    # with open(json_path, 'w') as json_file:
    #     json.dump(resume_dict, json_file)

    return resume_dict



