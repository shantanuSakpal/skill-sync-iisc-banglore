import React from "react";
import { BsRecordCircle } from "react-icons/bs";
import UserVideoContainer from "./UserVideoContainer";

export default function BeforeInterviewStart({
  questions,
  setQuestions,
  customQuestions,
  setCustomQuestions,
  searchTerm,
  setSearchTerm,
  filteredJobs,
  handleCheckboxChange,
  selectedJob,
  setIsInterviewStarted,
  handleInputChange,
  handleAddQuestion,
  handleAddMoreInput,
}) {
  return (
    <div className="w-full ">
      <div className="w-full  px-10 py-5 gap-5">
        <div className="font-bold text-3xl text-left">Interview Ace</div>
        <p className="text-left">Get interview ready for your dream job!</p>
      </div>

      <div className="flex  px-10 py-5 gap-5">
        <div className="w-1/2  flex gap-5 flex-col">
          <div className="bg-gradient-to-r from-blue-100 to-purple-100 rounded-lg  p-5 w-full">
            <p className="font-bold "> Welcome Shantanu!</p>
            <p>
              Lets get you ready for your Software Developer role interview !
            </p>
          </div>
          <div className="bg-gradient-to-r from-blue-100 to-purple-100 rounded-lg  p-5 w-full">
            <p className="font-bold "> Practicing for a different role?</p>
            <p>
              Select the role you are practicing for and AI will generate a list
              of questions for you!
            </p>
            <form className="">
              <div className="flex flex-wrap ">
                <div className="w-full px-3 py-3 ">
                  <input
                    id="search"
                    type="text"
                    className="form-input w-full mb-3"
                    placeholder="Type to search..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <div className="max-h-52 overflow-auto ">
                    {filteredJobs.map((job) => (
                      <label
                        key={job}
                        className="block text-lg my-4 font-medium hover:cursor-pointer"
                        htmlFor={job}
                      >
                        <input
                          id={job}
                          type="radio"
                          className="form-radio mr-3 text-blue-700"
                          value={job}
                          onChange={() => handleCheckboxChange(job)}
                          checked={job === selectedJob}
                          //only one radio button can be selected at a time
                          name="job"
                        />
                        {job}
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </form>
          </div>

          <div className="bg-gradient-to-r from-blue-100 to-purple-100 rounded-lg  p-5 w-full">
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
        </div>
        <div className="w-1/2 flex flex-col gap-5 items-center">
          <div className="bg-gradient-to-r from-blue-100 to-purple-100 rounded-lg  p-5 w-full">
            <p className="font-bold ">Questions for this interview</p>
            {questions.length > 0 ? (
              <div className="flex flex-col justify-start gap-5 mt-5">
                {questions.map((question, index) => (
                  <div className="flex justify-start items-center" key={index}>
                    <div className=" "></div>
                    <div className=" ">
                      {index + 1}. {question}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex justify-start items-center w-full">
                Click on generate questions to get started!
              </div>
            )}
          </div>

          <div className="bg-gradient-to-r from-blue-100 to-purple-100 rounded-lg  p-5 w-full">
            <p className="font-bold "> Add your own questions!</p>
            <div className="flex flex-col gap-5 mt-5">
              {customQuestions.length > 0 &&
                customQuestions?.map((customQuestion, index) => (
                  <div className="flex justify-start gap-5" key={index}>
                    <input
                      type="text"
                      value={customQuestion}
                      onChange={(e) => handleInputChange(index, e.target.value)}
                      className="px-2 py-1 rounded-md border-1 border-gray-400 w-full"
                      placeholder="Click to add custom question"
                    />
                    <button
                      onClick={() => handleAddQuestion(index)}
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
                    >
                      Add
                    </button>
                  </div>
                ))}
              {customQuestions.length == 0 && (
                <button
                  onClick={handleAddMoreInput}
                  className="bg-gradient-to-r from-blue-400 to-purple-400 rounded-lg px-3 py-2 font-semibold hover:from-blue-500 hover:to-purple-500"
                >
                  Add more questions
                </button>
              )}
            </div>
          </div>

          <button
            className="bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg  px-5 py-3 text-center text-lg font-bold text-white flex items-center justify-center gap-3 w-fit hover:from-blue-600 hover:to-purple-600"
            onClick={() => {
              setIsInterviewStarted(true);
              //scroll to top
              window.scrollTo(0, 0);
            }}
          >
            <BsRecordCircle />
            Click to start interview
          </button>
        </div>
      </div>
    </div>
  );
}
