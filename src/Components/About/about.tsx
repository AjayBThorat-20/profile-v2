"use client";

import Image from "next/image";
import WrapperLayout from "../Layout/wrapperLayout";

export default function About() {
  return (
    <WrapperLayout firstPosition="" secondPosition="">
        <div className="text-center mb-10">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-center text-gray-800 dark:text-gray-200">
            <span className="text-blue-500 dark:text-blue-400">AJAY</span> BHIMRAO THORAT
          </h1>
        </div>

        {/* Content Container */}
        <div className="flex flex-col-reverse md:flex-row items-center gap-10 w-full max-w-6xl">
          {/* Text Section */}
          <div className="md:w-1/2">
            <p className="text-lg md:text-xl leading-relaxed text-gray-700 dark:text-gray-300 text-justify md:text-left">
              My name is <span className="font-semibold text-blue-500 dark:text-blue-400">Ajay Bhimrao Thorat</span>,
              and I&apos;m based in <span className="font-semibold text-blue-500 dark:text-blue-400">Mumbai, India</span>.
              I&apos;m a <span className="font-semibold text-blue-500 dark:text-blue-400">full-stack developer</span> with
              expertise in <span className="font-semibold">Next.js, Python, Node.js, React.js, and MongoDB</span>.
            </p>

            <p className="text-lg md:text-xl leading-relaxed mt-4 text-gray-700 dark:text-gray-300 text-justify md:text-left">
              With hands-on experience in building <span className="font-semibold text-blue-500 dark:text-blue-400">scalable web applications</span> and managing{" "}
              <span className="font-semibold text-blue-500 dark:text-blue-400">agile teams</span>, I excel in delivering{" "}
              <span className="font-semibold text-blue-500 dark:text-blue-400">user-centric solutions</span>. Adaptable under pressure,
              I thrive in <span className="font-semibold text-blue-500 dark:text-blue-400">collaborative environments</span> and innovative projects.
            </p>
          </div>

          {/* Image Section */}
          <div className="md:w-1/2 flex justify-center">
            <div className="relative w-[300px] h-[300px] md:w-[400px] md:h-[400px] rounded-2xl shadow-lg overflow-hidden group">
              <Image
                src="/Images/Dummy/icon.png"
                alt="Person wearing VR headset"
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105 brightness-75"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
            </div>
          </div>
        </div>
    </WrapperLayout>
  );
}