# import necessary modules
from flask import Flask, request, jsonify
from flask_cors import CORS
from pymongo import MongoClient
from bson.objectid import ObjectId

#create flask app
app = Flask(__name__)
#enable cross origin resource sharing so the react frontend and python backend can interact
CORS(app)

#initializes mongodb client and connects to the database using credentials
client = MongoClient("mongodb+srv://raze1_1:WJhc46L1kB67mcPt@clustrr.4cz8ivo.mongodb.net/?retryWrites=true&w=majority")
db = client['task_manager']
tasks_collection = db['tasks']

#defines a route for handling get and post requests
@app.route('/api/tasks', methods=['GET', 'POST'])
def tasks():
    if request.method == 'GET':
        tasks = list(tasks_collection.find({})) # retrieve all tasks from database
        for task in tasks:
            task['_id'] = str(task['_id']) #convert taskid to string
        return jsonify(tasks) #return all tasks as json
    
    if request.method == 'POST':
        data = request.get_json()
        description = data['description']
        task = {'description': description}
        result = tasks_collection.insert_one(task) #insert new task into the database
        task['_id'] = str(result.inserted_id) # convert objectid to string
        return jsonify(task) #return new task as json

@app.route('/api/tasks/<string:task_id>', methods=['PUT']) #define route for updating task by put request, allowing edits to happen to a specific taskid
def update_task(task_id):
    data = request.get_json()
    description = data['description']
    result = tasks_collection.update_one({'_id': ObjectId(task_id)}, {'$set': {'description': description}})

    if result.modified_count == 1:
        return jsonify({'message': 'Task updated successfully.'})
    else:
        return jsonify({'message': 'The task is either not found, or not updated.'}), 404
        
@app.route('/api/tasks/<string:task_id>', methods=['DELETE']) #define route for deleting a task by delete request being sent by user from react frontend
def delete_task(task_id):
    result = tasks_collection.delete_one({'_id': ObjectId(task_id)})
    if result.deleted_count == 1:
        return jsonify({'message': 'Task deleted successfully.'})
    else:
        return jsonify({'message': 'The task is either not found, or not deleted.'})

if __name__ == '__main__': # run app by passing file, api is accessible at http://localhost:5000/api/tasks
    app.run(debug=True)
