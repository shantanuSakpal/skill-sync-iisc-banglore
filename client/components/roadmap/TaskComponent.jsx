import React, { useState } from 'react';

const TaskComponent = ({ taskData }) => {
  const [selectedSubtask, setSelectedSubtask] = useState(null);

  const handleSubtaskClick = (subtask) => {
    // Toggle the 'done' status of the subtask
    subtask.done = !subtask.done;
    setSelectedSubtask(subtask);
  };

  const handleTextClick = (subtask) => {
    // Update the right side when the text is clicked
    setSelectedSubtask(subtask);
  };

  return (
    <div style={{ display: 'flex' }}>
      {/* Left Side */}
      <div style={{ width: '50%', padding: '20px' }}>
        <div className='flex justify-center'>
          <h1>
            <strong>{taskData.name}</strong>
          </h1>
        </div>
        <ul>
          {taskData.subtasks.map((subtask) => (
            <li key={subtask.name}>
              <label className='flex'>
                <input
                  className='m-4'
                  type="checkbox"
                  onChange={() => handleSubtaskClick(subtask)}
                  checked={subtask.done}
                />
                <div className='m-4' onClick={() => handleTextClick(subtask)}>
                  {subtask.name}
                </div>
              </label>
            </li>
          ))}
        </ul>
      </div>

      {/* Right Side */}
      <div style={{ width: '50%', padding: '20px' }}>
        {selectedSubtask && (
          <div>
            <h3>{selectedSubtask.name}</h3>
            <p>Description: {selectedSubtask.description}</p>
            <p>Materials: {selectedSubtask.materials}</p>
            <p>Projects: {selectedSubtask.projects}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskComponent;
