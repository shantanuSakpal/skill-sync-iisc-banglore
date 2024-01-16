import React, { useState } from "react";
import { TiTick } from "react-icons/ti";
import "./stepper.css";

const Stepper = ({ roadmap }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [complete, setComplete] = useState(false);

  const handleStepClick = (stepIndex) => {
    if (stepIndex <= currentStep) {
      setCurrentStep(stepIndex);
    }
  };

  return (
    <div>
      <div className="flex justify-between">
        {roadmap?.map((step, i) => (
          <div
            key={i}
            className={`step-item ${currentStep === i + 1 && "active"} ${
              (i + 1 < currentStep || complete) && "complete"
            } `}
            onClick={() => handleStepClick(i + 1)}
          >
            <div className="step">
              {i + 1 < currentStep || complete ? <TiTick size={24} /> : i + 1}
            </div>
            <p className="text-gray-500">{step.name}</p>
          </div>
        ))}
      </div>
      {!complete && (
        <button
          className="btn"
          onClick={() => {
            currentStep === roadmap.length
              ? setComplete(true)
              : setCurrentStep((prev) => prev + 1);
          }}
        >
          {currentStep === roadmap.length ? "Finish" : "Next"}
        </button>
      )}
    </div>
  );
};

export default Stepper;
