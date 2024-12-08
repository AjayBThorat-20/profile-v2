// import React from 'react'
// import Navbar from '../Header/navbar';

// export default function Defaultlayout({
//     children,
// }: {
//     children: React.ReactNode;
// }
// ) {
//     return (
//         <>
//             <div className=" h-screen overflow-hidden bg-white  text-black  "> 
//                 <Navbar/>


//             <main>
//                 {children}
//             </main>

//             </div>


//         </>
//     );
// }


"use client"

import React, { useEffect, useState } from 'react';
import Navbar from '../Header/navbar';

export default function DefaultLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        // Simulate a load delay (e.g., for animations, if necessary)
        const timeout = setTimeout(() => {
            setIsLoaded(true);
        }, 100); // You can adjust this timeout duration if needed

        // Clear the timeout when the component is unmounted
        return () => clearTimeout(timeout);
    }, []);

    return (
        <div className="h-screen overflow-hidden bg-white text-black">
            {/* Navbar */}
            <Navbar />

            {/* Main content */}
            <main className={`transition-all duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
                {children}
            </main>
        </div>
    );
}
