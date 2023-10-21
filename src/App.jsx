import React, { useState, useEffect } from 'react';
import './App.css';
import Edit from './Edit';
import { Checkbox, Input } from '@material-tailwind/react';
import { IonIcon } from '@ionic/react';

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
    });

    setTasks(updatedTasks);
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
      body: JSON.stringify({ description: updatedDescription }),
    })
      .then(() => {
        return fetch('http://localhost:5000/api/tasks');
      })
      .then((response) => response.json())
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
  };

  const saveTask = (taskId) => {
    const taskToEdit = tasks.find((task) => task._id === taskId);
    const updatedTasks = tasks.map((task) => {
      if (task._id === taskId) {
        return { ...task, editing: false };
      }
      return task;
    });
    setTasks(updatedTasks);
    updateTask(taskToEdit._id, taskToEdit.description);
  };

  const setUpdatedTaskDescription = (taskId, newDescription) => {
    const updatedTasks = tasks.map((task) => {
      if (task._id === taskId) {
        return { ...task, description: newDescription };
      }
      return task;
    });
    setTasks(updatedTasks);
  };

  const completeTask = (taskId) => {
    fetch(`http://localhost:5000/api/tasks/${taskId}`, {
      method: 'DELETE',
    })
      .then(() => {
        return fetch('http://localhost:5000/api/tasks');
      })
      .then((response) => response.json())
      .then((data) => setTasks(data));
  };


  return (
    <div className='min-h-screen flex flex-col justify-center items-center'>
      <h1 className='text-blue-500 text-2xl py-3'>Task Manager</h1>
      <div className='mb-2 flex flex-col items-center'>
        <Input
          variant='standard'
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          label="What's new?"
          className='mb-2 px-1 py-1 text-white'
        />
      </div>
      <button
        className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        onClick={addTask}
      >
        Add Task
      </button>
      <ul>
        {tasks.map((task) => (
          <li className='text-white' key={task._id}>
            <div className='space-x-5 mt-7 flex flex-row'>
              <Checkbox
                checked={completeTask}
                onChange={() => completeTask(task._id)}
              />
              {task.editing ? (
                <div className=''>
                  <Input
                    className='text-white'
                    variant='static'
                    color='blue'
                    label='Edit your task...'
                    value={task.description}
                    onChange={(e) => setUpdatedTaskDescription(task._id, e.target.value)}
                  />
                  <button
                    className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 mt-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 flex flex-row"
                    onClick={() => saveTask(task._id)}
                  >
                    Save
                  </button>
                </div>
              ) : (
                <div className='flex flex-row justify-center items-center'>
                  {task.description}
                  <button
                    className="flex text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 mx-4 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                    onClick={() => editTask(task._id)}
                  >
                    Edit
                  </button>
                  <button
                    className="flex text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                    onClick={() => deleteTask(task._id)}
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
