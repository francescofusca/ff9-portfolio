/**
 * Portfolio Data Configuration
 * Versione: 2.0.0
 */

// Informazioni personali
export const personalInfo = {
  name: "Francesco Fusca",
  nickname: "FF9",
  title: "Software Engineer",
  email: "francescofusca9@gmail.com",
  location: "Italy",
  bio: "Building digital products that solve real problems. Specializing in web development, cybersecurity, and machine learning.",
  profileImage: "/images/projects/fotomia.JPG"
};

// Esperienze lavorative
export const experiences = [
  {
    id: 1,
    title: "Founder",
    company: "RistoranteSmart",
    period: "2024 — Present",
    description: "Building web infrastructures with spatial optimization algorithms for the restaurant industry. Developing 3D floor mapping and table management systems."
  },
  {
    id: 2,
    title: "Developer Intern",
    company: "Scintille s.r.l",
    period: "2023",
    description: "Developed e-commerce solutions and built an AI-powered advertising system for digital marketing campaigns."
  }
];

// Progetti con immagini reali
export const projects = [
  {
    id: 1,
    title: "RistoranteSmart",
    description: "Platform for restaurant digitalization with 3D floor mapping and spatial optimization for table management.",
    tech: ["React", "Node.js", "Three.js", "PostgreSQL"],
    image: "/images/projects/ristorantesmart1.jpeg",
    link: "https://www.ristorantesmart.it",
    github: null
  },
  {
    id: 2,
    title: "RistoranteSmart Dashboard",
    description: "Admin dashboard for restaurant owners to manage reservations, floor plans, and customer analytics.",
    tech: ["React", "TypeScript", "Tailwind CSS"],
    image: "/images/projects/ristorantesmart2.jpeg",
    link: "https://www.ristorantesmart.it",
    github: null
  },
  {
    id: 3,
    title: "NotlonWatch",
    description: "Apple Watch application for voice notes with seamless Notion synchronization and transcription.",
    tech: ["Swift", "WatchOS", "Notion API"],
    image: "/images/projects/notlonwatch.jpeg",
    link: null,
    github: "https://github.com/francescofusca/NotlonWatch"
  },
  {
    id: 4,
    title: "Asahi Linux Fix",
    description: "Fixed Bluetooth audio for AirPods on Apple Silicon Linux. Contributed to open-source driver development.",
    tech: ["Linux", "Bluetooth", "C", "Shell"],
    image: "/images/projects/asahi.jpeg",
    link: null,
    github: "https://github.com/francescofusca"
  },
  {
    id: 5,
    title: "FlipperZeroPhone",
    description: "Android application replicating Flipper Zero capabilities for security research and penetration testing.",
    tech: ["Android", "Kotlin", "Python", "NFC"],
    image: "/images/projects/flipper.jpeg",
    link: null,
    github: "https://github.com/francescofusca/FlipperZeroPhone"
  }
];

// Skills/Tecnologie
export const skills = [
  "TypeScript",
  "React",
  "Node.js",
  "Python",
  "Swift",
  "PostgreSQL",
  "Docker",
  "AWS",
  "Machine Learning",
  "Cybersecurity",
  "Linux",
  "Three.js"
];

// Social links
export const socials = [
  { name: "GitHub", url: "https://github.com/francescofusca" },
  { name: "LinkedIn", url: "https://linkedin.com/in/ff9" },
  { name: "Email", url: "mailto:francescofusca9@gmail.com" }
];

// Education
export const education = [
  {
    title: "Computer Engineering",
    institution: "University",
    period: "In Progress"
  },
  {
    title: "Scientific High School",
    institution: "Applied Sciences",
    period: "2018 — 2022"
  }
];
