"use client";
import React, { useState } from "react";

import AfterInterviewStart from "../../components/interview/AfterInterviewStart";
import BeforeInterviewStart from "../../components/interview/BeforeInterviewStart";
import UserVideoContainer from "@/components/interview/UserVideoContainer";

export default function InterviewAce() {
  const [isInterviewStarted, setIsInterviewStarted] = useState(false);

  const [customQuestions, setCustomQuestions] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [jobs, setJobs] = useState([
    "Software Engineer",
    "Data Scientist",
    "Product Manager",
    "Network Engineer",
    "UX/UI Designer",
    "DevOps Engineer",
    "Business Analyst",
    "Cybersecurity Analyst",
    "Mobile App Developer",
    "Machine Learning Engineer",
  ]);
  const [selectedJob, setSelectedJob] = useState();

  const [questions, setQuestions] = useState([
    "Tell me about yourself.",
    "Tell me about a time when you had to work with a difficult or disruptive person. How did you handle the situation?",
    "Tell me about a time when you had too many things to do and you were required to prioritize your tasks.",

    "Tell me about a time you had to work with a difficult or disruptive person. How did you handle the situation?",
  ]);

  const filteredJobs = jobs.filter((job) =>
    job.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddQuestion = (index) => {
    // Code to add the custom question to the questions array
    const updatedCustomQuestions = [...customQuestions];
    updatedCustomQuestions[index] = "";
    setCustomQuestions(updatedCustomQuestions);

    setQuestions((prevQuestions) => [...prevQuestions, customQuestions[index]]);
  };

  const handleInputChange = (index, value) => {
    // Code to update the custom question in the state
    const updatedCustomQuestions = [...customQuestions];
    updatedCustomQuestions[index] = value;
    setCustomQuestions(updatedCustomQuestions);
  };

  const handleAddMoreInput = () => {
    // Code to add more input fields for custom questions
    setCustomQuestions([...customQuestions, ""]);
  };

  const handleCheckboxChange = (value) => {
    setSelectedJob(value);
    console.log(value);
  };

  return (
    <div className="w-full ">
      {isInterviewStarted ? (
        <AfterInterviewStart questions={questions} />
      ) : (
        <BeforeInterviewStart
          questions={questions}
          setQuestions={setQuestions}
          customQuestions={customQuestions}
          setCustomQuestions={setCustomQuestions}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          filteredJobs={filteredJobs}
          handleCheckboxChange={handleCheckboxChange}
          selectedJob={selectedJob}
          setIsInterviewStarted={setIsInterviewStarted}
          handleInputChange={handleInputChange}
          handleAddQuestion={handleAddQuestion}
          handleAddMoreInput={handleAddMoreInput}
        />
      )}
      {!isInterviewStarted && (
        <div className="fixed right-5 bottom-5 w-72 bg-gray-400 aspect-video rounded-lg shadow-md">
          <UserVideoContainer />
        </div>
      )}
    </div>
  );
}
