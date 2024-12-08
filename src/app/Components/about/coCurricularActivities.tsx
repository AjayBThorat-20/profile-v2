// "use client";

// import React from "react";

// const ActivityData = [
//   {
//     id: 1,
//     Name: "Ignite and Concat",
//     description: "A program to foster collaboration and innovation.",
//   },
//   {
//     id: 2,
//     Name: "ISR and DLLE (Social Activity)",
//     description: "Community engagement activities promoting social responsibility.",
//   },
//   {
//     id: 3,
//     Name: "SkillFull Netizen",
//     description: "A workshop on becoming skilled and responsible digital citizens.",
//   },
//   {
//     id: 4,
//     Name: "Initiated and implemented 16-day sprints during the internship",
//     description: "Streamlined project timelines through efficient sprint planning.",
//   },
// ] as const;

// const CoCurricularActivities: React.FC = () => {
//   return (
//     <div className="mt-10 h-full px-4 ">
//       {/* Header */}
//       <div className="text-left mb-8">
//         <h1 className="text-[2rem] md:text-[2.5rem] font-bold">
//           Co-Curricular Activities
//         </h1>
//       </div>

//       {/* Activities Grid */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4  gap-4 ">
//         {ActivityData.map((activity) => (
//           <div
//             key={activity.id}
//             className=" bg-gray-100 rounded-xl shadow-lg overflow-hidden p-6 mx-auto w-full"
//           >
//             <h3 className="text-black font-semibold text-lg md:text-xl">
//               {activity.Name}
//             </h3>
//             <p className="mt-2 text-sm md:text-base text-black">
//               {activity.description}
//             </p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default CoCurricularActivities;






"use client";

import React from "react";

const ActivityData = [
  {
    id: 1,
    Name: "Ignite and Concat",
    description: "During my bachelor's studies at *Patkar Varde College, Goregaon West, Mumbai, I actively contributed to my college's event team, showcasing my organizational and leadership skills. I was a proud member of the **marketing team* for two prominent events: *Concat, an intra-college event organized by the Computer Science Department, and **Ignite*, an inter-college event collaboratively hosted by the Computer Science and Information Technology Departments. My primary role involved spearheading efforts to secure sponsorships, financial support, and partnerships for these events. By collaborating with businesses and organizations, I successfully brought in funds, promotional materials, and sponsorship deals that significantly elevated the events' scale and success. This experience honed my communication, teamwork, and planning skills, while also fostering a strong sense of responsibility.",
  },
  {
    id: 2,
    Name: "ISR and DLLE (Social Activity)",
    description: "During my academic journey, both at *Patkar Varde College, Goregaon West, Mumbai, during my bachelor's studies and at **Hiray College of Computer Applications* during my master's, I actively participated in various *social activities* through *ISR (Institutional Social Responsibility)* and *DLLE (Department of Lifelong Learning and Extension)* initiatives. These activities included *tree plantation drives, **beach cleaning campaigns*, and programs aimed at empowering senior citizens by teaching them essential computer skills. These experiences not only allowed me to contribute positively to society but also enhanced my sense of responsibility, teamwork, and commitment to making a meaningful impact.",
  },
  {
    id: 3,
    Name: "SkillFull Netizen",
    description: "As part of my co-curricular activities at *Patkar Varde College, Goregaon West, Mumbai, I participated in the **SkillFull Netizen* program from November 18, 2019, to November 28, 2019. This 10-day program focused on helping senior citizens learn the basics of computer usage. I had the opportunity to assist *Ms. Mariam*, a 52-year-old participant, as she navigated through various digital tasks. I guided her in creating and sending emails, using Microsoft Word, Excel, and PowerPoint, exploring Google search, working with Paint, installing software, and understanding basic hardware components. This experience strengthened my communication and teaching skills while also allowing me to contribute to helping senior citizens become more comfortable with technology.",
  },
  {
    id: 4,
    Name: "Initiated and implemented 16-day sprints during the internship",
    description: "During a 16-day sprint from September 2nd to September 17th at *ShypBUDDY India Pvt Ltd, I made significant contributions while gaining valuable experience with **Agile methodology* in a startup environment. Leading the team, I focused on achieving key objectives, including designing efficient and user-friendly *UI/UX*, integrating third-party logistics systems, and optimizing the overall system. I also performed logic-building tasks, created database schemas, and wrote backend logic to ensure seamless functionality. Additionally, I optimized CRUD operations to enhance database performance and reduce request loads. Throughout this sprint, I streamlined project timelines through efficient sprint planning, which enhanced team productivity and project execution. These contributions showcased my technical expertise, leadership abilities, and adaptability in delivering impactful solutions within a structured Agile framework.",
  },
] as const;

const CoCurricularActivities: React.FC = () => {
  return (
    <div className="mt-10 h-full px-4 ">
      {/* Header */}
      <div className="text-left mb-8">
        <h1 className="text-[2rem] md:text-[2.5rem] font-bold">
          Co-Curricular Activities
        </h1>
      </div>

      {/* Activities Grid */}
      <div className="grid grid-cols-1 gap-8 ">
        {ActivityData.map((activity) => (
          <div
            key={activity.id}
            className=" bg-gray-100 rounded-xl shadow-lg overflow-hidden p-6 mx-auto w-full"
          >
            <h3 className="text-black font-semibold text-lg md:text-xl">
              {activity.Name}
            </h3>
            <p className="mt-2 text-sm md:text-base text-black justify-center text-justify indent-8">
              {activity.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CoCurricularActivities;