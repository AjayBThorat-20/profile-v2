export interface ActivityItem {
  id: number;
  description: string;
  hiddenDisc: string;
}

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
  data: string | ExperienceDataStructure;
};

type ExperienceDataStructure = {
  [key: string]: string[];
};

// Optional: You can still define specific types for better intellisense
export type ShypBuddyResponsibilities = {
  coreDevelopment: string[];
  ecommerceIntegration: string[];
  featureDevelopment: string[];
  projectLeadership: string[];
};

export type RenewalyticResponsibilities = {
  clientEngagement: string[];
  fullStackDevelopment: string[];
  infrastructureManagement: string[];
  integrations: string[];
};

export type FNSProjectData = {
  overview: string[];
  keyAchievements: string[];
  features: string[];
  technicalHighlights: string[];
};

export type ExcelFlowProjectData = {
  overview: string[];
  technicalChallenges: string[];
  performanceOptimizations: string[];
  features: string[];
  roleContribution: string[];
};

export type RealSyncProjectData = {
  overview: string[];
  features: string[];
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
          picture: "/Images/Experience/ShypBUDDY/responsibilities.png",
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
          picture: "/Images/Experience/ShypBUDDY/conclusion.png",
          data: "During my internship at ShypBUDDY PVT. LTD, I gained extensive hands-on experience in full-stack development, API integration, database management, and agile methodologies. The fast-paced startup environment provided an opportunity to work on real-world challenges, collaborate with cross-functional teams, and contribute to scalable, high-impact solutions in logistics and e-commerce. This experience has significantly strengthened my skills in building robust and efficient web applications while adapting to industry best practices."
        }
      ],
      detailPageUrl: "/details"
    },
{
  id: 2,
  name: "Renewalytics Services Pvt. Ltd.",
  title: "Junior Full Stack Developer",
  duration: "18 March 2025 - Present",
  companyUrl: "https://www.renewalytics.in/",
  techStack: "Next.js, Prisma, Tailwind CSS, PostgreSQL, MySQL, MongoDB, Redis, BullMQ, Highcharts, shadcn/ui, Zoho Email, Digital Ocean, PM2, Nginx",
  details: [
    {
      id: 1,
      title: "overview",
      picture: "/Images/Experience/Renewalytics/renewalyticslogo.png",
      data: "Renewalytics Services Pvt. Ltd. is a New Delhi-based company specializing in AI-powered renewable energy forecasting and grid management solutions. The company leverages advanced ML/DL models, weather intelligence, and digital twin technology to help integrate solar, wind, and hybrid renewable energy projects seamlessly into the grid while ensuring DSM compliance and optimal performance."
    },
    {
      id: 2,
      title: "responsibilities",
      picture: "/Images/Experience/Renewalytics/dashboard.png",
      data: {
        clientEngagement: [
          "Connect with clients to understand their requirements and translate them into technical solutions.",
          "Act as a bridge between technical teams and clients, ensuring clear communication and requirement alignment."
        ],
        fullStackDevelopment: [
          "Developed and maintained 3 major full-stack applications using Next.js, Prisma, Tailwind CSS, PostgreSQL, MySQL, and MongoDB.",
          "Took complete ownership of application development lifecycle from requirement gathering to deployment.",
          "Designed and implemented responsive UI/UX components using shadcn/ui and Tailwind CSS ensuring cross-device compatibility.",
          "Implemented role-based access control (RBAC) systems across all applications for secure user management."
        ],
        infrastructureManagement: [
          "Managed server infrastructure using Digital Ocean, PM2, and Nginx.",
          "Monitored system logs and ensured optimal server performance and uptime.",
          "Set up and managed cron jobs for automated data fetching and processing tasks.",
          "Implemented automated database backup strategies for PostgreSQL, MySQL, and MongoDB to ensure data integrity and disaster recovery.",
          "Regularly cleared MongoDB logs and optimized storage to manage limited server resources efficiently.",
          "Optimized APIs and database queries for improved application performance."
        ],
        integrations: [
          "Integrated Zoho Email API for automated email notifications and alerts.",
          "Developed scripts to fetch data from multiple sources including SFTP, FTP, and various client APIs.",
          "Implemented satellite data fetching from FTP servers for DGR (Distributed Generation Resources) integration."
        ]
      }
    },
    {
      id: 3,
      title: "project 1: FNS (Forecasting & Scheduling Platform)",
      picture: "/Images/Experience/Renewalytics/fns.png",
      data: {
        overview: [
          "Company's flagship subscription-based product managing 3.22+ GW of renewable energy capacity.",
          "Handles solar, wind, and hybrid plants with STU (State Transmission Utility) and CTU (Central Transmission Utility) classifications.",
          "Led the complete revamp of the FNS platform using Context API for state management, shadcn/ui for modern UI components, and Highcharts for data visualization."
        ],
        keyAchievements: [
          "Improved application performance by 80% through implementation of caching, memoization, and Context API optimization.",
          "Managed 30+ plants with automated data fetching at 1-minute, 5-minute, and 15-minute intervals based on client data formats.",
          "Developed robust backend scripts for data collection from multiple SFTP, FTP, and API sources.",
          "Implemented dual database architecture using MySQL and MongoDB for efficient data management.",
          "Set up automated database backup systems and log management to optimize server resources and ensure data safety.",
          "Regularly upgraded APIs to incorporate new requirements, enhance performance, and adapt to evolving business needs."
        ],
        features: [
          "Replaced old table-based data displays with interactive Highcharts visualizations to show differences between manual and model forecast data.",
          "Built modern, accessible UI components using shadcn/ui component library for consistent design system.",
          "Implemented role-based access control for operations and ML teams.",
          "Created automated report generation system for plant performance calculations.",
          "Developed features to support smooth operations for both operations teams and ML teams.",
          "Built comprehensive dashboards with Highcharts for real-time data visualization and trend analysis.",
          "Designed intuitive interfaces for managing DGR data and plant-specific calculations.",
          "Enhanced and upgraded existing APIs to accommodate new client requirements and improve system functionality."
        ],
        technicalHighlights: [
          "Utilized Highcharts for advanced data visualization including time-series analysis, comparative charts, and performance metrics.",
          "Leveraged shadcn/ui components for building responsive, accessible, and visually consistent user interfaces.",
          "Implemented Context API for efficient state management across the application.",
          "Established database maintenance routines including regular backups and MongoDB log rotation to manage storage constraints.",
          "Iteratively upgraded APIs to support new features, improve performance, and meet changing client specifications."
        ]
      }
    },
    {
      id: 4,
      title: "project 2: ExcelFlow",
      picture: "/Images/Experience/Renewalytics/excelflow.png",
      data: {
        overview: [
          "Client-based project managing data from 33 renewable energy plants (solar and wind).",
          "Most challenging project requiring rapid development to meet tight client deadlines.",
          "Tech stack: Next.js, PostgreSQL, Redis, BullMQ, Zoho Email integration."
        ],
        technicalChallenges: [
          "Processed large XLSB files (minimum 15MB) uploaded by plant zonal heads, with each file containing 16+ sheets.",
          "Handled inconsistent data formats across sheets with different attribute names for similar data.",
          "Dealt with varying date formats across different sheets requiring intelligent date parsing.",
          "Implemented binary search algorithm combined with date indexing (checking every 100th index) to efficiently locate target date data in large files.",
          "Managed storage limitations through efficient database design and regular maintenance including backups and log cleanup."
        ],
        performanceOptimizations: [
          "Implemented parallel sheet processing using BullMQ for fast data scraping and processing.",
          "Created plant-specific configuration files for XLSX sheet formats, making error handling and debugging easier.",
          "Utilized PostgreSQL for efficient storage and retrieval of processed data.",
          "Leveraged Redis for caching and improving response times.",
          "Optimized database storage through automated backup schedules and log rotation strategies."
        ],
        features: [
          "Generated 32+ notifications per plant based on processed data.",
          "Developed separate calculation logic and reports for solar and wind plants.",
          "Created multiple report types for solar plants with plant-specific calculation logic.",
          "Implemented automated email alerts and reports via Zoho Email integration.",
          "Built Highcharts dashboards for site analysis, plant analysis, plant-level and inverter-level comparative analysis.",
          "Integrated satellite data fetching from FTP during DGR upload process.",
          "Matched Excel calculations with code output to ensure accuracy against client-provided references.",
          "Implemented authentication, verification, and password reset functionality.",
          "Designed responsive UI for optimal user experience across devices."
        ],
        roleContribution: [
          "Played a key role in both UI/UX design and backend calculation implementation.",
          "Managed end-to-end development from data scraping to report generation and notification delivery.",
          "Established database maintenance practices to ensure system reliability within resource constraints."
        ]
      }
    },
    {
      id: 5,
      title: "project 3: RealSync",
      picture: "/Images/Experience/Renewalytics/realsync.png",
      data: {
        overview: [
          "Client-side project focused on user management and interface improvements."
        ],
        features: [
          "Implemented role-based access control (RBAC) system for secure user management.",
          "Created complete authentication system including user verification and forget password functionality.",
          "Designed and implemented UI/UX improvements for better user experience.",
          "Developed responsive interface ensuring compatibility across different devices and screen sizes."
        ]
      }
    },
    {
      id: 6,
      title: "conclusion",
      picture: "/Images/Experience/Renewalytics/team.png",
      data: "At Renewalytics, I've gained invaluable experience in the renewable energy sector, working on mission-critical applications that manage gigawatts of clean energy capacity. The role has strengthened my skills in full-stack development, performance optimization, complex data processing, and client communication. Working on challenging projects like ExcelFlow taught me how to solve complex technical problems under tight deadlines, while managing FNS—the company's flagship product—gave me end-to-end ownership experience. The exposure to renewable energy domain, combined with hands-on experience in infrastructure management, database administration, and multi-database architecture, has significantly enhanced my technical expertise and problem-solving abilities in real-world production environments."
    }
  ],
  detailPageUrl: "/details"
}
  ] as const;
  












