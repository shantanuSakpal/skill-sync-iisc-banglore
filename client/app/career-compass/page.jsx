"use client";
import React from "react";
import Stepper from "../../components/roadmap/Stepper";
import data from "@/data/data.json";
import TaskComponent from "../../components/roadmap/TaskComponent";

export default function CareerCompass() {
  const roadmap = data.roadmap;
  return (
    <div>
      
      <Stepper roadmap={roadmap} />
      {/* task desc  */}

      <TaskComponent taskData={roadmap[0]} />
    </div>
  );
}
