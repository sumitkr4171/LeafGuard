import os
from flask import Flask, request, render_template, flash, url_for
from werkzeug.utils import secure_filename
import random

app = Flask(__name__)
app.secret_key = 'your-secret-key-here'  # Required for flashing messages

# Configure upload folder
UPLOAD_FOLDER = os.path.join('static', 'uploads')
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg'}
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024  # 16MB max file size

# Create necessary directories
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

# Disease categories and their solutions
disease_info = {
    'leaf_blight': {
        'name': 'Leaf Blight',
        'solution': 'Remove infected leaves and apply fungicide. Improve air circulation around plants.'
    },
    'leaf_spot': {
        'name': 'Leaf Spot',
        'solution': 'Remove affected leaves and avoid overhead watering. Apply copper-based fungicide.'
    },
    'healthy': {
        'name': 'Healthy Leaf',
        'solution': 'Your plant looks healthy! Continue regular care and monitoring.'
    }
}

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

def analyze_image(image_path):
    """
    Simplified analysis - for demonstration purposes only
    In a real application, this would use a trained ML model
    """
    # For demo purposes, return a random result
    return random.choice(list(disease_info.keys()))

@app.route('/', methods=['GET', 'POST'])
def upload_file():
    if request.method == 'POST':
        # Check if the post request has the file part
        if 'file' not in request.files:
            flash('No file selected')
            return render_template('index.html')
        
        file = request.files['file']
        
        # If user does not select file, browser also
        # submit an empty part without filename
        if file.filename == '':
            flash('No file selected')
            return render_template('index.html')
        
        if file and allowed_file(file.filename):
            try:
                filename = secure_filename(file.filename)
                filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
                file.save(filepath)
                
                # Get prediction
                prediction = analyze_image(filepath)
                disease = disease_info[prediction]
                
                return render_template('index.html', 
                                     filename=filename,
                                     disease_name=disease['name'],
                                     solution=disease['solution'])
            except Exception as e:
                flash(f'Error processing file: {str(e)}')
                return render_template('index.html')
        else:
            flash('Invalid file type. Please upload a PNG, JPG, or JPEG file.')
            return render_template('index.html')
    
    return render_template('index.html')

@app.errorhandler(413)
def request_entity_too_large(error):
    flash('File too large. Maximum file size is 16MB.')
    return render_template('index.html'), 413

if __name__ == '__main__':
    app.run(debug=True) 