"use client"
import Image from 'next/image';
import React, { useState } from 'react';
import { IoIosCloseCircle } from 'react-icons/io';
import { MdOpenWith } from "react-icons/md";

const ActivityData = [
  { id: 1, title: "Big Data Computing", image: "/Images/Certificates/BigData.png", year: "2021", organizationName: "NPTEL" },
  { id: 2, title: "Data Analytics with Python", image: "/Images/Certificates/Data_Analytics_with_Python.png", year: "2024", organizationName: "NPTEL" },
  { id: 3, title: "Postman Student Expert", image: "/Images/Certificates/postman.png", year: "2021", organizationName: "NPTEL" },
];

const Certifications: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const openImagePopup = (image: string) => {
    setSelectedImage(image);
  };

  const closeImagePopup = () => {
    setSelectedImage(null);
  };

  return (
    <div className='  h-full'>
      <div className='text-left'>
        <h1 className='text-[2.5rem] font-bold'>Certifications</h1>
      </div>

      <div className="w-full h-full overflow-hidden">
        {/* <div className='flex flex-wrap space-x-12 text-center justify-center' > */}
        <div className='grid md:grid-cols-2  lg:grid-cols-3 grid-cols-1 gap-4 '>
          {ActivityData.map((activity) => (
            <div key={activity.id} className="max-w-sm">
              <div className="bg-gray-100 lg:h-[60vh]  md:[55vh] h-full shadow-lg rounded-lg  border-2 border-solid mx-auto border-slate-200 hover:shadow-xl hover:shadow-slate-400 relative">
                {/* Card Body */}
                <div className="p-4">
                  <Image
                    alt="Card background"
                    className="object-cover rounded-xl"
                    src={activity.image}
                    width={400}
                    height={200}
                  />

                       {/* Icon at Bottom-Right */}
                <button
                  className="absolute top-4 right-4 cursor-pointer text-white hover:bg-gray-600 bg-gray-400"
                  onClick={() => openImagePopup(activity.image)}
                >
                  <MdOpenWith size={24}/>
                  {/* <AiOutlineZoomIn size={24} /> */}
                </button>
                


                </div>



                {/* Card Header */}
                <div className="p-4">
                  <p className="text-xs uppercase font-bold text-gray-800">{activity.organizationName}</p>
                  <small className="text-gray-600">{activity.year}</small>
                  <h4 className="font-bold text-lg mt-1">{activity.title}</h4>
                </div>

           
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Popup Modal */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
          <div className="relative bg-white rounded-lg p-4 shadow-lg">
            <span
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
              onClick={closeImagePopup}
            >
              <IoIosCloseCircle className=' w-[2rem] h-[2rem]' />
            </span>
            <Image
              src={selectedImage}
              alt="Full-size image"
              width={800}
              height={600}
              className="rounded-lg"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Certifications;
