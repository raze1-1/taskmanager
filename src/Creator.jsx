    // import modules from react, checkbox and input from material-tailwind for styling
import React, { useState, useEffect } from 'react';
import './App.css';
import { Checkbox, Input } from '@material-tailwind/react';
    // define the main App function
function Creator() {
  // basic state management using hooks
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  // utilising useEffect to fetch tasks from API when component is "mounted" (loaded into DOM)
  useEffect(() => {
    fetch('http://localhost:5000/api/tasks')
      .then((response) => response.json())
      .then((data) => setTasks(data));
  }, []);


  //function to manage tasks
  const editTask = (taskId) => {
    // edit task by setting it's edit flag to true
    const updatedTasks = tasks.map((task) => {
      if (task._id === taskId) {
        return { ...task, editing: true };
      }
      return task;
    });
    // set old tasks list to the new updated tasks list
    setTasks(updatedTasks);
  };


  const addTask = () => {
    // add a new task by making a POST request to the api
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
 
  // function to allow for tasks to be updated, specifies which taskID should be updated
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


  // function to allow for tasks to be deleted, specifies which taskID should be deleted
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
  // function to allow edited task to be saved
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
  // changes the old task to change to the new, user edited task
  const setUpdatedTaskDescription = (taskId, newDescription) => {
    const updatedTasks = tasks.map((task) => {
      if (task._id === taskId) {
        return { ...task, description: newDescription };
      }
      return task;
    });
    setTasks(updatedTasks);
  };
  // function that deletes a specific taskID from the api, used for the checkbox to mark tasks as complete
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
      <h1 className='text-white text-2xl py-3'>Task Manager</h1>
      <div className='mb-2 flex flex-col items-center'>
        <Input
          variant='standard'
          color='gray'
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)} // useState
          label="What's new?"
          className='mb-2 px-1 py-1 text-white'
        />
      </div>
      <button
        className="transition-colors duration-550 ease-linear hover:bg-green-500 text-black bg-white font-medium rounded-lg text-sm px-5 py-2 mb-2"
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
                onChange={() => completeTask(task._id)} // deletes the task from api
              />
              {task.editing ? (
                <div className=''>
                  <Input
                    className='text-white'
                    variant='static'
                    color='gray'
                    label='Edit your task...'
                    value={task.description} // allows user to set new name for task
                    onChange={(e) => setUpdatedTaskDescription(task._id, e.target.value)} // uses setUpdatedTaskDescription function while passing the taskID and inputted value as arguments
                  />
                  <button
                    className="transition-colors duration-550 ease-linear hover:bg-green-500 text-black bg-white font-medium rounded-lg text-sm px-5 py-2 mb-2 mt-2 flex flex-row"
                    onClick={() => saveTask(task._id)} // saves task under a new name, passing the taskID into the savetask function
                  >
                    Save
                  </button>
                </div>
              ) : (
                <div className='flex flex-row justify-center items-center'>
                  {task.description}
                  <button
                    className="transition-colors duration-550 ease-linear text-black bg-white hover:bg-yellow-800 rounded-lg text-sm px-5 py-2.5 mx-4 mr-2 mb-2 flex"
                    onClick={() => editTask(task._id)} // allows user to click to edit task, passing the task that is being edited's id into the editTask function
                  >
                    Edit
                  </button>
                  <button
                    className="transition-colors duration-550 ease-linear text-black bg-white hover:bg-red-800 rounded-lg text-sm px-5 py-2.5 mx-1 mr-2 mb-2 flex"
                    onClick={() => deleteTask(task._id)}// allows user to click to delete task, passing the task that is to be deleted's id into the deleteTask function
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
    // closing all div's and lists
  );
}


// exporting Creator component so it can be reused if needed
export default Creator;