from flask import Flask, request, jsonify
from service.pdf_services import extract_text_from_pdf
from service.openai_services import generate_curriculum
import json
import os

app = Flask(__name__)

@app.route('/', methods=['GET'])
def home():
    return "running"

@app.route('/generate_curriculum', methods=['POST'])
def generate_curriculum_api():
    try:
        # Check if the curriculum.json file exists
        if not os.path.exists("data/curriculum.json"):
            raise FileNotFoundError("curriculum.json not found. Generate the curriculum first.")

        # Read content from curriculum.json
        with open("data/curriculum.json", "r") as json_file:
            curriculum_content = json.load(json_file)

        # Return the content of curriculum.json
        return jsonify({"result": curriculum_content})

    except Exception as e:
        return jsonify({"error": str(e)})
    

@app.route('/generate_roadmap', methods=['POST'])
def generate_roadmap_api():
    try:
        # Check if the curriculum.json file exists
        if not os.path.exists("data/roadmap.json"):
            raise FileNotFoundError("curriculum.json not found. Generate the curriculum first.")

        # Read content from curriculum.json
        with open("data/roadmap.json", "r") as json_file:
            curriculum_content = json.load(json_file)

        # Return the content of curriculum.json
        return jsonify({"result": curriculum_content})

    except Exception as e:
        return jsonify({"error": str(e)})

if __name__ == '__main__':
    app.run(debug=True)
