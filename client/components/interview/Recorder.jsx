import { useReactMediaRecorder } from "react-media-recorder";
import { MdSkipNext } from "react-icons/md";
import { FaRegStopCircle } from "react-icons/fa";
import { BsRecordCircle } from "react-icons/bs";
import React from "react";

export default function Recorder() {
  const { status, startRecording, stopRecording, mediaBlobUrl } =
    useReactMediaRecorder({ video: true, audio: true });

  return (
    <div className="flex flex-col gap-3">
      <p className="capitalize font-semibold text-center">{status}</p>

      {status === "idle" ? (
        <button
          className="flex gap-2 items-center justify-center bg-gradient-to-r from-blue-100 to-purple-100 rounded-lg font-semibold   py-2 w-full  hover:from-blue-200 hover:to-purple-200"
          onClick={startRecording}
        >
          <p>Start Recording</p>
          <BsRecordCircle />
        </button>
      ) : (
        <button
          className="flex gap-2 items-center justify-center bg-gradient-to-r from-blue-100 to-purple-100 rounded-lg font-semibold   py-2 w-full  hover:from-blue-200 hover:to-purple-200"
          onClick={stopRecording}
        >
          <p>Next Question</p>
          <MdSkipNext />
        </button>
      )}

      <button className="flex gap-2 items-center justify-center bg-gradient-to-r from-blue-100 to-purple-100 rounded-lg font-semibold   py-2 w-full  hover:from-blue-200 hover:to-purple-200">
        <p>Stop Interview</p>
        <FaRegStopCircle />
      </button>
      <video src={mediaBlobUrl} controls autoPlay loop />
    </div>
  );
}
