import React from 'react'


export default function WelcomeToExperience() {
  return (
    <div className='w-full text-center space-y-6 mx-auto'>
        <h1 className='text-6xl font-bold'>
         Welcome to My Journey 
        </h1>
        {/* <div className="bg-gray-100 p-5 rounded-lg shadow-md"> */}
  <ul className="text-xl list-disc list-inside text-justify md:text-left md:w-8/12 mx-auto">
    <li>📌 <strong>Milestones Achieved:</strong> A glimpse into the challenges I’ve conquered and the goals I’ve surpassed.</li>
    <li>💡 <strong>Ideas Realized:</strong> Creative solutions and impactful projects that shaped my growth.</li>
    <li>🎯 <strong>Skills Honed:</strong> The tools and expertise I bring to the table.</li>
  </ul>
{/* </div> */}

        {/* <p className='text-xl  text-justify indent-14'>
            Explore the journey of my creativity and technical expertise through the projects showcased here. Each project represents a blend of innovation, problem-solving, and dedication to building impactful solutions. Whether it’s crafting seamless user experiences, developing efficient systems, or implementing cutting-edge technologies, you'll find a glimpse of my passion for excellence.
        </p> */}
        <p  className='text-2xl font-bold text-justify mx-auto w-full md:w-8/12'>
        Explore how these experiences come together to tell a story of growth, innovation, and success.  
            </p>
      
    </div>
  )
}
