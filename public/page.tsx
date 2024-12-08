// "use client";
// import Image from "next/image";
// import Link from "next/link";
// import { useEffect, useState } from "react";

// export default function Home() {
//   const [showRest, setShowRest] = useState(false);
//   const [isImageLoaded, setIsImageLoaded] = useState(false);

//   useEffect(() => {
//     // Delay rendering of other components after the first render
//     const timeout = setTimeout(() => {
//       setShowRest(true); // Display other sections 
//     },500); // 50ms delay for smoother transition

//     return () => clearTimeout(timeout); // Cleanup timeout
//   }, []);
// ;

//   return (
//         <div className="text-center justify-center text-dark w-full h-screen lg:px-32 overflow-y-auto  px-4 overflow-x-hidden hide-scrollbar py-10 md:pb-0">

//     <div className='animate-slide-up '>
    
    
//           <div className="w-full h-full text-center items-center justify-center space-y-6 pb-10 ">
    
    



//           <div className="flex flex-col md:flex-row items-center md:justify-between w-full h-full space-y-8 md:space-y-0 md:px-0 px-0">

//           <div className="relative w-full h-[100vh] md:w-1/2  md:h-[90vh] max-h-[85vh] ">
//            {/* <Image
//             src="/Images/Profile/Ajay.png"
//             alt="Person wearing VR headset"
//             fill
//             className="object-cover md:scale-120 brightness-70"
//             priority
//           /> */}


// <Image
//               src="/Images/Profile/Ajay.png"
//               alt="Ajay Thorat - Professional Profile"
//               fill
//               priority
//               placeholder="blur"
//               blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gIoSUNDX1BST0ZJTEUAAQEAAAIYAAAAAAIQAABtbnRyUkdCIFhZWiAAAAAAAAAAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAAHRyWFlaAAABZAAAABRnWFlaAAABeAAAABRiWFlaAAABjAAAABRyVFJDAAABoAAAAChnVFJDAAABoAAAAChiVFJDAAABoAAAACh3dHB0AAAByAAAABRjcHJ0AAAB3AAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAFgAAAAcAHMAUgBHAEIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFhZWiAAAAAAAABvogAAOPUAAAOQWFlaIAAAAAAAAGKZAAC3hQAAGNpYWVogAAAAAAAAJKAAAA+EAAC2z3BhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABYWVogAAAAAAAA9tYAAQAAAADTLW1sdWMAAAAAAAAAAQAAAAxlblVTAAAAIAAAABwARwBvAG8AZwBsAGUAIABJAG4AYwAuACAAMgAwADEANv/bAEMAFA4PEg8NFBIQEhcVFBgeMCEcGBgeMCMqLCBiLyxCLDk7MDZjOD5JT0lFUUhnJWZnYVBbdnxqcWlwYWFtZv/bAEMBFRcXHhoeMyEhMFB1NFU0UFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUP/AABEIAAYACAMBIgACEQEDEQH/xAAVAAEBAAAAAAAAAAAAAAAAAAAABf/EABQQAQAAAAAAAAAAAAAAAAAAAAD/xAAUAQEAAAAAAAAAAAAAAAAAAAAA/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8AlgAH/9k="
//               className={`object-cover md:scale-120 brightness-70 transition-opacity duration-500 ${
//                 isImageLoaded ? 'opacity-100' : 'opacity-0'
//               }`}
//               onLoadingComplete={() => setIsImageLoaded(true)}
//               sizes="(max-width: 768px) 100vw, 50vw"
//             />
//         </div>

//         {showRest && (
//           <div className="w-full md:w-1/2 h-full text-center md:text-left space-y-6 animate-slide-up order-2 md:order-last px-4 md:px-0 pb-20">
//             <div className="space-y-6">
//               <h1 className="text-2xl md:text-[2.6rem] font-bold mb-4">
//                 Aspiring to learn and apply.
//               </h1>
//               <p className="text-base md:text-[1.2rem] mb-6  text-justify indent-6">
//                 A dedicated and self-motivated full-stack developer driven by a passion for solving real-world problems. Committed to contributing to national, organizational, and personal growth through innovative solutions, adaptability, and a relentless pursuit of excellence.
//               </p>
//             </div>
//             <div className="flex justify-center md:justify-start">
//               <Link 
//                 href="/Resume/Ajay_Thorat.pdf" 
//                 target="_blank" 
//                 className="inline-block bg-black text-white px-4 py-2.5 rounded-lg text-base md:text-lg hover:bg-white hover:text-black border-2 border-solid border-transparent hover:border-black"
//               >
//                 Resume
//               </Link>
//             </div>
//           </div>
//         )}

    
//     </div>
//     </div>
    
    
    
    
    
    
    
//     </div>
//     </div>
          
//   );
// }




"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

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
            <div className="relative w-full h-[100vh] md:w-1/2 md:h-[90vh] max-h-[85vh]">
              <Image
                src="/Images/Profile/Ajay.png"
                alt="Ajay Thorat - Professional Profile"
                fill
                priority
                placeholder="blur"
                blurDataURL="data:image/jpeg;base64,..."
                className={`object-cover md:scale-120 brightness-70 transition-opacity duration-500 ${isImageLoaded ? 'opacity-100' : 'opacity-0'}`}
                onLoad={() => setIsImageLoaded(true)}
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>

            {showRest && (
              <div className="w-full md:w-1/2 h-full text-center md:text-left space-y-6 animate-slide-up order-2 md:order-last px-4 md:px-0 pb-20">
                <div className="space-y-6">
                  <h1 className="text-2xl md:text-[2.6rem] font-bold mb-4">
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
