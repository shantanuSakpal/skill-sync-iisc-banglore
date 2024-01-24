import React from 'react'

export default function RoadmapShortCard({
  roadmap,
  index
}) {

  /*const [roadmaps, setRoadmaps] = useState([
    {
      "title": "Full Stack Web Developer",
      "overview": "This roadmap will prepare you for a career as a Full Stack Web Developer, with a focus on building web applications using diverse technologies.",
      "duration": "6-12 months",
      "topics": [
        "Frontend Development (React.js, Next.js)",
        "Backend Development (Node.js, Flask, MongoDB)",
        "Database Management (Firebase, MongoDB)",
        "Version Control (Git, GitHub)",
        "Cloud Services (AWS)",
        "UI/UX Design (Tailwind CSS)"
      ],
      "learning_objectives": [
        "Build responsive and interactive web applications using React.js and Next.js",
        "Develop and deploy server-side applications using Node.js and Flask",
        "Utilize Firebase and MongoDB for database management",
        "Implement version control with Git and GitHub",
        "Deploy applications on AWS cloud services",
        "Design visually appealing interfaces using Tailwind CSS"
      ],
      "prerequisites": [
        "Basic understanding of HTML, CSS, and JavaScript"
      ],
      "sample_courses": [
        "Full Stack Web Development with React Specialization on Coursera",
        "The Complete Node.js Developer Course on Udemy",
        "Intro to Flask by Corey Schafer on YouTube"
      ]
    },...
  ]);
    */

  return (
   <div key={index} className="w-full border shadow-lg rounded-lg p-5">
            <div className="flex flex-col">
              <h2 className="text-2xl font-bold mb-4">{roadmap.title}</h2>
              <p className="text-gray-600 mb-4">{roadmap.overview}</p>
              <div className="flex flex-wrap mb-4">
                {roadmap.topics.map((topic, index) => (
                  <span
                    key={index}
                    className="bg-gray-200 text-gray-800 rounded-full px-3 py-1 text-sm font-semibold mr-2 mb-2"
                  >
                    {topic}
                  </span>
                ))}
              </div>
              <h3 className="text-lg font-semibold mb-2">Learning Objectives:</h3>
              <ul className="list-disc list-inside mb-4">
                {roadmap.learning_objectives.map((objective, index) => (
                  <li key={index}>{objective}</li>
                ))}
              </ul>
              <h3 className="text-lg font-semibold mb-2">Prerequisites:</h3>
              <ul className="list-disc list-inside mb-4">
                {roadmap.prerequisites.map((prerequisite, index) => (
                  <li key={index}>{prerequisite}</li>
                ))}
              </ul>
              <h3 className="text-lg font-semibold mb-2">Sample Courses:</h3>
              <ul className="list-disc list-inside">
                {roadmap.sample_courses.map((course, index) => (
                  <li key={index}>{course}</li>
                ))}
              </ul>
              <button className="mt-5 bg-gradient-to-r from-blue-300 to-purple-300 rounded-lg  p-2 w-full font-semibold hover:from-blue-400  hover:to-purple-400">
                Choose this roadmap
              </button>
            </div>
          </div>
  )
}
