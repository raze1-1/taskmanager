# import necessary modules
from flask import Flask, request, jsonify
from flask_cors import CORS
from pymongo import MongoClient

#create flask app
app = Flask(__name__)
#enable cross origin resource sharing so the react frontend and python backend can interact
CORS(app)

#initializes mongodb client and connects to the database using credentials
client = MongoClient("mongodb+srv://raze1_1:WJhc46L1kB67mcPt@clustrr.4cz8ivo.mongodb.net/?retryWrites=true&w=majority")
db = client['2dousers']
users_collection = db['users']

@app.route('/api/users', methods=['POST'])
def register_user():
    data = request.get_json()
    if 'username' not in data:
        jsonify({'message': 'Username not in data'})
    elif 'emailaddress' not in data:
        jsonify({'message': 'Email not in data '})
    elif 'password' not in data:
        jsonify({'message': 'Password not in data '})
    
    username = data['username']

    if users_collection.find_one({'username': username}):
        return jsonify({'message': 'Username already taken'})
    
    emailaddress = data['emailaddress']
    password = data['password']
    
    new_user = {
        'username': username,
        'emailaddress': emailaddress,
        'password': password,
    }
    users_collection.insert_one(new_user)
    
    return jsonify({'message': 'User registered successfully.'})

@app.route('/api/users', methods=['GET'])
def get_users():
    credentials = list(users_collection.find({}))
    for users in credentials:
        users['_id'] = str(users['_id'])
    return jsonify(credentials)

if __name__ == '__main__':
    app.run(debug=True)
