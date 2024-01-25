import React, { useRef, useEffect } from "react";

export default function AiAvatar() {
  const videoUrlList = [
    "https://firebasestorage.googleapis.com/v0/b/iitb-brogrammers.appspot.com/o/AI_Avatar_Questions%2FGeneral_Questions%2FVideo1.webm?alt=media&token=364814c0-65e1-4ddd-823e-a092d9b36fe2",
    "https://firebasestorage.googleapis.com/v0/b/iitb-brogrammers.appspot.com/o/AI_Avatar_Questions%2FDynamic_Questions%2Fvideo2.webm?alt=media&token=0d4d2ee0-82cb-4c6a-8df8-ea5038e35ff8",
    "https://firebasestorage.googleapis.com/v0/b/iitb-brogrammers.appspot.com/o/AI_Avatar_Questions%2FGeneral_Questions%2Fvideo3.webm?alt=media&token=1f19752f-d6a0-41d6-bc33-fec3c17a0eab"
  ];

  const videoRef = useRef(null);
  let currentVideoIndex = 0;

  const handleStart = () => {
    videoRef.current.play();
  };

  const handleNext = () => {
    videoRef.current.pause();
    currentVideoIndex = (currentVideoIndex + 1) % videoUrlList.length;
    videoRef.current.src = videoUrlList[currentVideoIndex];
    videoRef.current.play();
  };

  const handlePlayAgain = () => {
    videoRef.current.pause();
    videoRef.current.currentTime = 0; // Reset the current time to the beginning
    videoRef.current.play();    
  }

  useEffect(() => {
    videoRef.current.play();
  }, []);

  return (
    <div className="mx-auto w-full flex justify-center items-center">
      <div 
        onClick={handlePlayAgain}
        className="circular-video-container cursor: pointer">
        <video
          ref={videoRef}
          className="mx-auto circular-video"
          alt="ai person"
          width="500"
          height="500"
        >
          <source src={videoUrlList[currentVideoIndex]} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
      <div className="button-container">
        <button onClick={handleStart}>Start</button>
        <button onClick={handleNext}>Next</button>
      </div>
      <style jsx>{`
        .circular-video-container {
          width: 500px;
          height: 500px;
          overflow: hidden;
          border-radius: 50%;
        }

        .circular-video {
          width: 100%;
          height: 100%;
          object-fit: cover;
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
  );
}
