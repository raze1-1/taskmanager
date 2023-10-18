from flask import Flask, request, jsonify
from flask_cors import CORS
from pymongo import MongoClient
from bson.objectid import ObjectId

app = Flask(__name__)
CORS(app)

client = MongoClient("mongodb+srv://raze1_1:WJhc46L1kB67mcPt@clustrr.4cz8ivo.mongodb.net/?retryWrites=true&w=majority")
db = client['task_manager']
tasks_collection = db['tasks']

@app.route('/api/tasks', methods=['GET', 'POST'])
def tasks():
    if request.method == 'GET':
        tasks = list(tasks_collection.find({}))
        for task in tasks:
            task['_id'] = str(task['_id'])
        return jsonify(tasks)
    
    if request.method == 'POST':
        data = request.get_json()
        description = data['description']
        task = {'description': description}
        result = tasks_collection.insert_one(task)
        task['_id'] = str(result.inserted_id)
        return jsonify(task)

@app.route('/api/tasks/<string:task_id>', methods=['PUT'])
def update_task(task_id):
    data = request.get_json()
    description = data['description']
    result = tasks_collection.update_one({'_id': ObjectId(task_id)}, {'$set': {'description': description}})

    if result.modified_count == 1:
        return jsonify({'message': 'Task updated successfully.'})
    else:
        return jsonify({'message': 'The task is either not found, or not updated.'}), 404
        
@app.route('/api/tasks/<string:task_id>', methods=['DELETE'])
def delete_task(task_id):
    result = tasks_collection.delete_one({'_id': ObjectId(task_id)})
    if result.deleted_count == 1:
        return jsonify({'message': 'Task deleted successfully.'})
    else:
        return jsonify({'message': 'The task is either not found, or not deleted.'})

if __name__ == '__main__':
    app.run(debug=True)
