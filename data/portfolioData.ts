import { Job, Project, Education, Skill, ContactInfo } from '../types';

export const contactInfo: ContactInfo = {
  email: "dentonjdsun@gmail.com",
  linkedin: "linkedin.com/in/dentonjdsun/",
  location: "Vancouver, British Columbia"
};

export const workExperience: Job[] = [
  {
    id: "movmint",
    company: "Movmint",
    role: "Software Engineer",
    location: "Vancouver, British Columbia",
    dates: "Jan 2024 - Present",
    description: "Building next-generation payment infrastructure for Central Bank Digital Currencies (CBDCs).",
    achievements: [
      "Spearheaded offline CBDC payments solution, attracting 3 new potential business deals with international central banks.",
      "Enhanced project visibility by 60% within the first quarter of demo launch.",
      "Configured Hardware Security Modules (HSMs) and rotated JWTs for secure payment signing/verification.",
      "Developed RESTful API backend using Node.js/Express, leveraging Redis (<500ms latency) and BullMQ.",
      "Led IAM security layer integration with Golang, Ory, and Kong Gateway for OAuth 2.0 & RBAC.",
      "Implemented automated financial reconciliation reducing uncaught errors by 95%."
    ],
    tech: ["Node.js", "Express", "Golang", "Redis", "PostgreSQL", "AWS", "Docker", "Kubernetes", "HSM", "Ory", "Kong"]
  },
  {
    id: "ubc-ta",
    company: "University of British Columbia",
    role: "Undergraduate Teaching Assistant (SCIE_V 100)",
    location: "Vancouver, British Columbia",
    dates: "Oct 2022 - Jan 2023",
    description: "Interdisciplinary science course introducing computational thinking.",
    achievements: [
      "Designed and led interactive tutorials for 15 students.",
      "Implemented hands-on coding exercises improving problem-solving skills.",
      "Increased program grades performance 12% above class averages."
    ],
    tech: ["Python", "Pedagogy", "Mentorship"]
  },
  {
    id: "whatifi",
    company: "Whatifi",
    role: "Software Developer Intern",
    location: "Vancouver, British Columbia",
    dates: "Jan 2022 - Oct 2022",
    description: "Fintech startup providing no-code financial modeling tools.",
    achievements: [
      "Developed codeless node-based financial modeling app in TypeScript/React.",
      "Extended product features enabling models to handle 100s of unique use-cases.",
      "Increased efficiency for large financial models by over 300% by simplifying back-end calculations in Golang."
    ],
    tech: ["TypeScript", "React", "Golang", "D3.js", "Node.js"]
  }
];

export const projects: Project[] = [
  {
    id: "esports",
    title: "Esports Game Analyzer",
    description: "A tool to help competitive gamers improve performance by analyzing match data.",
    tech: ["Python", "Pandas", "NumPy", "Matplotlib", "RiotGames API"],
    highlights: [
      "Integrated RiotGames API to fetch and analyze live match data.",
      "Used NumPy/Pandas to clean and transform gameplay statistics.",
      "Created interactive plots highlighting critical game-winning metrics."
    ]
  },
  {
    id: "thoughtsloth",
    title: "ThoughtSlothAI Mental Health Journaling",
    description: "HackTheNorth Hackathon Project. AI-powered journaling app.",
    tech: ["Android", "Java", "Firebase", "TensorFlow", "TensorFlow Lite"],
    highlights: [
      "Developed native Android app with intuitive UI.",
      "Integrated TensorFlow NLP model for sentiment classification (90% accuracy).",
      "Implemented Firebase for real-time sync and auth."
    ]
  }
];

export const education: Education[] = [
  {
    school: "University of British Columbia",
    degree: "Bachelor of Science in Computer Science",
    location: "Vancouver, British Columbia",
    date: "Graduated: May 2024",
    details: [
      "Exchange Term: National Technological University (NTU), Singapore for Computer Science",
      "Coursework: AI & ML, Computer Networking, Distributed Systems, Advanced Algorithms, Database Systems, OS."
    ]
  }
];

export const skills: Skill[] = [
  { name: "Python", icon: "SiPython", years: "Experienced", category: "Languages" },
  { name: "JavaScript", icon: "SiJavascript", years: "Experienced", category: "Languages" },
  { name: "TypeScript", icon: "SiTypescript", years: "Experienced", category: "Languages" },
  { name: "Golang", icon: "SiGo", years: "Experienced", category: "Languages" },
  { name: "Java", icon: "SiJava", years: "Proficient", category: "Languages" },
  { name: "SQL", icon: "SiPostgresql", years: "Proficient", category: "Languages" },
  { name: "Node.js", icon: "SiNodedotjs", years: "Experienced", category: "Backend" },
  { name: "Express", icon: "SiExpress", years: "Proficient", category: "Backend" },
  { name: "React", icon: "SiReact", years: "Experienced", category: "Frontend" },
  { name: "Redis", icon: "SiRedis", years: "Experienced", category: "Data" },
  { name: "PostgreSQL", icon: "SiPostgresql", years: "Experienced", category: "Data" },
  { name: "MongoDB", icon: "SiMongodb", years: "Proficient", category: "Data" },
  { name: "AWS", icon: "SiAmazonaws", years: "Proficient", category: "Cloud/DevOps" },
  { name: "Docker", icon: "SiDocker", years: "Proficient", category: "Cloud/DevOps" },
  { name: "Kubernetes", icon: "SiKubernetes", years: "Proficient", category: "Cloud/DevOps" },
  { name: "Git", icon: "SiGit", years: "Experienced", category: "Cloud/DevOps" },
];
