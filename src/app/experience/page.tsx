import React from 'react'
import WelcomeToExperience from '../Components/experience/welcomeToExperience'
import Internship from '../Components/experience/internship'
import CurrentlyWorkingOn from '../Components/experience/currentlyWorkingOn'
// import CurrentlyWorkingOn from './currentlyWorkingOn'

export default function page() {
  return (
    <div className="text-center justify-center text-dark w-full h-screen lg:px-32 overflow-y-auto  overflow-x-hidden hide-scrollbar py-10 pb-40 px-4">

<div className='animate-slide-up '>


      <div className="w-full h-fit text-center items-center justify-center space-y-6 ">


<WelcomeToExperience/>
<Internship/>
<CurrentlyWorkingOn/>


</div>







</div>
      
</div>


  )
}
