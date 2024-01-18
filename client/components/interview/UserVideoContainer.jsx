"use client";
import React, { useEffect, useRef, useState } from "react";
import { FaVideoSlash, FaVideo } from "react-icons/fa";

export default function UserVideoContainer() {
  const [stream, setStream] = useState(null);
  const [showVideo, setShowVideo] = useState(true);
  const [loading, setLoading] = useState(true);
  const [permission, setPermission] = useState(false);

  const getMicrophonePermission = async () => {
    if ("MediaRecorder" in window) {
      try {
        const streamData = await navigator.mediaDevices.getUserMedia({
          audio: true,
          video: false,
        });
        setPermission(true);
        setStream(streamData);
      } catch (err) {
        alert(err.message);
      }
    } else {
      alert("The MediaRecorder API is not supported in your browser.");
    }
  };

  const startVideo = async () => {
    setLoading(true);
    try {
      // Get user media (access to webcam)
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
      });

      setStream(stream);
    } catch (error) {
      console.error("Error accessing webcam:", error);
    }
    setLoading(false);
  };

  const stopVideo = () => {
    if (stream) {
      const tracks = stream.getTracks();
      tracks.forEach((track) => track.stop());
      setStream(null); // Set stream to null to stop the video element
    }
    setShowVideo(false);
  };

  useEffect(() => {
    getMicrophonePermission();
    startVideo(); // Call the function to start the video when the component mounts
  }, []); // Empty dependency array ensures that the effect runs only once during component mount
  // console.log("showVideo", showVideo);

  const handleTurnOnCamera = () => {
    startVideo();
    setShowVideo(true);
  };

  const handleTurnOffCamera = () => {
    stopVideo();
    setShowVideo(false);
  };

  return (
    <div className="w-full rounded-lg aspect-video relative bg-cover border-2 border-gray-300">
      {showVideo ? (
        loading ? (
          <div className="flex justify-center items-center w-full h-full rounded-lg bg-gray-400">
            <div className="text-xl text-gray-600">Loading...</div>
          </div>
        ) : (
          <video
            className="w-full h-full rounded-lg object-cover"
            autoPlay
            playsInline
            ref={(video) => (video ? (video.srcObject = stream) : null)}
          />
        )
      ) : (
        <div className="flex justify-center items-center w-full h-full rounded-lg bg-gray-400">
          <div className="text-7xl text-gray-700">
            <FaVideoSlash />
          </div>
        </div>
      )}

      {showVideo ? (
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded absolute bottom-5 left-5"
          onClick={() => {
            handleTurnOffCamera();
          }}
        >
          <FaVideo />
        </button>
      ) : (
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded absolute bottom-5 left-5"
          onClick={() => {
            handleTurnOnCamera();
          }}
        >
          <FaVideoSlash />
        </button>
      )}
    </div>
  );
}
