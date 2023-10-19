import React, {useState} from 'react'

function Edit({ task, onUpdate }) {
    const [editedTask, setEditedTask] = useState(task.description);

    const handleUpdate = () => {
        onUpdate(task._id, editedTask)
    };

  return (
    <div className='min-h-screen flex items-center justify-center'>
        <input
            type="text"
            value={editedTask}
            onChange={(e) => setEditedTask(e.target.value)}
        />
        <button onClick={handleUpdate}>Update</button>
    </div>
  );
}

export default Edit