import React, { useEffect, useState } from "react";
import Recorder from "./Recorder";
import AiAvatar from "./AiAvatar";
import AudioRecorder from "./AudioRecorder";
import SpeechToText from "./SpeechToText";
import { db, storage } from "@/config/firebase-config.js";
import { ref, uploadBytes } from "firebase/storage";
import { collection, addDoc, doc, updateDoc } from "firebase/firestore";

export default function AfterInterviewStart({ questions }) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [transcript, setTranscript] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const storageRef = ref(storage, "/interviewVideos/userId/question2");

  const handleNextQuestion = async (transcript, mediaBlobUrl) => {
    const videoRef = storageRef.child(
      "recorded-videos/" + Date.now() + ".webm"
    );
    videoRef.put(mediaBlobUrl);
    // store the transcripts in firestore
    const docRef = await addDoc(
      collection(db, `ai_interview_transcripts-${currentQuestionIndex}`),
      { transcript: transcript }
    );
    setCurrentQuestionIndex(currentQuestionIndex + 1);
    console.log("transcript", transcript);
    // console.log("videoUrl", videoUrl);
    setTranscript("");
    setVideoUrl("");
  };

  return (
    <div className="w-full ">
      <div className="flex flex-col gap-5 px-10 py-5 ">
        <AiAvatar />
        <div className="w-full flex gap-5">
          <div className="w-1/2  flex gap-5 flex-col">
            <div className="bg-gradient-to-r from-blue-100 to-purple-100 rounded-lg  p-5 w-full">
              <p className="font-bold text-sm">
                {" "}
                Question {currentQuestionIndex + 1}
              </p>
              <p className="text-xl">{questions[currentQuestionIndex]}</p>
            </div>
          </div>
          <div className="w-1/2 flex flex-col gap-5 items-center">
            <Recorder
              handleNextQuestion={handleNextQuestion}
              questions={questions}
              currentQuestionIndex={currentQuestionIndex}
              setTranscript={setTranscript}
              setVideoUrl={setVideoUrl}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
