import React, { useState } from "react";
import { TiTick } from "react-icons/ti";
import "./stepper.css";
import TaskComponent from "../../components/roadmap/TaskComponent";


const Stepper = ({ roadmap }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [complete, setComplete] = useState(false);

  const handleStepClick = (stepIndex) => {
    if (stepIndex <= currentStep) {
      setCurrentStep(stepIndex);
    }
  };

  const handleButtonClick = () => {
    if (currentStep === roadmap.length) {
      setComplete(true);
    } else {
      setCurrentStep((prevStep) => prevStep + 1);
    }
  };

  return (
    <div>
      <div className="flex justify-between">
        {roadmap?.map((step, i) => (
          <div
            key={i}
            className={`step-item ${currentStep === i + 1 && "active"} ${(i + 1 < currentStep || complete) && "complete"
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
      <div className="flex justify-center">
      { !complete && (
              <button
                className="btn"
                onClick={handleButtonClick}
              >
                {currentStep === roadmap.length ? "Complete Roadmap" : "done"}
              </button>
            )}
      </div>

      {/* task details  */}
      <TaskComponent taskData={roadmap[0]} />

      {/* suggested material to this */}
      
    </div>
  );
};

export default Stepper;
