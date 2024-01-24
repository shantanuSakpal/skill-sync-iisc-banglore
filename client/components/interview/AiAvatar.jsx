import React, { useState, useRef, useEffect } from "react";

export default function AiAvatar() {
  const videoUrlList = [
    "https://firebasestorage.googleapis.com/v0/b/iitb-brogrammers.appspot.com/o/AI_Avatar_Questions%2FGeneral_Questions%2FVideo1.webm?alt=media&token=364814c0-65e1-4ddd-823e-a092d9b36fe2",
    "https://firebasestorage.googleapis.com/v0/b/iitb-brogrammers.appspot.com/o/AI_Avatar_Questions%2FGeneral_Questions%2Fvideo2.webm?alt=media&token=778984cc-8e52-49a6-bba3-a40c87299d6d",
    // ... Add more video URLs as needed
  ];

  const [currentVideoIndex, setCurrentVideoIndex] = useState(1);
  const [isRecording, setIsRecording] = useState(false);

  const videoRef = useRef(null);

  const handleStartRecording = () => {
    console.log(videoRef.current);
    setIsRecording(true);
    videoRef.current.play();
  };

  const handlePlayAgain = () => {
    videoRef.current.currentTime = 0;
    videoRef.current.play();
  };

  const handleNextQuestion = () => {
    setIsRecording(false);
    setCurrentVideoIndex((prevIndex) => (prevIndex + 1) % videoUrlList.length);
    console.log(currentVideoIndex);
  };

  var currentVideoUrl = videoUrlList[currentVideoIndex];

  useEffect(() => {    
    videoRef.current?.load();
  }, [currentVideoUrl]);

  return (
    <>
      <div className="mx-auto w-full flex justify-center items-center">
        <div className="circular-video-container">
          <video
            ref={videoRef}
            className={`mx-auto circular-video ${isRecording ? "recording" : ""}`}
            alt="ai person"
            width="500"
            height="500"
            // onEnded={handleNextQuestion} // Trigger next question when the video ends
          >
          <source src={currentVideoUrl} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
      <div className="button-container">
        {!isRecording && (
          <button onClick={handleStartRecording}>Start Recording</button>
        )}
        {isRecording && (
          <button onClick={handlePlayAgain}>Play Again</button>
        )}
        <button onClick={handleNextQuestion}>Next Question</button>
      </div>
      <style jsx>{`
        .circular-video-container {
          width: 500px;
          height: 500px;
          overflow: hidden;
          border-radius: 50%;
          position: relative;
        }

        .circular-video {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: filter 0.5s ease;
        }

        .circular-video.recording {
          /* Remove the grayscale filter */
          /* filter: grayscale(100%); */
        }

        .button-container {
          display: flex;
          justify-content: center;
          margin-top: 20px;
        }

        button {
          margin: 0 10px;
          padding: 10px;
          cursor: pointer;
          background-color: #ffffff;
          border: 1px solid #000000;
        }
      `}</style>
    </div>
    </>
  );
}