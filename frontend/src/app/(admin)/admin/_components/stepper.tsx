// Stepper.js
import React from 'react';

interface StepperProps {
    currentStep: number;
    steps: string[];
  }
  

const Stepper = ({ currentStep, steps } :StepperProps) => {
  return (
    <div className="w-full flex flex-col">
      <div className="flex justify-between items-center w-full">
        {steps.map((step, index) => (
          <div key={index} className=' w-full'>
            
            <p className={`my-2 float-left md:text-base sm:text-sm text-xs font-medium ${index <= currentStep ? 'text-primaryMain' : 'text-gray-500'}`}>
              {step}
            </p>
            <div className="relative flex items-center w-full">
                <div
                className={`flex items-center justify-center rounded-full ${
                    index <= currentStep ? 'bg-primaryMain border border-dashed border-primaryMain' : 'bg-gray-300'
                }`}
                >
                <span className="text-white h-3.5 w-4 rounded-full"></span>
                </div>
                {index < steps.length - 1 && (
                <div className="h-[1px] w-full bg-gray-300 flex-grow">
                    <div
                    className={`h-full ${
                        index < currentStep ? 'bg-primaryMain' : 'bg-gray-300'
                    }`}
                    style={{ width: '100%' }}
                    />
                </div>
                )}
                
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Stepper;
