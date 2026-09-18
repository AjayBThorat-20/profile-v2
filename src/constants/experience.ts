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
  // ISO date strings (YYYY-MM-DD), used to compute years-of-experience
  // stats live instead of hand-maintaining them - endDate null means the
  // role is still ongoing ("Present" in the display duration string above).
  startDate: string;
  endDate: string | null;
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
      description: "Maintaining DevCompass, my open-source dependency-health CLI",
      hiddenDisc: "Hardened the remaining shell-exec call sites to execFile with argv arrays, added CodeQL and OpenSSF Scorecard scanning plus a release version-guard to CI, and shipped a migrate-syntax codemod engine with a one-command undo for auto-fix sessions — now on v4.1.8 with 50 published releases and a self-analyzed health score of 9.3/10",
    },
    // {
    //   id: 3,
    //   description: "MongoDB database connector map Int to long for Prisma",
    //   hiddenDisc: "This is a mapping issue in Prisma's object-relational model. The developer passes age and specifies its data type as int in the Prisma schema, but it is stored as BigInt (long) in MongoDB.",
    // },
  ];
  
 
  export const experienceData: readonly ExperienceItem[] = [
    {
      id: 3,
      name: "ICT Mumbai Research Foundation (Mumbai Biocluster)",
      title: "Junior Full Stack Developer",
      duration: "18 May 2026 - Present",
      startDate: "2026-05-18",
      endDate: null,
      companyUrl: "https://www.mumbaibiocluster.org/",
      techStack: "Next.js 16, TypeScript, Prisma ORM (adapter-pg), PostgreSQL, NextAuth v5, Razorpay, AWS S3, AWS EC2, Bluehost VPS, Redis, BullMQ, Tailwind CSS, shadcn/ui, Zod, Jest",
      details: [
        {
          id: 1,
          title: "overview",
          picture: "/Images/Experience/MBC/mbc.png",
          data: "Working as a Junior Full Stack Developer at Mumbai Biocluster (ICT Mumbai Research Foundation), a Section-8 nonprofit based at ICT Mumbai in Matunga. The organization operates a single-use cGMP facility and works to translate early-stage startup and academic innovations into clinical-stage biotechnology, supporting startups, academic institutions, MSMEs, and industry partners across cancer, rare disease, and biologics research. Within this role I am the sole full-stack developer building and maintaining three production platforms for the organization: IndiaPharmaHub (IPH), a pharma/biopharma outsourcing marketplace; Yantra, a lab-instrument-booking and sample-testing marketplace built on the same architecture; and an internal HRMS covering attendance, payroll, KPI reviews, and recruitment for the organization itself."
        },
        {
          id: 2,
          title: "responsibilities",
          picture: "/Images/Experience/MBC/mbc.png",
          data: {
            platformOwnership: [
              "Sole full-stack developer on three production Next.js platforms — authored 197 of the ~200 commits on IndiaPharmaHub, 125 of 125 commits on Yantra, and 77 of 77 commits on the internal HRMS — owning architecture, Prisma schema design, and feature delivery end-to-end from spec to deployment.",
              "Designed and evolved three independent PostgreSQL schemas covering identity verification, catalog/taxonomy, quotations, messaging, reviews, audit logging, notifications, and webhook events (IPH/Yantra, 50+ models each), plus attendance, payroll, KPI reviews, and recruitment (HRMS, 41 models)."
            ],
            backendAndIntegrations: [
              "Integrated Razorpay for subscriptions/billing, AWS S3 for file uploads with presigned URLs and a media-proxy pipeline that pre-shrinks oversized images server-side, NextAuth v5 for authentication, and nodemailer for transactional email.",
              "Built bulk data workflows on ExcelJS/xlsx for CSV/XLSX import and export (bulk product/account/instrument uploads with validation, duplicate prevention, and status/import history tracking), and PDF generation with pdf-lib.",
              "Implemented GST/PAN-based verification workflows so sellers, buyers, labs, and clients are vetted before they can transact on either platform."
            ],
            qualityAndTooling: [
              "Wrote a custom dependency-graph-based \"test-affected\" Jest runner (madge-based, resolves the tsconfig @/* alias) so CI only re-runs tests transitively impacted by a change instead of the full suite — backs 520+ colocated test files on IndiaPharmaHub.",
              "Enforced canonical Tailwind utility conventions (rounded-md over arbitrary values, has-[] selectors, standard easing) across both codebases for design-system consistency.",
              "Made deliberate build-vs-revert calls under sole ownership — see the Yantra Custom Study note below — rather than shipping a duplicate feature path."
            ],
            infrastructure: [
              "Deploy and manage the platforms across AWS EC2 and Bluehost VPS instances, handling server setup, environment configuration, and release deployment myself alongside the application code."
            ]
          }
        },
        {
          id: 3,
          title: "project 1: IndiaPharmaHub (IPH)",
          picture: "/Images/Experience/MBC/mbc.png",
          data: {
            overview: [
              "A B2B marketplace connecting verified pharma, biopharma, and life-sciences sellers and buyers across India for outsourcing R&D, manufacturing, testing, packaging, regulatory support, and technology needs.",
              "One account can hold a Seller profile, a Buyer profile, or both, with GST/PAN verification before a user can transact.",
              "The platform received the India Innovation Catalyst Award from the DBT Secretary of India at #Biologics2025, before this rebuild. I rebuilt the application after joining in 2026 and am its sole developer (197 of 200 commits)."
            ],
            legacyPlatform: [
              "Inherited a two-part codebase: an Express and Sequelize REST API with Socket.io chat (about 13,500 lines of JavaScript, 32 models, no automated tests) and a separate Next.js Pages Router client (about 44,000 lines) that called it over HTTP.",
              "Audit findings: an environment file committed to the client repository, auto-increment IDs that made records guessable, no caching, rate limiting, or audit log, and email-only notifications.",
              "The single EC2 server ran out of disk space and crashed; I restored it and assigned an Elastic IP."
            ],
            newArchitecture: [
              "Replaced the two-service setup with one TypeScript application on Next.js 16 (App Router): 49 server-action modules, 120 library modules, and 12 API routes for uploads, webhooks, real-time events, health checks, and cron jobs.",
              "Moved from Sequelize to Prisma 7 (adapter-pg) on PostgreSQL with 52 models, cuid identifiers in place of auto-increment IDs, and the pg_trgm extension for typo-tolerant search.",
              "Replaced JWT middleware with NextAuth v5 sessions, with admin roles re-checked against the database, and split identity into User, Admin, SellerProfile, and BuyerProfile.",
              "Added Redis for caching with TTL jitter, a Lua-script rate limiter, and pub/sub behind server-sent events, which replaced Socket.io for chat and notifications.",
              "Moved file storage to AWS SDK v3 with presigned URLs, magic-byte upload validation, and a media proxy that resizes large images before next/image serves them.",
              "Added idempotent Razorpay webhook handling, plan-based limits, and cron routes for plan reminders, onboarding reminders, and an email queue."
            ],
            newFeatures: [
              "Guest browsing of products, services, and providers without login, with in-place sign-up, SEO metadata, JSON-LD, sitemap, and llms.txt.",
              "Role-specific dashboards with recharts trend charts, a seller Leads page, and hot or cold lead scoring based on recency, pipeline stage, buyer intent, and deal size.",
              "Typo-tolerant search, location-based ranking (same city, then state, then country), and plan-based limits on directory results.",
              "Wishlist, product and service reviews with rating aggregation, and quotation cards shown inside chat threads.",
              "Pricing plans with a super-admin switch to enable or disable pricing enforcement per role.",
              "Admin tools: audit log, support tickets, product approval workflow with seller review of admin-added products, bulk approve, reject, and delete, and admin-onboarded accounts.",
              "Excel bulk upload for products, services, categories, product structures, locations, and accounts, with cascading dropdowns, per-row validation, and downloadable error reports.",
              "Account deletion that archives records to separate tables first, and disposable-email blocking at sign-up."
            ],
            technicalHighlights: [
              "Wrote a re-runnable migration script that moved the legacy Sequelize database into the new schema and remapped S3 files to a new key scheme, with compare and backfill scripts to find duplicate or dangling records.",
              "Fixed security issues found in code review, including stored XSS through SVG uploads, IDOR on support tickets, and non-atomic payment and approval updates.",
              "Reduced layout shift on the products page (CLS 0.112 to 0.006) and removed about 150 KB of unused JavaScript through code splitting.",
              "Built a Jest runner that runs only the tests affected by a change, using the import dependency graph; the repository has 520+ test files."
            ]
          }
        },
        {
          id: 4,
          title: "project 2: Yantra",
          picture: "/Images/Experience/MBC/mbc.png",
          data: {
            overview: [
              "A sister marketplace to IndiaPharmaHub: connects Clients who need lab instrument bookings and sample/analytical testing with verified Labs, with Admin mediating every interaction — Client and Lab never see each other's identity directly.",
              "Sole developer on this platform: 125 of 125 commits, full ownership of schema, RBAC, and every feature shipped."
            ],
            features: [
              "Granular, database-driven RBAC (Permission, PermissionGroup, Role models) replacing blanket admin/user role checks across the app.",
              "Instrument catalog and booking with availability blocks, sample intake and tracking, a quotation-to-purchase-order-to-study-plan pipeline, invoicing, shipments, and lab reports with separate client-facing and internal-traceability renders from one underlying record.",
              "Admin-in-the-middle messaging (CLIENT_ADMIN / LAB_ADMIN / SUPPORT thread types, deliberately no direct client-lab channel), escalations, reviews, wishlist, and notifications.",
              "URL-synced list filters (search/status/date/category/sort/page), lab-catalog bulk-upload templates generated as real .xlsx files, and error boundaries with loading fallbacks to stop blank-screen navigations."
            ],
            technicalHighlights: [
              "Built a full AI-powered \"Custom Study\" intake subsystem (new thread type, intake model, assistant stub, admin queue) and then deliberately reverted it the same day after determining the existing quotation-to-study-plan pipeline already covered the same use case — verified zero database rows referenced the removed schema before dropping it, rather than leave two competing concepts in the app.",
              "Iteratively simplified the Instrument model as the pricing-tier design matured — removed fixed pricing, structure, subcategory, and capacity/location fields — each change backed by its own Prisma migration.",
              "Replaced full-page refreshes with targeted component updates and added granular RBAC enforcement in place of blanket admin checks."
            ]
          }
        },
        {
          id: 5,
          title: "project 3: Internal HRMS",
          picture: "/Images/Experience/MBC/mbc.png",
          data: {
            overview: [
              "An internal HR management system built for Mumbai Biocluster itself, not client-facing: attendance, leave, payroll, KPI reviews, recruitment, assets, announcements, training, and company policies in one platform.",
              "Sole developer: 77 of 77 commits, 41 Prisma models spanning attendance/regularization, leave balances, payroll runs and salary slips, KPI cycles/assignments/reviews, job postings/applications/interviews, assets, internal chat, tasks, reimbursements, and job referrals."
            ],
            features: [
              "Attendance with session tracking and a regularization workflow, leave balances, payroll runs with generated salary slips, and an audit log across sensitive actions.",
              "A full recruitment pipeline (job postings, applications, interview scheduling) and a KPI cycle system with templates, assignments, reviews, and comments.",
              "Internal chat with group messaging and file sharing, task assignment with comments, company announcements with read-tracking, training enrollment, and a company-policy/holiday calendar with read-tracking.",
              "Asset management with an asset log, reimbursement requests, and an employee job-referral flow."
            ],
            technicalHighlights: [
              "Drove a sustained frontend performance pass: code-split non-default tabs across KPI, Reports, Settings, and Policies; disabled Next.js Link prefetch on always-visible nav and dashboard links; inlined critical CSS to remove a render-blocking stylesheet request.",
              "Seeded the root layout, dashboard cards, and multiple context providers server-side to kill client-side loading flashes, and fixed a session-loading race that was wiping SSR-hydrated context data.",
              "Closed SSE connections on pagehide so pages qualify for the back/forward cache, and gave SSE reconnects their own rate-limit bucket separate from normal API traffic.",
              "Used BullMQ and node-cron for background jobs (payroll processing, notifications) alongside Redis-backed caching."
            ]
          }
        },
        {
          id: 6,
          title: "conclusion",
          picture: "/Images/Experience/MBC/mbc.png",
          data: "Since joining Mumbai Biocluster, I've been the sole full-stack developer behind three production platforms built for ICT Mumbai Research Foundation — IndiaPharmaHub, a pharma outsourcing marketplace; Yantra, a lab-instrument-booking and sample-testing marketplace; and an internal HRMS running the organization's own attendance, payroll, and recruitment operations. Owning all three end-to-end has meant designing independent Postgres/Prisma schemas, wiring payments, storage, and verification workflows, building my own CI test tooling, driving a real frontend performance pass, and making the judgment calls that come with sole ownership — including building then deliberately reverting a redundant AI subsystem once a simpler existing flow was shown to already solve the problem. The role has deepened my experience designing multi-sided, trust-and-verification-driven marketplaces and internal line-of-business systems alike, both at production scale."
        }
      ],
      detailPageUrl: "/details"
    },
    {
  id: 2,
  name: "Renewalytics Services Pvt. Ltd.",
  title: "Junior Full Stack Developer",
  duration: "18 March 2025 - 09 March 2026",
  startDate: "2025-03-18",
  endDate: "2026-03-09",
  companyUrl: "https://www.renewalytics.in/",
  techStack: "Next.js, Prisma, Tailwind CSS, PostgreSQL, MySQL, MongoDB, Redis, BullMQ, Highcharts, shadcn/ui, Zoho Email, Digital Ocean, PM2, Nginx",
  details: [
    {
      id: 1,
      title: "overview",
      picture: "/Images/Experience/Renewalytics/renewalyticslogo.png",
      data: "Renewalytics Services Pvt. Ltd. is a New Delhi-based company specializing in AI-powered renewable energy forecasting and grid management solutions. The company leverages advanced ML/DL models, weather intelligence, and digital twin technology to help integrate solar, wind, and hybrid renewable energy projects seamlessly into the grid while ensuring DSM compliance and optimal performance. Renewalytics manages 3.22+ GW of capacity with >92% forecast accuracy, providing 24*7 RTC support across 13+ state networks covering 34+ total sites with 45+ compliance automation processes. Key clients include TrueRe, Dalmia, ReNew, Refex, UPC Renewables, SEIT, Sembcorp, Avaada, SPRNG, ACME, Amplus, LR Energy, Ampin, and Gentari."
    },
    {
      id: 2,
      title: "responsibilities",
      picture: "/Images/Experience/Renewalytics/dashboard.png",
      data: {
        clientEngagement: [
          "Connect with clients to understand their requirements and translate them into technical solutions.",
          "Act as a bridge between technical teams and clients, ensuring clear communication and requirement alignment.",
          "Work with major renewable energy clients including TrueRe, Dalmia, ReNew, Refex, UPC Renewables, SEIT, Sembcorp, Avaada, SPRNG, ACME, Amplus, LR Energy, Ampin, and Gentari to deliver customized forecasting and grid management solutions."
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
          "Managed 34+ plants across 13+ state networks with automated data fetching at 1-minute, 5-minute, and 15-minute intervals based on client data formats.",
          "Developed robust backend scripts for data collection from multiple SFTP, FTP, and API sources.",
          "Implemented dual database architecture using MySQL and MongoDB for efficient data management.",
          "Set up automated database backup systems and log management to optimize server resources and ensure data safety.",
          "Regularly upgraded APIs to incorporate new requirements, enhance performance, and adapt to evolving business needs.",
          "Achieved >92% forecast accuracy across all managed sites with 24*7 RTC support and 45+ compliance automation processes."
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
      data: "At Renewalytics, I've gained invaluable experience in the renewable energy sector, working on mission-critical applications that manage 3.22+ gigawatts of clean energy capacity across 34+ sites in 13+ state networks with >92% forecast accuracy and 24*7 RTC support. The role has strengthened my skills in full-stack development, performance optimization, complex data processing, and client communication. Working on challenging projects like ExcelFlow taught me how to solve complex technical problems under tight deadlines, while managing FNS—the company's flagship product with 45+ compliance automation processes—gave me end-to-end ownership experience. The exposure to renewable energy domain, combined with hands-on experience in infrastructure management, database administration, and multi-database architecture, has significantly enhanced my technical expertise and problem-solving abilities in real-world production environments."
    }
  ],
  detailPageUrl: "/details"
},
    {
      id: 1,
      name: "ShypBUDDY PVT. LTD",
      title: "Full-Stack Developer Intern",
      duration: "March 18 - September 18, 2024 (6 Months)",
      startDate: "2024-03-18",
      endDate: "2024-09-18",
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
    }
  
  ] as const;
  
export const REVIEW_FORM_URL = "https://docs.google.com/forms/d/e/1FAIpQLSeVzKnrECCWJsOFQDXfsKpV34-zO5s16ZvopHoTXbQDQuubrw/viewform?usp=header";