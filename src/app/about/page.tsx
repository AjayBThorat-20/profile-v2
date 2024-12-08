
import React from 'react'
import About from '../Components/about/about'
import Skills from '../Components/about/skills'
import Certifications from '../Components/about/certifications'
import CoCurricularActivities from '../Components/about/coCurricularActivities'
import Education from '../Components/about/education'

export default function page() {
  return (
    <div className="text-center justify-center text-dark w-full h-screen lg:px-32 overflow-y-auto  overflow-x-hidden hide-scrollbar md:py-10 pb-20 md:pb-40 px-4">

<div className='animate-slide-up '>


      <div className="w-full h-fit text-center items-center justify-center space-y-6 ">



<About/>


<Skills/>

<Certifications/>

<CoCurricularActivities/>


<Education/>

</div>







</div>
      
</div>


  )
}
