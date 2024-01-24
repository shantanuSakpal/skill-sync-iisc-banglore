"use client";
import { useState, useEffect } from "react";
import projectsData from "../../data/projects.json";
import tags from "../../data/tags.json";
import Link from 'next/link';

export default function SolverSpace() {
  // Assuming you have some state for filters

  const [filters, setFilters] = useState({
    difficulty: "",
    tags: [],
    search: "crud", // New search filter
  });

  const updateFilters = (newFilters) => {
    setFilters((prevFilters) => ({ ...prevFilters, ...newFilters }));
  };

  const filteredProjects = projectsData.projects.filter((project) => {
    const titleMatch = project.title.toLowerCase().includes(filters.search.toLowerCase());
    const descriptionMatch = project.description.toLowerCase().includes(filters.search.toLowerCase());

    return (
      (filters.difficulty === "" || project.difficulty === filters.difficulty) &&
      (filters.tags.length === 0 || project.tags.some((tag) => filters.tags.includes(tag))) &&
      (filters.search === "" || titleMatch || descriptionMatch)
    );
  });

  // use client
  useEffect(() => {
    // Your useEffect logic here
  }, []);

  return (
    <div className="bg-gray-100">
      <div className="flex justify-center ">
        <h1 style={{ fontSize: '2em', lineHeight: '1', marginTop: '20px', fontWeight: "bold" }}>
          Welcome to Solver Space
        </h1>
      </div>
      <h3 className="flex justify-center m-2">Learn by applying your knowledge on real-world scenarios</h3>

      <div className="flex">
        {/* left side for filters of projects */}
        <div className="left p-4 border-solid border-r border-grey-500 divide-y divide-dashed">
          {/* Example filter controls */}
          <div  >
            <div className="m-1"><label >Difficulty:</label></div>
            <select
              value={filters.difficulty}
              style={{ width: '100%' }}
              onChange={(e) => updateFilters({ difficulty: e.target.value })}
            >
              <option value="">All</option>
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Intermediate</option>
              {/* Add more options as needed */}
            </select>
          </div>
          <div className="m-1">
            <label>Tags:</label>
            <div className="flex flex-col space-y-2 mt-2 max-h-[250px] overflow-y-auto">
              {tags.tags.map((tag) => (
                <div key={tag} className="flex items-center">
                  <input
                    type="checkbox"
                    id={tag}
                    value={tag}
                    checked={filters.tags.includes(tag)}
                    onChange={(e) => {
                      const isChecked = e.target.checked;
                      updateFilters({
                        tags: isChecked
                          ? [...filters.tags, tag]
                          : filters.tags.filter((selectedTag) => selectedTag !== tag),
                      });
                    }}
                    className="mr-2"
                  />
                  <label htmlFor={tag}>{tag}</label>
                </div>
              ))}
            </div>

          </div>
          {/* Add more filter controls as needed */}
        </div>

        {/* right side for projects list */}
        <div className="right p-4 bg-gray-100">
          {/* add search field  */}
          <div className="mt-4 m-2  ">

            <div className="mt-1 relative rounded-md shadow-sm">
              <input
                type="text"
                className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-3 pr-10 py-2 border-gray-300 rounded-md"
                placeholder="Enter search term"
                value={filters.search}
                onChange={(e) => updateFilters({ search: e.target.value })}
              />
              <div className="absolute  inset-y-0 right-0 flex items-center">
                <button
                  type="button"
                  className="bg-indigo-500 text-white px-4 py-2 rounded-md"
                  onClick={() => updateFilters({ search: '' })}
                >
                  Clear
                </button>
              </div>

            </div>

          </div>

          {/* Display project cards */}
          {filteredProjects.map((project) => (
            <div key={project.id} className="project-card bg-white rounded-lg p-6 shadow-md mb-4">
              <h2 className="text-xl font-bold mb-2">{project.title}</h2>
              <p className="text-gray-700">{project.description}</p>
              <p className={`text-${project.difficulty.toLowerCase() === 'beginner' ? 'green' : 'red'}-700  font-bold`}>
                {project.difficulty}
              </p>



              <div className="flex justify-between">
                {/* Display tags in rounded divs */}
                <div className="mt-4 flex flex-wrap">
                  {project.tags.map((tag) => (
                    <div key={tag} className="bg-blue-500 text-white rounded-full px-2 py-1 text-sm mr-2 mb-2">
                      {tag}
                    </div>
                  ))}
                </div>
           
                  <Link
                    className="bg-gradient-to-r h-fit my-auto from-purple-500 via-purple-600 to-blue-500 text-white px-4 py-2 rounded-md"
                    href={`/solver-space/project/${project.id}`}
                  >Solve</Link>


              </div>

              {/* Add more project details as needed */}
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
