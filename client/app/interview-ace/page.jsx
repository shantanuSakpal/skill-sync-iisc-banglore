"use client";
import React, { useState } from "react";
import UserVideoContainer from "@/components/interview/UserVideoContainer";
import { BsRecordCircle } from "react-icons/bs";

export default function InterviewAce() {
  const [customQuestion, setCustomQuestion] = useState("");
  const [questions, setQuestions] = useState([]);

  const handleAddQuestion = () => {
    if (customQuestion.trim() !== "") {
      setQuestions((prevQuestions) => [...prevQuestions, customQuestion]);
      setCustomQuestion("");
    }
  };

  return (
    <div className="w-full ">
      <div className="w-full  px-10 py-5 gap-5">
        <div className="font-bold text-3xl text-left">Interview Ace</div>
        <p className="text-left">Get interview ready for your dream job!</p>
      </div>

      <div className="flex  px-10 py-5 gap-5">
        <div className="w-1/2  flex gap-5 flex-col">
          <div className="bg-gradient-to-r from-blue-100 to-purple-100 rounded-lg  p-5">
            <p className="font-bold "> Welcome Shantanu!</p>
            <p>
              Select the role you are applying for and AI will generate a list
              of questions for you to practice!
            </p>
          </div>

          <div className="bg-gradient-to-r from-blue-100 to-purple-100 rounded-lg  p-5">
            <p className="font-bold "> Add job description</p>
            <p>
              Upload the job description for the role you are applying for. This
              will help AI generate more relevant questions.
            </p>

            <div className="flex justify-between mt-5">
              <input type="file" id="file" className="p-1" />
              <label
                htmlFor="file"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Upload
              </label>
            </div>
          </div>

          <button className=" bg-gradient-to-r from-blue-400 to-purple-400 rounded-lg px-3 py-2 font-semibold hover:from-blue-500 hover:to-purple-500">
            Click to generate questions
          </button>

          <div className="bg-gradient-to-r from-blue-100 to-purple-100 rounded-lg  p-5">
            <p className="font-bold ">Questions generated by AI.</p>

            <div className="flex flex-col justify-start gap-5 mt-5">
              {questions.map((question, index) => (
                <div className="flex justify-start items-center">
                  <div className=" "></div>
                  <div className=" ">
                    {index + 1}. {question}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-r from-blue-100 to-purple-100 rounded-lg  p-5">
            <p className="font-bold "> Add your own questions!</p>

            <div className="flex justify-start gap-5 mt-5">
              <input
                type="text"
                id="file"
                className="px-2 py-1 rounded-md border-1 border-gray-400"
                placeholder="Click to add custom question"
              />
              <label
                htmlFor="file"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full flex justify-center items-center"
                onClick={handleAddQuestion}
              >
                +
              </label>
            </div>
          </div>
        </div>
        <div className="w-1/2 flex flex-col gap-5 items-center">
          <UserVideoContainer />
          <button className="bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg  px-10 py-5 text-center text-lg font-bold text-white flex items-center justify-center gap-3 w-fit hover:from-blue-600 hover:to-purple-600">
            <BsRecordCircle />
            Click to start interview
          </button>
        </div>
      </div>
    </div>
  );
}
