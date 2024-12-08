
import React from 'react'
import About from '../Components/about/about'
import Skills from '../Components/about/skills'
import Certifications from '../Components/about/certifications'
import CoCurricularActivities from '../Components/about/coCurricularActivities'
import Education from '../Components/about/education'
import CurrentlyWorkingOn from '../Components/experience/currentlyWorkingOn'

export default function page() {
  return (
    <div className="text-center justify-center text-dark w-full h-screen lg:px-32 overflow-y-auto  overflow-x-hidden hide-scrollbar md:py-10 pb-20 md:pb-40 px-4">

<div className='animate-slide-up '>


      <div className="w-full h-fit text-center items-center justify-center space-y-6 ">



      <section className="mb-10">    
<About/>
</section>



<section className="mb-10">
<Skills/>
</section>



{/* Certifications Section */}
<section className="mb-10">
        <Certifications />
      </section>

      {/* Currently Working On Section */}
      <section className="mb-10">
        <CoCurricularActivities />
      </section>



      <section className="mb-10">
<Education/>
</section>

</div>







</div>
      
</div>


  )
}
