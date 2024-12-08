"use client";

import Image from "next/image";

export default function About() {
  return (
    <>

<div className='mb-8 md:mb-0'>
<h1 className="text-6xl md:text-7xl font-bold " >AJAY BHIMRAO THORAT</h1>
</div>

<div className="md:flex text-center   md:justify-between w-full md:gap-4 ">
  <div className='h-full min-h-full  w-full max-w-[100vh]'>

    <p className="text-[1rem] md:text-3xl  text-justify md:pt-10 indent-6">
      My name is{" "}
      <span className="font-semibold text-gray-400">
        Ajay Bhimrao Throat
      </span>
      , and I&apos;m based in{" "}
      <span className="font-semibold text-gray-400">
        Mumbai, Maharashtra, India
      </span>
      . I&apos;m a{" "}
      <span className="font-semibold text-gray-400">
        full-stack developer
      </span>{" "}
      with expertise in{" "}
      <span className="font-semibold text-gray-400">
        Next.js, Python, Node.js, React.js, and MongoDB
      </span>
      . I have strong skills in{" "}
      <span className="font-semibold text-gray-400">
        problem-solving, communication, and leadership
      </span>
      .
    </p>
    <p className="text-[1rem] md:text-3xl  mt-4 text-justify indent-6">
      With hands-on experience in building{" "}
      <span className="font-semibold text-gray-400">
        scalable web applications
      </span>{" "}
      and managing{" "}
      <span className="font-semibold text-gray-400">agile teams</span>, I
      excel in delivering{" "}
      <span className="font-semibold text-gray-400">
        user-centric solutions
      </span>
      . Adaptable under pressure, I thrive in{" "}
      <span className="font-semibold text-gray-400">
        collaborative environments
      </span>{" "}
      and innovative projects.
    </p>

  </div>
  <div className='relative items-center h-ful md:w-[70vh]  w-auto pt-10 '>
  <div className=" min-h-[70vh] md:min-h-[10vh]  max-w-[20vh] w-auto h-full ">
    <Image
    
      src="/Images/Dummy/icon.png"
      // src="/Images/Dummy/new_icon.png"
      alt="Person wearing VR headset"
      fill
      className="object-cover brightness-70 "
      priority
    />
  </div>
  </div>
</div>

    </>
  );
}
