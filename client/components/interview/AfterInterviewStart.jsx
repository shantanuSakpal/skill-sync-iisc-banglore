import React, { useEffect, useState } from "react";
import Recorder from "./Recorder";
import AiAvatar from "./AiAvatar";

export default function AfterInterviewStart({ questions }) {
  return (
    <div className="w-full ">
      <div className="flex  px-10 py-5 gap-5">
        <div className="w-1/2 flex flex-col gap-5 items-center">
          <AiAvatar />
          <Recorder />
        </div>
        <div className="w-1/2  flex gap-5 flex-col">
          <div className="bg-gradient-to-r from-blue-100 to-purple-100 rounded-lg  p-5 w-full">
            <p className="font-bold text-sm"> Question 1</p>
            <p className="text-xl">{questions[0]}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
