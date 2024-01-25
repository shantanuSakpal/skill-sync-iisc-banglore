import { useRef, useCallback } from 'react';

export const useVideoControls = (videoUrlList) => {
  const videoRef = useRef(null);
  let currentVideoIndex = 0;

  const handleStart = useCallback(() => {
    videoRef.current.play();
  }, []);

  const handleNext = useCallback(() => {
    videoRef.current.pause();
    currentVideoIndex = (currentVideoIndex + 1) % videoUrlList.length;
    videoRef.current.src = videoUrlList[currentVideoIndex];
    videoRef.current.play();
  }, [videoUrlList]);

  return { videoRef, handleStart, handleNext };
};
