"use client";
import React from 'react';
import { About, Certifications, CoCurricularActivities, Education, Skills } from "@/Components/About/page";
export default function page() {
  return (
    <>
     
          <About />
          <Skills />
          <Certifications />
          <CoCurricularActivities />
          <Education />
    </>
  );
}