from flask import Blueprint, render_template, send_file, \
    request, jsonify, current_app
from flask_cors import CORS
from pymongo import MongoClient
from bson.json_util import dumps
from bson import ObjectId
import gridfs
import os
from io import BytesIO

import logging
logging.basicConfig(level=logging.DEBUG)

main = Blueprint('main', __name__)
CORS(main, supports_credentials=True)

@main.route('/')
def index():
    return render_template('index.html')

# Replace with your MongoDB URI
mongo_uri = os.getenv('MONGO_URI', "mongodb://localhost:27017/analyticsdb")
client = MongoClient(mongo_uri)
db = client['analyticsdb']
collection = db['my_collection']
fs = gridfs.GridFS(db)

@main.route('/api/clear-mongo/<password>', methods=['DELETE'])
def clear_db(password):
    if password == os.getenv('DELETE_MONGO_PASSWORD'):
        try: 
            for file in fs.find():
                fs.delete(file._id)
                current_app.logger.info(f'File {file.filename} is deleted')
            result = collection.delete_many({})
            current_app.logger.info(f'Deleted {result.deleted_count} document(s)')
            return jsonify({"message": "mongo successfully clearead!"}), 200
        except Exception as e:
            return jsonify({"error": str(e), "message": "An errror occured!"}), 500
    return jsonify({
        "message": "wrong password",
    }), 200


@main.route('/api/data', methods=['GET'])
def get_data():
    # Retrieve all documents from the collection
    documents = collection.find()
    return dumps(documents), 200

@main.route('/api/add', methods=['POST'])
def add_data():
    current_app.logger.info('Oke')
    current_app.logger.info(f'content type: {request.content_type}')
    try:
        data = request.get_json(force=True)  # Use get_json() to parse JSON data
        if not data:
            return jsonify({'error': 'No data provided'}), 400
        result = collection.insert_one(data)
        return jsonify({'message': 'Data added', 'id': str(result.inserted_id)}), 201
    except Exception as e:
        print(request)
        return jsonify({'error': str(e)}), 500

@main.route('/api/add-form')
def add_from_form():
    return render_template('form-template.html')

@main.route('/api/submit',  methods=['POST'])
def submit_form():
    # Get form data
    title = request.form.get('title')
    description = request.form.get('description')
    url = request.form.get('url')
    # Get the uploaded image file
    if 'image' not in request.files:
        return jsonify({'error': 'No image uploaded'}), 400

    image_file = request.files['image']
    # Store image in GridFS
    image_id = fs.put(image_file, filename=image_file.filename)

    # You can store additional information like name, description, and image ID
    result = collection.insert_one({
        'title': title,
        'description': description,
        'url': url,
        'image_id': image_id,
    })
    report_id = str(result.inserted_id)
    current_app.logger.info(report_id)

    return jsonify({
        'message': 'Form data and image received',
        'report_id': report_id,
        'title': title,
        'description': description,
        'url': url,
        'image_id': str(image_id)
    }), 200

# Route to retrieve and serve the image by its image_id
@main.route('/api/image/<image_id>')
def get_image(image_id):
    try:
        # Retrieve the image from GridFS using the image_id
        grid_out = fs.get(ObjectId(image_id))

        # Create a BytesIO object to send the file as a response
        image_stream = BytesIO(grid_out.read())
        # Send the image file as a response
        return send_file(image_stream, mimetype='image/jpeg', download_name=grid_out.filename)

    except gridfs.NoFile:
        return jsonify({'error': 'Image not found'}), 404