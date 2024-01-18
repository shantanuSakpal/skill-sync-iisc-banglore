import os
from flask import Flask, request
import requests
from urllib.parse import unquote, urlparse
from app import resume_parser
from flask_cors import CORS

app = Flask(__name__)

CORS(app)

@app.route('/parse_resume', methods=['POST'])
def parse_resume():
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
  
  return dictionary_with_extracted_parameters


if __name__ == '__main__':
  app.run(debug=True, host='0.0.0.0', port=5000)