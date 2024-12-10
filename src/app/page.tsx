// "use client";
// import { useEffect, useState } from "react";
// import WelcomeToProject from "./Components/projects/welcomeToProject";
// import AcademicProjects from "./Components/projects/academicProjects";
// import Image from "next/image";
// import Link from "next/link";

// export default function Home() {
//   const [showRest, setShowRest] = useState(false);
//   const [isImageLoaded, setIsImageLoaded] = useState(false);

//   useEffect(() => {
//     if (isImageLoaded) {
//       setShowRest(true);  // Show the rest of the content after image loads
//     }
//   }, [isImageLoaded]);

//   return (
//     <div className="text-center justify-center text-dark w-full h-screen lg:px-32 overflow-y-auto px-4 overflow-x-hidden hide-scrollbar py-10 md:pb-0">
//       <div className="animate-slide-up">
//         <div className="w-full h-full text-center items-center justify-center space-y-6 pb-10">
//           <div className="flex flex-col md:flex-row items-center md:justify-between w-full h-full space-y-8 md:space-y-0 md:px-0 px-0">
//             <div className="relative w-full h-[100vh] md:w-1/2 md:h-[90vh] max-h-[85vh] ">
//               {/* <Image
//                 src="/Images/Profile/Ajay.png"
//                 alt="Ajay Thorat - Professional Profile"
//                 fill
//                 priority
//                 placeholder="blur"
//                 blurDataURL="data:image/jpeg;base64,..."
//                 className={`md:object-cover object-contain md:scale-120 brightness-70 transition-opacity duration-500 ${isImageLoaded ? 'opacity-100' : 'opacity-0'}`}
//                 onLoad={() => setIsImageLoaded(true)}
//                 sizes="(max-width: 768px)  100vw, 50vw"
//               /> */}


// <Image
//   src="/Images/Profile/Ajay.png"
//   alt="Ajay Thorat - Professional Profile"
//   fill
//   priority
//   placeholder="blur"
//   blurDataURL="data:image/jpeg;base64,..."
//   className={`md:object-contain object-contain scale-100 border-gray-400 md:scale-120 brightness-70 transition-opacity duration-500 ${isImageLoaded ? 'opacity-100' : 'opacity-0'}`}
//   onLoad={() => setIsImageLoaded(true)}
//   sizes="(max-width: 768px) 100vw, 50vw"
// />

//             </div>

//             {showRest && (
//               <div className="w-full md:w-1/2 h-full text-center md:text-left space-y-6 animate-slide-up order-2 md:order-last px-4 md:px-0 pb-20">
//                 <div className="space-y-6">
//                   <h1 className="text-2xl md:text-[2.6rem] font-bold mb-4">
//                     Aspiring to learn and apply.
//                   </h1>
//                   <p className="text-base md:text-[1.2rem] mb-6 text-justify indent-6">
//                     A dedicated and self-motivated full-stack developer driven by a passion for solving real-world problems. Committed to contributing to national, organizational, and personal growth through innovative solutions, adaptability, and a relentless pursuit of excellence.
//                   </p>
//                 </div>
//                 <div className="flex justify-center md:justify-start">
//                   <Link
//                     href="/Resume/Ajay_Thorat.pdf"
//                     target="_blank"
//                     className="inline-block bg-black text-white px-4 py-2.5 rounded-lg text-base md:text-lg hover:bg-white hover:text-black border-2 border-solid border-transparent hover:border-black"
//                   >
//                     Resume
//                   </Link>
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>











//     </div>
//   );
// }
















"use client";
import { useEffect, useState } from "react";
import WelcomeToProject from "./Components/projects/welcomeToProject";
import AcademicProjects from "./Components/projects/academicProjects";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  const [showRest, setShowRest] = useState(false);
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  useEffect(() => {
    if (isImageLoaded) {
      setShowRest(true);  // Show the rest of the content after image loads
    }
  }, [isImageLoaded]);

  return (
    <div className="text-center justify-center text-dark w-full h-screen lg:px-32 overflow-y-auto px-4 overflow-x-hidden hide-scrollbar py-10 md:pb-0">
      <div className="animate-slide-up">
        <div className="w-full h-full text-center items-center justify-center space-y-6 pb-10">
          <div className="flex flex-col md:flex-row items-center md:justify-between w-full h-full space-y-8 md:space-y-0 md:px-0 px-0">
          <div className="relative w-[40vh] h-[40vh] md:w-1/2 md:h-[85vh] max-h-[90vh] ">
  <Image
    src="/Images/Profile/Ajay.png"
    alt="Ajay Thorat - Professional Profile"
    fill
    priority
    placeholder="blur"
    blurDataURL="data:image/jpeg;base64,..."
    className={`md:object-contain object-contain scale-100 border-gray-400 md:scale-120 brightness-70 transition-opacity duration-500 ${isImageLoaded ? 'opacity-100' : 'opacity-0'} 
        md:rounded-none rounded-full shadow-xl w- md:shadow-none`} // rounded-full for mobile screens
    onLoad={() => setIsImageLoaded(true)}
    sizes="(max-width: 768px) 100vw, 50vw"
  />
</div>


            {showRest && (
              <div className="w-full md:w-1/2 h-full text-center md:text-left space-y-6 animate-slide-up order-2 md:order-last px-4 md:px-0 pb-20 md:pb-0">
                <div >
                  <h1 className="md:text-4xl lg:text-6xl text-2xl font-bold mb-4 ">
                    Aspiring to learn and apply.
                  </h1>
                  <p className="text-base md:text-[1.2rem] mb-6 text-justify indent-6">
                    A dedicated and self-motivated full-stack developer driven by a passion for solving real-world problems. Committed to contributing to national, organizational, and personal growth through innovative solutions, adaptability, and a relentless pursuit of excellence.
                  </p>
                </div>
                <div className="flex justify-center md:justify-start">
                  <Link
                    href="/Resume/Ajay_Thorat.pdf"
                    target="_blank"
                    className="inline-block bg-black text-white px-4 py-2.5 rounded-lg text-base md:text-lg hover:bg-white hover:text-black border-2 border-solid border-transparent hover:border-black"
                  >
                    Resume
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>











    </div>
  );
}