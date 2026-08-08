export interface ProjectItem {
    id: number;
    title: string;
    url: string;
    techStack: string;
    discription: string;
    pictures: {
      id: number;
      picture: string;
    }[];
  }
  
  // 🔹 Projects Data
  export const projectsData: readonly ProjectItem[] = [
    {
      id: 1,
      title: "Crime Predict",
      url: "https://github.com/AjayBThorat-20/Crime-Predict",
      techStack: "React.js, Python, Django, SQLite3, JWT, RESTful APIs",
      discription:
        "I developed a full-stack web application focused on crime data analysis and visualization for law enforcement agencies in India. The platform implements robust security measures through JWT authentication, enabling secure user registration, login functionality, and password recovery systems. I designed and built separate administrative and user interfaces that facilitate CRUD operations for managing crime data, team information, and content management. Leveraging web scraping techniques, I automated the collection and integration of Indian legal acts data, ensuring the platform maintains an up-to-date legal reference database. Additionally, I integrated real-time crime news aggregation, making it a comprehensive solution for law enforcement officials. This system streamlines crime data management while providing actionable insights through data visualization, ultimately supporting more effective law enforcement operations.",
      pictures: [
        { id: 1, picture: "/Images/Projects/Crime_Predict/home.jpeg" },
        { id: 2, picture: "/Images/Projects/Crime_Predict/crime_data.jpeg" },
        { id: 3, picture: "/Images/Projects/Crime_Predict/news.jpeg" },
        { id: 4, picture: "/Images/Projects/Crime_Predict/indian_acts.jpeg" },
      ],
    },
    {
      id: 2,
      title: "LinkedIn Clone",
      url: "https://github.com/AjayBThorat-20/linkedin-clone",
      techStack: "Next.js, Node.js, MongoDB, Tailwind CSS, NextAuth.js, RESTful APIs",
      discription:
        "I engineered a comprehensive LinkedIn Clone, a professional networking platform that mirrors core functionalities of the original platform. The application features secure and streamlined user authentication implemented through Google OAuth using NextAuth.js, enabling seamless user access. I developed a robust backend supporting CRUD operations for dynamic content management, allowing users to create, edit, and manage their posts and professional profiles. The platform's responsive user interface, built with Tailwind CSS, offers both dark and light themes for enhanced user experience across devices. Key features include a personalized home feed, professional networking capabilities, an extensive course listing section, and an events page for professional gatherings. This project demonstrates my ability to create complex, scalable social platforms while maintaining security and user experience standards.",
      pictures: [
        { id: 1, picture: "/Images/Projects/Linkedin_Clone/hero.jpeg" },
        { id: 2, picture: "/Images/Projects/Linkedin_Clone/home.jpeg" },
        { id: 3, picture: "/Images/Projects/Linkedin_Clone/course.jpeg" },
        { id: 4, picture: "/Images/Projects/Linkedin_Clone/users.jpeg" },
        { id: 5, picture: "/Images/Projects/Linkedin_Clone/news.jpeg" },
      ],
    },
    {
      id: 3,
      title: "Study Partner",
      url: "https://github.com/AjayBThorat-20/study-partner",
      techStack: "Android SDK, Java, SQLite, RESTful APIs, XML",
      discription:
        "Study Partner is an innovative Android mobile learning application designed to democratize education for students in India, particularly those in tier-2 cities with limited access to quality educational resources. The app features secure user authentication, comprehensive course videos spanning beginner to advanced levels, and interactive programming quizzes. Users can access learning materials flexibly, track their progress through an integrated scoring system, and test their knowledge across various difficulty levels. By leveraging mobile technology, the application addresses the challenges of overcrowded coaching institutes and geographical limitations, enabling students to learn anytime and anywhere with a user-friendly interface.",
      pictures: [
        { id: 1, picture: "/Images/Projects/Study_Partner/welcome.jpeg" },
        { id: 2, picture: "/Images/Projects/Study_Partner/email_verification.jpeg" },
        { id: 3, picture: "/Images/Projects/Study_Partner/categories.jpeg" },
        { id: 4, picture: "/Images/Projects/Study_Partner/quizz.jpeg" },
        { id: 5, picture: "/Images/Projects/Study_Partner/course.jpeg" },
        { id: 6, picture: "/Images/Projects/Study_Partner/python.jpeg" },
      ],
    },
    {
      id: 4,
      title: "DevCompass (Open Source npm Package)",
      url: "https://github.com/AjayBThorat-20/devcompass",
      techStack: "Node.js, Commander.js, D3.js, SQLite, OpenAI/Anthropic/Google APIs, GitHub Actions",
      discription:
        "DevCompass is a production npm CLI tool I published and actively maintain for JavaScript dependency health analysis, combining real-time CVE vulnerability scanning through OSV and NVD database integration with AI-powered recommendations across four LLM providers (OpenAI, Anthropic, Google Gemini, and local Ollama). I engineered an interactive dependency graph dashboard using D3.js with four distinct layouts (tree, force-directed, radial, and conflict-highlighting) featuring real-time search and filtering, plus an intelligent auto-fix system with risk classification, dry-run previews, and automatic backups before any change is applied. A parallel GitHub Issues API integration tracks 500+ popular npm packages for deprecation and security alerts with an 80% performance gain from concurrent processing. During a recent security hardening pass I identified and fixed a shell-injection vulnerability and a path-traversal gap, upgraded API key encryption from unsalted SHA-256 to salted scrypt, and set up a GitHub Actions CI pipeline that gates every change on an automated test suite and npm audit so dependency vulnerabilities get caught before release.",
      pictures: [
        { id: 1, picture: "/Images/Projects/DevCompass/help.jpeg" },
        { id: 2, picture: "/Images/Projects/DevCompass/analyze.jpeg" },
        { id: 3, picture: "/Images/Projects/DevCompass/fix_plan.jpeg" },
        { id: 4, picture: "/Images/Projects/DevCompass/fix_complete.jpeg" },
        { id: 5, picture: "/Images/Projects/DevCompass/dashboard.jpeg" },
      ],
    },
  ] as const;
  