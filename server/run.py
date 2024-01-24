import os
from flask import Flask, request, jsonify
import requests
from urllib.parse import unquote, urlparse
from app import (
    resume_parser,
    extract_text_from_pdf,
    generate_curriculum,
    generate_roadmap,
    analyze_emotions,
    process_video,
    gemenai_output,
)
from flask_cors import CORS
import json
from flask import Flask, request, jsonify
from gemenai_output import gemenai_output

app = Flask(__name__)

CORS(app)


@app.route("/parse_resume", methods=["POST"])
def parse_resume():
    # get the url from the body of the post request
    url = request.json["url"]
    # Download the file from the url
    r = requests.get(url, allow_redirects=True)
    parsed_url = urlparse(url)
    # Extract the path from the URL and unquote it
    unquoted_path = unquote(parsed_url.path)
    # Get the filename from the path
    filename = unquoted_path.split("/")[-1]
    # Save the file to the utils directory
    with open(os.path.join(os.path.abspath("./utils"), filename), "wb") as f:
        f.write(r.content)

    # Call the resume_parser function
    dictionary_with_extracted_parameters = resume_parser(filename)

    # # Delete the file from the utils directory
    os.remove(os.path.join(os.path.abspath("./utils"), filename))

    # return extracted_parameters_json
    return json.dumps(dictionary_with_extracted_parameters, indent=4)


@app.route("/generate_curriculum", methods=["POST"])
def generate_curriculum_api():
    try:
        # Get PDF URL, start page, and end page from the request
        pdf_url = request.json["pdf_url"]
        start_page_number = request.json["start_page"]
        end_page_number = request.json["end_page"]

        # Extract text from PDF
        extracted_text = extract_text_from_pdf(
            pdf_url, start_page=start_page_number, end_page=end_page_number
        )

        print("text extracted...")

        # Generate curriculum JSON
        generated_json = generate_curriculum(extracted_text)

        return jsonify({"result": generated_json})

    except Exception as e:
        return jsonify({"error": str(e)})


@app.route("/generate_roadmap", methods=["POST"])
def generate_roadmap_api():
    try:
        # Get PDF URL, start page, and end page from the request
        skills = request.json["skills"]
        curriculum = request.json["curriculum"]
        aspiration = request.json["aspiration"]
        time_period = request.json["time_period"]

        # Generate curriculum JSON
        generated_json = generate_roadmap(
            skills=skills,
            curriculum=curriculum,
            aspiration=aspiration,
            time_period=time_period,
        )

        return jsonify({"result": generated_json})

    except Exception as e:
        return jsonify({"error": str(e)})


@app.route("/analyze_emotions", methods=["POST"])
def analyze_emotions_api():
    try:
        video_path = request.json["video_path"]
        skip_frames = request.json.get("skip_frames", 5)
        resize_width = request.json.get("resize_width", None)
        resize_height = request.json.get("resize_height", None)

        emotions = process_video(video_path, skip_frames, resize_width, resize_height)
        return jsonify({"emotions": emotions})

    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route("/generate_text", methods=["POST"])
def generate_text_api():
    try:
        transcript = request.json["transcript"]
        emotions = request.json["emotions"]
        userdata = request.json["userdata"]
        question = request.json["question"]

        generated_text = gemenai_output(transcript, emotions, userdata, question)
        return jsonify({"generated_text": generated_text})

    except Exception as e:
        return jsonify({"error": str(e)}), 500


if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=5000)
