"use client";

import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { BasicInfo, OrbImage } from "@/Components/Home/page";

export default function Home() {
  const theme = useSelector((state: RootState) => state.theme.mode); // Access `mode` instead of `value`

  return (
    <div className="flex flex-col md:flex-row items-center md:justify-between w-full h-full space-y-8 md:space-y-0 ">
      
      <div className="relative w-full h-[55vh] md:w-1/2 md:h-[85vh] max-h-[85vh]">
        <OrbImage
          theme={theme}
          src="/Images/Profile/Ajay.png"
          alt="Person wearing VR headset"
          className="brightness-100"
          
        />
      </div>
      <BasicInfo theme={theme} />
    </div>
  );
}