import { useReactMediaRecorder } from "react-media-recorder";
import { MdSkipNext } from "react-icons/md";
import { FaRegStopCircle } from "react-icons/fa";
import { BsRecordCircle } from "react-icons/bs";
import React, { useState } from "react";

export default function AudioRecorder({
  handleNextQuestion,
  questions,
  currentQuestionIndex,
}) {
  const [isRecording, setIsRecording] = useState(false);

  const { status, startRecording, stopRecording, mediaBlobUrl } =
    useReactMediaRecorder({ video: false, audio: true });

  const sendAudioToFirebase = () => {
    // Code to send video to firebase
  };

  const saveVideoAlongWithQuestion = () => {};

  return (
    <div className="flex flex-col gap-3">
      <p className="capitalize font-semibold text-center">{status}</p>

      {!isRecording ? (
        <button
          className="flex gap-2 items-center justify-center bg-gradient-to-r from-blue-100 to-purple-100 rounded-lg font-semibold   py-2 w-full  hover:from-blue-200 hover:to-purple-200"
          onClick={() => {
            startRecording();
            setIsRecording(true);
          }}
        >
          <p>Start Recording</p>
          <BsRecordCircle />
        </button>
      ) : (
        <button
          className="flex gap-2 items-center justify-center bg-gradient-to-r from-blue-100 to-purple-100 rounded-lg font-semibold   py-2 w-full  hover:from-blue-200 hover:to-purple-200"
          onClick={() => {
            stopRecording();
            setIsRecording(false);
            handleNextQuestion();
            sendAudioToFirebase();
          }}
        >
          <p>Next Question</p>
          <MdSkipNext />
        </button>
      )}

      <button className="flex gap-2 items-center justify-center bg-gradient-to-r from-blue-100 to-purple-100 rounded-lg font-semibold   py-2 w-full  hover:from-blue-200 hover:to-purple-200">
        <p>Stop Interview</p>
        <FaRegStopCircle />
      </button>
      <audio src={mediaBlobUrl} controls autoPlay loop />
    </div>
  );
}
