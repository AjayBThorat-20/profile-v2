export interface ActivityItem {
    id: number;
    description: string;
    hiddenDisc: string;
  }
  
  export interface ExperienceItem {
    id: number;
    role: string;
    duration: string;
    company: string;
    companyUrl: string;
    teckStack: string;
    sideCardDescription: string;
    description: {
      id: number;
      desc: string;
      picture: string;
    }[];
    detailPageUrl: string;
  }
  
  // 🔹 Currently Working On Data
  export const currentlyWorkingOnData: ActivityItem[] = [
    {
      id: 1,
      description: "Analyzed and documented data behavior patterns in Instagram's user recommendation system, reporting findings to Meta's security team (Case #122106229448589400)",
      hiddenDisc: "I submitted a report to Meta, highlighting an anonymous behavior pattern I discovered in Instagram's system. Additionally, I recommended leveraging this behavior as a potential feature to enhance user engagement on the platform.",
    },
    {
      id: 2,
      description: "Working on personal web application",
      hiddenDisc: "Working on theme, Description page of work history",
    },
    {
      id: 3,
      description: "MongoDB database connector map Int to long for Prisma",
      hiddenDisc: "This is a mapping issue in Prisma's object-relational model. The developer passes age and specifies its data type as int in the Prisma schema, but it is stored as BigInt (long) in MongoDB.",
    },
  ];
  
  // 🔹 Experience Data
  export const experienceData: readonly ExperienceItem[] = [
    {
      id: 1,
      role: "Full Stack Developer Intern",
      duration: "18 March - 18 September 2024 (6 Months)",
      company: "ShypBUDDY PVT. LTD",
      companyUrl: "https://shypbuddy.net/",
      teckStack: "Next.js, Supabase, Prisma, Clerk, Tailwind CSS, Node.js",
      sideCardDescription: "Detailed side card description here.",
      description: [
        { id: 1, desc: "Data 1 description", picture: "/Images/Experience/ShypBUDDY/logo.jpeg" },
        { id: 2, desc: "BuddyShield data", picture: "/Images/Experience/ShypBUDDY/buddyshield.png" },
        { id: 3, desc: "BuddyShield data", picture: "/Images/Experience/ShypBUDDY/AjayShupBUDDY.jpeg" },
      ],
      detailPageUrl: "/details",
    },
  ] as const;
  