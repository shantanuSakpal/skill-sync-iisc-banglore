"use client";
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
// import projectsData from "../../../../data/projects.json";
import CodeEditor from "../../../../components/projects/CodeEditor"
import DragAndDropFileInput from "../../../../components/projects/DragAndDropFileInput"

function MyComponent() {
  const pathname = usePathname();
  const currentRoute = pathname.split('/').pop();
  const [currentProject, setCurrentProject] = useState(null);
  const [projectsData, setProjectsData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('/api/getProjects');
      const data = await response.json();
      setProjectsData(data);
    };

    fetchData();
  }, []);

  useEffect(() => {
    // Fetch the project based on the currentRoute (project ID)
    const project = projectsData.projects.find(project => project.id === currentRoute);

    // Update state with the fetched project
    setCurrentProject(project);
  }, [currentRoute]);

  return (
    <div className="flex bg-gray-200">

      <div className="left w-[900px] p-4 m-4 bg-white rounded-lg">
        {currentProject ? (
          <div>
            <h2 className="text-3xl font-bold">{currentProject.title}</h2>
            <h2 className="text-xl font-semibold p-1">Overview</h2>
            <h2 className="p-1 ">{currentProject.overview}</h2>
            <h2 className="text-xl font-semibold p-1">Objective</h2>
            <h2 className="p-1 ">{currentProject.objective}</h2>


            <CodeEditor currentProject={currentProject} />

            {/* code editor with 4 language support ( java , javascript, python , english)  */}
            {/* <p>{currentProject.description}</p> */}
            {/* Display other project details as needed */}
          </div>
        ) : (
          <p>Project not found</p>
        )}
      </div>

      {/* Right side (rest of the width) */}
      <div className="right flex-1 p-4 bg-white rounded-lg my-4 h-full">
        {currentProject ? (





            <div className='py-4 px-1 h-full flex flex-col justify-between'>
              <div>
                <h2 className='text-lg font-bold '>Duration: </h2>
                <h2>{currentProject.time_required} Hours</h2>
                <h2 className='text-lg pt-4 font-bold '>Difficulty: </h2>
                <h2>{currentProject.difficulty}</h2>

               
                {/* Display other project details as needed */}



              </div>

                {/* drag file here  */}
              <div className='mt-20'>
                <DragAndDropFileInput/>
              </div>

              <div className='mt-20'>
                <div className='flex'>
                  <div className='bg-gradient-to-r flex-grow h-fit my-auto from-purple-500 via-purple-600 to-blue-500 text-white px-4 py-2 rounded-md mr-2 text-center'>
                    Submit
                  </div>
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
