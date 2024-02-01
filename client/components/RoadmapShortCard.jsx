import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { auth, db, storage } from "@/config/firebase-config";
import { collection, addDoc, doc, updateDoc } from "firebase/firestore";
import { UserAuth } from "@/context/AuthContext.js";

export default function RoadmapShortCard({ roadmap, index, userData }) {
  const router = useRouter();
  const [generatedRoadmap, setGeneratedRoadmap] = useState(null);
  const { user, createUser } = UserAuth();
  console.log("user,", user);
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

  /* userData  ={
  "uid": "F34PmSo2jeafn447a74hJEtPH7e2",
  "name": "asdf",
  "email": "shantanuessdfakpal1420@gmail.com",
  "industries": [
    "Software"
  ],
  "passions": [
    "Blockchain"
  ],
  "jobTypes": [
    "App Developer"
  ],
  "skills": [
    "React.js",
    "JavaScript"
  ],
  "roadmapDuration": "In 3-6 months",
  "curriculumPdf": {},
  "resumePdf": null
}
*/
  const handleSelectRoadmap = () => {
    console.log("Selected roadmap: ", roadmap.title);
    //fetch roadmap from api
    fetch("http://localhost:5000/generate_roadmap", {
      method: "POST",
      body: JSON.stringify({ userData: userData }),
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    })
      .then((res) => res.json())
      .then((json) => {
        console.log(json.result);

        let randomNum = Math.floor(100000 + Math.random() * 900000);
        // Add roadmap to Firebase
        let temp = {
          user_id: user.uid,
          roadmap_id: randomNum,
          roadmap_array: json.result,
        };
        const docRef = addDoc(collection(db, "roadmaps"), temp);

        // Save the formData to the Firestore database
        console.log("Document written with ID: ", docRef.id);
      });

    //redirect to career compass page
    router.push("/career-compass");
  };

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
        <button
          className="mt-5 bg-gradient-to-r from-blue-300 to-purple-300 rounded-lg  p-2 w-full font-semibold hover:from-blue-400  hover:to-purple-400"
          onClick={handleSelectRoadmap}
        >
          Choose this roadmap
        </button>
      </div>
    </div>
  );
}
