export interface SkillElement {
    id: number;
    text: string;
  }
  
  export interface EducationElement {
    id: number;
    course: string;
    college: string;
    passingYear: string;
  }
  
  export interface CoCurricularActivityElement {
    id: number;
    Name: string;
    description: string;
  }
  
  export interface CertificationElement {
    id: number;
    title: string;
    image: string;
    year: string;
    organization: string;
  }
  
  // 🔹 Skills Data
  export const skillsData: SkillElement[] = [
    { id: 1, text: "Python" },
    { id: 2, text: "Node.js" },
    { id: 3, text: "Next.js" },
    { id: 4, text: "React.js" },
    { id: 5, text: "Tailwind CSS" },
    { id: 6, text: "JavaScript" },
    { id: 7, text: "Bootstrap" },
    { id: 8, text: "MySQL" },
    { id: 9, text: "MongoDB" },
    { id: 10, text: "Prisma ORM" },
    { id: 11, text: "Clerk Auth" },
    { id: 12, text: "GitHub" },
    { id: 13, text: "Docker" },
    { id: 14, text: "SQL Server" },
    { id: 15, text: "Postman" },
    { id: 16, text: "Pentaho" },
    { id: 17, text: "Supabase" }
  ];
  
  // 🔹 Education Data
  export const educationData: EducationElement[] = [
    {
      id: 1,
      course: "MASTER OF COMPUTER APPLICATION (MCA)",
      college: "Hiray College | University Of Mumbai | Mumbai, Maharashtra, India",
      passingYear: "2024",
    },
    {
      id: 2,
      course: "BACHELORS OF COMPUTER SCIENCE (B.SC. CS.)",
      college: "Patkar Varde College | University Of Mumbai | Mumbai, Maharashtra, India",
      passingYear: "2022",
    },
    {
      id: 3,
      course: "HIGHER SECONDARY EDUCATION (H.S.C)",
      college: "Patkar Varde College | State Board of Maharashtra | Mumbai, Maharashtra, India",
      passingYear: "2018",
    },
    {
      id: 4,
      course: "SECONDARY SCHOOL EDUCATION (S.S.C)",
      college: "Gurukul Vidyalaya | State Board of Maharashtra | Mumbai, Maharashtra, India",
      passingYear: "2015",
    }
  ];
  
  // 🔹 Co-Curricular Activities Data
  export const coCurricularActivitiesData: readonly CoCurricularActivityElement[] = [
    {
      id: 1,
      Name: "Ignite and Concat",
      description: "A program to foster collaboration and innovation.",
    },
    {
      id: 2,
      Name: "ISR and DLLE (Social Activity)",
      description: "Community engagement activities promoting social responsibility.",
    },
    {
      id: 3,
      Name: "SkillFull Netizen",
      description: "A workshop on becoming skilled and responsible digital citizens.",
    },
    {
      id: 4,
      Name: "16-Day Internship Sprints",
      description: "Streamlined project timelines through efficient sprint planning.",
    },
  ] as const;
  
  // 🔹 Certifications Data
  export const certificationsData: CertificationElement[] = [
    { id: 1, title: "Big Data Computing", image: "/Images/Certificates/BigData.png", year: "2021", organization: "NPTEL" },
    { id: 2, title: "Data Analytics with Python", image: "/Images/Certificates/Data_Analytics_with_Python.png", year: "2024", organization: "NPTEL" },
    { id: 3, title: "Postman Student Expert", image: "/Images/Certificates/postman.png", year: "2021", organization: "Postman" },
  ];
  