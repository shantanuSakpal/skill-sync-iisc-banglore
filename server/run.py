from flask import Flask, request, jsonify
from app import extract_text_from_pdf, generate_curriculum

app = Flask(__name__)

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
    app.run(debug=True)
