export interface ActivityItem {
    id: number;
    description: string;
    hiddenDisc: string;
  }
  
  // export interface ExperienceItem {
  //   id: number;
  //   role: string;
  //   duration: string;
  //   company: string;
  //   companyUrl: string;
  //   teckStack: string;
  //   sideCardDescription: string;
  //   description: {
  //     id: number;
  //     desc: string;
  //     picture: string;
  //   }[];
  //   detailPageUrl: string;
  // }
  

  
  export type ExperienceItem = {
    id: number;
    name: string;
    title: string;
    duration: string;
    companyUrl: string;
    techStack: string;
    details: ExperienceDetail[];
    detailPageUrl: string;
  };
  
  type ExperienceDetail = {
    id: number;
    title: string;
    picture: string;
    data: string | ExperienceResponsibilities;
  };
  
  type ExperienceResponsibilities = {
    coreDevelopment: string[];
    ecommerceIntegration: string[];
    featureDevelopment: string[];
    projectLeadership: string[];
  };
  
  // 🔹 Currently Working On Data
  export const currentlyWorkingOnData: ActivityItem[] = [
    // {
    //   id: 1,
    //   description: "Analyzed and documented data behavior patterns in Instagram's user recommendation system, reporting findings to Meta's security team (Case #122106229448589400)",
    //   hiddenDisc: "I submitted a report to Meta, highlighting an anonymous behavior pattern I discovered in Instagram's system. Additionally, I recommended leveraging this behavior as a potential feature to enhance user engagement on the platform.",
    // },
    {
      id: 1,
      description: "Working on personal web application",
      hiddenDisc: "Working on Navigation Bar components and responsiveness of all components",
    },
    // {
    //   id: 3,
    //   description: "MongoDB database connector map Int to long for Prisma",
    //   hiddenDisc: "This is a mapping issue in Prisma's object-relational model. The developer passes age and specifies its data type as int in the Prisma schema, but it is stored as BigInt (long) in MongoDB.",
    // },
  ];
  
 
  export const experienceData: readonly ExperienceItem[] = [
    {
      id: 1,
      name: "ShypBUDDY PVT. LTD",
      title: "Full-Stack Developer Intern",
      duration: "March 18 - September 18, 2024 (6 Months)",
      companyUrl: "https://shypbuddy.net/",
      techStack: "Next.js, Supabase, Prisma, Clerk, Tailwind CSS, Node.js",
      details: [
        {
          id: 1,
          title: "overview",
          picture: "/Images/Experience/ShypBUDDY/logo.jpeg",
          data: "ShypBUDDY PVT. LTD. is a Mumbai-based e-commerce shipping solutions provider. It offers seamless order management, real-time syncing, and flexible shipping options for businesses across India."
        },
        {
          id: 2,
          title: "responsibilities",
          picture: "/Images/Experience/ShypBUDDY/buddyshield.png",
          data: {
            coreDevelopment: [
              "Led the development of Next.js/React-based user and admin panels.",
              "Implemented Clerk Authentication for secure user management.",
              "Optimized PostgreSQL database schemas for better performance and scalability."
            ],
            ecommerceIntegration: [
              "Developed a Shopify integration for automated order processing.",
              "Integrated multiple 3PL APIs including Delhivery, Postal Pin code, DTDC, Ecom, Ekart, Shadowfax, Xpressbees, and Amazon Transportation Services for efficient shipment management.",
              "Engineered automated workflows to synchronize logistics and e-commerce operations seamlessly."
            ],
            featureDevelopment: [
              "Implemented core platform components such as: Order Creation (Forward/Reverse), Rate Calculator, Warehouse Management, Admin Management, Rate Master, High Shipping, MIS Reports, BUDDYSHIELD, and Shopify Channel Integration.",
              "Designed responsive UI/UX using Tailwind CSS and Bootstrap, ensuring cross-device compatibility.",
              "Integrated Cashfree API for KYC processing and Pincode Serviceability to improve logistics accuracy.",
              "Developed an FAQ component with Fuse.js search functionality, enhancing user experience."
            ],
            projectLeadership: [
              "Led cross-functional teams in developing integrated solutions and optimizing system performance based on user feedback.",
              "Conducted bug resolution in the legacy PHP system.",
              "Managed and implemented 16-day sprint cycles, ensuring iterative development and continuous improvement.",
              "Utilized GitHub for version control and ClickUp for project management, streamlining development workflows."
            ]
          }
        },
        {
          id: 3,
          title: "conclusion",
          picture: "/Images/Experience/ShypBUDDY/AjayShupBUDDY.jpeg",
          data: "During my internship at ShypBUDDY PVT. LTD, I gained extensive hands-on experience in full-stack development, API integration, database management, and agile methodologies. The fast-paced startup environment provided an opportunity to work on real-world challenges, collaborate with cross-functional teams, and contribute to scalable, high-impact solutions in logistics and e-commerce. This experience has significantly strengthened my skills in building robust and efficient web applications while adapting to industry best practices."
        }
      ],
      detailPageUrl: "/details"
    }
  ] as const;
  












  // export const experienceData: readonly ExperienceItem[] = [
  //   {
  //     id: 1,
  //     role: "Full Stack Developer Intern",
  //     duration: "18 March - 18 September 2024 (6 Months)",
  //     company: "ShypBUDDY PVT. LTD",
  //     companyUrl: "https://shypbuddy.net/",
  //     teckStack: "Next.js, Supabase, Prisma, Clerk, Tailwind CSS, Node.js",
  //     sideCardDescription: "Detailed side card description here.",
  //     description: [
  //       { id: 1, desc: "Data 1 description", picture: "/Images/Experience/ShypBUDDY/logo.jpeg" },
  //       { id: 2, desc: "BuddyShield data", picture: "/Images/Experience/ShypBUDDY/buddyshield.png" },
  //       { id: 3, desc: "BuddyShield data", picture: "/Images/Experience/ShypBUDDY/AjayShupBUDDY.jpeg" },
  //     ],
  //     detailPageUrl: "/details",
  //   },
  // ] as const;
  