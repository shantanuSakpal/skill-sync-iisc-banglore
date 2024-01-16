"use client";
import React from "react";
import Stepper from "../../components/roadmap/Stepper";
import data from "@/data/data.json";

export default function CareerCompass() {
  const roadmap = data.roadmap;
  return (
    <div>
      <Stepper roadmap={roadmap} />
    </div>
  );
}
