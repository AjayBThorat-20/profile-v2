"use client";

import React from 'react';
import WrapperLayout from '../Layout/wrapperLayout';



export default function WelcomeToProject() {
  return (
    <WrapperLayout firstPosition="Welcome to My" secondPosition="Projects">
      {/* Content */}
      <div className="w-full text-center space-y-5 mx-auto">
        <p className="text-xl text-justify indent-14 md:w-10/12 mx-auto">
          Explore the journey of my creativity and technical expertise through the projects showcased here. Each project represents a blend of innovation, problem-solving, and dedication to building impactful solutions. Whether it&apos;s crafting seamless user experiences, developing efficient systems, or implementing cutting-edge technologies, you&apos;ll find a glimpse of my passion for excellence.
        </p>
        <p className="text-2xl font-bold text-justify mx-auto w-full md:w-10/12">
          Dive in, and feel free to connect if any of my work inspires or resonates with you! &#128640;
        </p>
      </div>
    </WrapperLayout>
  );
}