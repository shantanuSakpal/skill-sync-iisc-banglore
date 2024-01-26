import "regenerator-runtime/runtime";
import { useReactMediaRecorder } from "react-media-recorder";
import { MdSkipNext } from "react-icons/md";
import { FaRegStopCircle } from "react-icons/fa";
import { BsRecordCircle } from "react-icons/bs";
import React, { useState } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

export default function Recorder({
  handleNextQuestion,

  setTranscript,
  setVideoUrl,
}) {
  const [isAudioRecording, setIsAudioRecording] = useState(false);
  const [isVideoRecording, setIsVideoRecording] = useState(false);
  const { transcript, listening, browserSupportsSpeechRecognition } =
    useSpeechRecognition();

  const startListening = () =>
    SpeechRecognition.startListening({
      language: "en-IN",
      continuous: true,
    });
  const stopListening = () => SpeechRecognition.stopListening();
  // const resetTranscript = () => SpeechRecognition.resetTranscript();

  const {
    status: audioStatus,
    startRecording: startAudioRecording,
    stopRecording: stopAudioRecording,
    mediaBlobUrl: audioMediaBlobUrl,
  } = useReactMediaRecorder({ audio: true, video: false });

  const {
    status: videoStatus,
    startRecording: startVideoRecording,
    stopRecording: stopVideoRecording,
    mediaBlobUrl: videoMediaBlobUrl,
  } = useReactMediaRecorder({ audio: false, video: true });

  const handleMediaRecording = () => {
    if (!isAudioRecording && !isVideoRecording) {
      startAudioRecording();
      startVideoRecording();
      startListening();
      setIsAudioRecording(true);
      setIsVideoRecording(true);
    } else {
      stopAudioRecording();
      stopVideoRecording();
      stopListening();
      setIsAudioRecording(false);
      setIsVideoRecording(false);

      // Pass transcript and video URL to the parent component
      setTranscript(transcript);
      setVideoUrl(videoMediaBlobUrl);

      handleNextQuestion(transcript, videoMediaBlobUrl);
    }
  };

  const sendMediaToFirebase = (mediaBlobUrl) => {
    // Code to send audio or video to firebase
  };

  return (
    <div className="flex flex-col gap-3 w-full">
      <button
        className={`flex gap-2 items-center justify-center bg-gradient-to-r from-blue-200 to-purple-200 rounded-lg font-semibold py-2 w-full hover:from-blue-300 hover:to-purple-300  ${
          isVideoRecording ? "bg-red-200" : ""
        }`}
        onClick={handleMediaRecording}
      >
        <div className="w-full flex justify-center gap-2 items-center ">
          {isVideoRecording ? (
            <>
              <p>Next Question</p>
              <MdSkipNext />
            </>
          ) : (
            <>
              <p>Start Recording</p>
              <BsRecordCircle />
            </>
          )}
        </div>
      </button>

      <button
        className="flex gap-2 items-center justify-center bg-gradient-to-r from-blue-200 to-purple-200 rounded-lg font-semibold py-2 w-full hover:from-blue-300 hover:to-purple-300"
        onClick={() => {
          stopAudioRecording();
          stopVideoRecording();
          setIsAudioRecording(false);
          setIsVideoRecording(false);
          sendMediaToFirebase(audioMediaBlobUrl);
          sendMediaToFirebase(videoMediaBlobUrl);
        }}
      >
        <p>Stop Interview</p>
        <FaRegStopCircle />
      </button>

      {/* <div>
        <audio src={audioMediaBlobUrl} controls autoPlay loop />
      </div> */}

      {/* <div>
        <video src={videoMediaBlobUrl} controls autoPlay loop />
      </div> */}

      <div>Transcript: {transcript}</div>
      <div>
        {browserSupportsSpeechRecognition
          ? "Your browser supports speech recognition"
          : "Your browser does not support speech recognition. Try Google Chrome."}
      </div>
    </div>
  );
}
