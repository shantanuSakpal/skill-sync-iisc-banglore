import os
from flask import Flask, request, jsonify
import requests
from urllib.parse import unquote, urlparse
from app import resume_parser, extract_text_from_pdf, generate_curriculum
from flask_cors import CORS

app = Flask(__name__)

CORS(app)

@app.route('/parse_resume', methods=['POST'])
def parse_resume():
  try : 
  # get the url from the body of the post request 
    url = request.json['url']
    # Download the file from the url
    r = requests.get(url, allow_redirects=True)
    parsed_url = urlparse(url)
    # Extract the path from the URL and unquote it
    unquoted_path = unquote(parsed_url.path)
    # Get the filename from the path
    filename = unquoted_path.split("/")[-1]
    # Save the file to the utils directory
    with open(os.path.join(os.path.abspath('./utils'), filename), 'wb') as f:
      f.write(r.content)
    
    # Call the resume_parser function
    dictionary_with_extracted_parameters = resume_parser(filename)
    # Delete the file from the utils directory
    os.remove(os.path.join(os.path.abspath('./utils'), filename))
    
    return jsonify({"result": dictionary_with_extracted_parameters})
  
  except Exception as e:
    return jsonify({"error": str(e)})

@app.route('/generate_curriculum', methods=['POST'])
def generate_curriculum_api():
    
  try:
    # Get PDF URL, start page, and end page from the request
    pdf_url = request.json['pdf_url']
    start_page_number = request.json['start_page']
    end_page_number = request.json['end_page']

    # Extract text from PDF
    extracted_text = extract_text_from_pdf(pdf_url, start_page=start_page_number, end_page=end_page_number)
    
    # Generate curriculum JSON
    generated_json = generate_curriculum(extracted_text)

    return jsonify({"result": generated_json})

  except Exception as e:
    return jsonify({"error": str(e)})

if __name__ == '__main__':
  app.run(debug=True, host='0.0.0.0', port=5000)