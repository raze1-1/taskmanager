import { useState, useEffect } from 'react';
import './App.css';
import Edit from './Edit';

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');

  useEffect(() => {
    fetch('http://localhost:5000/api/tasks')
      .then((response) => response.json())
      .then((data) => setTasks(data));
  }, []);

  const editTask = (taskId) => {
    const updatedTasks = tasks.map((task) => {
      if (task._id === taskId) {
        return { ...task, editing: true };
      }
      return task;
    })

    setTasks(updatedTasks)
  };

  const addTask = () => {
    if (newTask) {
      const taskData = {
        description: newTask,
        editing: false,
      };

    fetch('http://localhost:5000/api/tasks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ description: newTask }),
    })
      .then(() => {
        return fetch('http://localhost:5000/api/tasks'); 
      })
      .then((response) => response.json())
      .then((data) => setTasks(data));
      
    setNewTask('');
    }
  };

  const updateTask = (taskId, updatedDescription) => {
    fetch(`http://localhost:5000/api/tasks/${taskId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ description: updatedDescription })
    })
    .then(() => {
      return fetch('http://localhost:5000/api/tasks');
    })
    .then((response => response.json()))
    .then((data) => setTasks(data));
  };
  
  const deleteTask = (taskId) => {
    fetch(`http://localhost:5000/api/tasks/${taskId}`, {
      method: 'DELETE',
    })
      .then(() => {
        return fetch('http://localhost:5000/api/tasks');
      })
      .then((response) => response.json())
      .then((data) => setTasks(data));
  }

  const saveTask = (taskId) => {
    const taskToEdit = tasks.find((task) => task._id === taskId);
    const updatedTasks = tasks.map((task) => {
      if (task._id === taskId) {
        return { ...task, editing:false }
      }
      return task;
    })
    setTasks(updatedTasks);
    updateTask(taskToEdit._id, taskToEdit.description);
  }

  const setUpdatedTaskDescription = (taskId, newDescription) => {
    const updatedTasks = tasks.map((task) => {
      if (task._id === taskId) {
        return { ...task, description: newDescription};
      }
      return task;
    })
    setTasks(updatedTasks);
  }

  return (
    <div className='App'>
      <h1>Task Manager</h1>
      <input 
        type="text"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        placeholder="What's new?"
      />
      <button onClick={addTask}>Add Task</button>
      <ul>
        {tasks.map((task) => (
          <li key={task._id}>
            {task.editing ? (
              <div>
                <input 
                  type="text"
                  value={task.description}
                  onChange={(e) => setUpdatedTaskDescription(task._id, e.target.value)}
                />
                <button onClick={() => saveTask(task._id)}>Save</button>
              </div>
            ) : (
              <div>
                {task.description}
                <button onClick={() => editTask(task._id)}>Edit</button>
              </div>
            )}
            <button onClick={() => deleteTask(task._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App
