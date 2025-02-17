import React from 'react';
import WrapperLayout from '../Layout/wrapperLayout';

export default function WelcomeToExperience() {
  return (
    <WrapperLayout firstPosition="Welcome to My" secondPosition="Journey">

      {/* Description */}
      <div className="text-center space-y-8 mx-auto px-6 sm:px-10 lg:px-16">
      <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
        Explore the milestones, ideas, and skills that define my professional and personal growth.
      </p>

      {/* List of Highlights */}
      <div className="bg-gray-50 dark:bg-gray-800 p-6 sm:p-8 rounded-xl shadow-lg max-w-2xl mx-auto">
        <ul className="text-lg sm:text-xl list-disc list-inside space-y-4 text-gray-700 dark:text-gray-300">
          <li>
            <span role="img" aria-label="milestone">📌</span>{" "}
            <strong>Milestones Achieved:</strong> A glimpse into the challenges I’ve conquered and the goals I’ve surpassed.
          </li>
          <li>
            <span role="img" aria-label="idea">💡</span>{" "}
            <strong>Ideas Realized:</strong> Creative solutions and impactful projects that shaped my growth.
          </li>
          <li>
            <span role="img" aria-label="target">🎯</span>{" "}
            <strong>Skills Honed:</strong> The tools and expertise I bring to the table.
          </li>
        </ul>
      </div>

      {/* Closing Statement */}
      <p className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white max-w-2xl mx-auto">
        Explore how these experiences come together to tell a story of growth, innovation, and success.
      </p>
      </div>
    </WrapperLayout>
  );
}
