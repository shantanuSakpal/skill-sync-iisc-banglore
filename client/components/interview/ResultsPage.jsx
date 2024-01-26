// ResultsPage.js
import React from "react";

const ResultsPage = () => {
  return (
    <div className="container mx-auto rounded-lg shadow-lg p-8">
      <h1 className="text-3xl font-semibold mb-4 mx-4">Analysis</h1>

      <div className="flex flex-wrap -mx-4">
        {/* Column 1 */}
        <div className="w-full md:w-1/2 px-4 mb-4">
          <div className="bg-white p-6 rounded-lg shadow-md bg-gradient-to-r from-blue-100 to-purple-100">
            <h2 className="text-xl font-semibold mb-4">Feedback on Your Response</h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
          </div>
        </div>

        {/* Column 2 */}
        <div className="w-full md:w-1/2 px-4 mb-4">
          <div className="bg-white p-6 rounded-lg shadow-md bg-gradient-to-r from-blue-100 to-purple-100">
            <h2 className="text-xl font-semibold mb-4">Areas of Strength</h2>
            <ul>
              <li>Strength 1</li>
              <li>Strength 2</li>
              {/* Add more strengths as needed */}
            </ul>
          </div>
        </div>

        <div className="w-full md:w-1/2 px-4 mb-4">
          <div className="bg-white p-6 rounded-lg shadow-md bg-gradient-to-r from-blue-100 to-purple-100">
            <h2 className="text-xl font-semibold mb-4">Additional Insights</h2>
            <ul>
              <li>Strength 1</li>
              <li>Strength 2</li>
              {/* Add more strengths as needed */}
            </ul>
          </div>
        </div>

        {/* Additional columns for other results */}
        
        <div className="w-full md:w-1/2 px-4 mb-4">
          <div className="bg-white p-6 rounded-lg shadow-md bg-gradient-to-r from-blue-100 to-purple-100">
            <h2 className="text-xl font-semibold mb-4">
              Areas of Improvement
            </h2>
            <ul>
              <li>Improvement 1</li>
              <li>Improvement 2</li>
              {/* Add more areas of improvement as needed */}
            </ul>
          </div>
        </div>

        <div className="w-full md:w-1/2 px-4 mb-4">
          <div className="bg-white p-6 rounded-lg shadow-md bg-gradient-to-r from-blue-100 to-purple-100">
            <h2 className="text-xl font-semibold mb-4">Confidence Level</h2>
            <p>High</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultsPage;
