from flask import Flask, request, jsonify
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
        if not os.path.exists("utils/curriculum.json"):
            raise FileNotFoundError("curriculum.json not found. Generate the curriculum first.")

        # Read content from curriculum.json
        with open("utils/curriculum.json", "r") as json_file:
            curriculum_content = json.load(json_file)

        # Return the content of curriculum.json
        return jsonify({"result": curriculum_content})

    except Exception as e:
        return jsonify({"error": str(e)})
    

@app.route('/generate_roadmap', methods=['POST'])
def generate_roadmap_api():
    try:
        # Check if the curriculum.json file exists
        if not os.path.exists("utils/roadmap.json"):
            raise FileNotFoundError("curriculum.json not found. Generate the curriculum first.")

        # Read content from curriculum.json
        with open("utils/roadmap.json", "r") as json_file:
            curriculum_content = json.load(json_file)

        # Return the content of curriculum.json
        return jsonify({"result": curriculum_content})

    except Exception as e:
        return jsonify({"error": str(e)})

if __name__ == '__main__':
    app.run(debug=True)
