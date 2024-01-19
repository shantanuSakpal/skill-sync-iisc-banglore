"use client";
import React, { useState, useEffect, useRef } from "react";

export default function UserVideoContainer() {
  const [isLoading, setIsLoading] = useState(true);
  const videoRef = useRef(null);
  const [stream, setStream] = useState(null);

  useEffect(() => {
    const getWebcamStream = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
        });
        setStream(stream);
        videoRef.current.srcObject = stream;
        videoRef.current.onloadedmetadata = () => {
          setIsLoading(false);
        };
      } catch (error) {
        console.error("Error accessing webcam:", error);
      }
    };

    getWebcamStream();

    return () => {
      // Clean up the stream when the component unmounts
      const stream = videoRef.current.srcObject;
      if (stream instanceof MediaStream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  return (
    <div className="w-full rounded-lg aspect-video  bg-cover relative ">
      {isLoading && (
        <p className="absolute flex items-center justify-center w-full h-full">
          Loading...
        </p>
      )}
      <video
        ref={videoRef}
        className="w-full h-full rounded-lg object-cover"
        autoPlay
        muted
        playsInline
      />
    </div>
  );
}
