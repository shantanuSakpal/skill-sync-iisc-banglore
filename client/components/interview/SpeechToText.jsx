import "regenerator-runtime/runtime";
import React from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

const SpeechToText = () => {
  const { transcript } = useSpeechRecognition();

  const startListening = () =>
    SpeechRecognition.startListening({
      language: "en-IN",
      continuous: true,
    });
  const stopListening = () => SpeechRecognition.stopListening();
  const resetTranscript = () => SpeechRecognition.resetTranscript();

  return (
    <div>
      <button onClick={startListening}>Start</button>
      <button onClick={stopListening}>Stop</button>
      <button onClick={resetTranscript}>Reset</button>
      <p>{transcript}</p>
    </div>
  );
};
export default SpeechToText;
