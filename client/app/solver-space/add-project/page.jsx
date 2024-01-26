"use client";
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import CodeEditor from "../../../components/projects/CodeEditor";
import DragAndDropFileInput from "../../../components/projects/DragAndDropFileInput";
// import { getFirestore, collection, addDoc } from 'firebase/firestore';
// import  db from "../../../config/firebase-config";

import projectData from "../../../data/projects.json"


const difficultyOptions = ["Beginner", "Intermediate", "Advanced"];

function MyComponent() {
  const [formData, setFormData] = useState({
    
    title: 'Set Project Title',
    description: '',
    difficulty: '',
    tags: [],
    overview: '',
    objective: '',
    boilerplate: '',
    iscode: false,
    time_required: 0,
    solutions: [],
    language: '',
  });

  const [isTitleEditable, setIsTitleEditable] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleTitleClick = () => {
    setIsTitleEditable(true);
  };

  const handleTitleBlur = () => {
    setIsTitleEditable(false);
  };

  const handleSubmit = async () => {
   
  };

  return (
    <div className="flex bg-gray-200">

      <div className="left w-[900px] p-6 m-4 bg-white rounded-lg">
        {true ? (
          <div>
            <h2
              className={`text-3xl font-bold mb-4 ${isTitleEditable ? 'cursor-text' : 'cursor-pointer'}`}
              onClick={handleTitleClick}
              onBlur={handleTitleBlur}
              contentEditable={isTitleEditable}
            >
              {formData.title}
            </h2>
            <h2 className="text-xl font-semibold mb-2">Set Overview</h2>
            <textarea
              name="overview"
              value={formData.overview}
              onChange={handleInputChange}
              className="p-2 border rounded-md w-full"
            ></textarea>
            <h2 className="text-xl font-semibold mb-2">Set Objective</h2>
            <textarea
              name="objective"
              value={formData.objective}
              onChange={handleInputChange}
              className="p-2 border rounded-md w-full"
            ></textarea>

            <CodeEditor currentProject={formData} />

            {/* Display other project details as needed */}
          </div>
        ) : (
          <p>Project not found</p>
        )}
      </div>

      <div className="right flex-1 p-6 bg-white rounded-lg my-4 h-full">
        {true ? (
          <div className='py-4 px-1 h-full flex flex-col justify-between'>
            <div>
              <h2 className='text-lg font-bold mb-2'>Set Duration</h2>
              <textarea
                name="time_required"
                value={formData.time_required}
                onChange={handleInputChange}
                className="p-2 border rounded-md w-full"
              ></textarea>
              <h2 className='text-lg font-bold mb-2'>Set Difficulty</h2>
              <select
                name="difficulty"
                value={formData.difficulty}
                onChange={handleInputChange}
                className="p-2 border rounded-md w-full"
              >
                <option value="">Select Difficulty</option>
                {difficultyOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>

              {/* Display other project details as needed */}
            </div>

            <div className='mt-4'>
              <DragAndDropFileInput />
            </div>

            <div className='mt-4'>
              <div className='flex'>
                <button className='bg-gradient-to-r flex-grow h-fit my-auto from-purple-500 via-purple-600 to-blue-500 text-white px-4 py-2 rounded-md mr-2 text-center' onClick={handleSubmit}>
                  Submit
                </button>
                <div className='flex-grow h-fit my-auto text-center'>
                  <div className='bg-gradient-to-r from-purple-500 via-purple-600 to-blue-500 text-white px-4 py-2 rounded-md'>
                    View Solutions
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <p>Project not found</p>
        )}
      </div>
    </div>
  );
}

export default MyComponent;
