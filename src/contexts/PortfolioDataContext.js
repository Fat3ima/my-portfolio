import { createContext } from "react";

const PotfolioDataContext = createContext({
  name: "fatima",
  socialLink: {
    gitHup: "https://github.com/Fat3ima",
    linkedin: "https://www.linkedin.com/in/fatima404shamal/",
    eimal: "fatimash.hmad@gmail.com",
    instagram: "https://www.instagram.com/fatima.s.dev?igsi=OTFkMGVzc3hlZnZp",
    x: ""
  },
  skills: [
    {
      key: "react",
      title: "React",
      desc: "Build interactive UIs with Hooks, Context API, i18n, and modern architecture.",
      details: [
        { detail: "Frontend", id: 1 },
        { detail: "Advanced", id: 2 },
        { detail: "1.5 Years", id: 3 },
      ],
      icon: "icons/react.png",
      id: 1,
    },
    {
      key: "js",
      title: "JavaScript",
      desc: "Core scripting language used to build dynamic logic, manipulate the DOM, and power React applications.",
      details: [
        { detail: "Frontend", id: 1 },
        { detail: "Advanced", id: 2 },
        { detail: "2 Years", id: 3 },
      ],
      icon: "icons/js.png",
      id: 2,
    },
    {
      key: "htmlCss",
      title: "HTML5 & CSS3",
      desc: "Crafting structured, responsive, and visually appealing web pages with modern layout techniques like Flexbox and Grid.",
      details: [
        { detail: "Frontend", id: 1 },
        { detail: "Advanced", id: 2 },
        { detail: "2 Years", id: 3 },
      ],
      icon: "icons/css-html.png",
      id: 3,
    },
    {
      key: "mui",
      title: "Material-UI (MUI)",
      desc: "Developing fast, responsive, and highly customizable UI components following Google's Material Design system.",
      details: [
        { detail: "UI Library", id: 1 },
        { detail: "Intermediate", id: 2 },
        { detail: "1 Year", id: 3 },
      ],
      icon: "icons/mui.ico",
      id: 4,
    },
    {
      key: "java",
      title: "Java",
      desc: "Utilized for mastering Object-Oriented Programming (OOP) principles and building structured software applications.",
      details: [
        { detail: "Software", id: 1 },
        { detail: "Intermediate", id: 2 },
        { detail: "Academic", id: 3 },
      ],
      icon: "icons/java.png",
      id: 5,
    },
    {
      key: "cpp",
      title: "C++",
      desc: "The foundation of my programming journey, used for algorithmic problem-solving and understanding low-level memory management.",
      details: [
        { detail: "Programming", id: 1 },
        { detail: "Intermediate", id: 2 },
        { detail: "Academic", id: 3 },
      ],
      icon: "icons/cpp.png",
      id: 6,
    },
    {
      key: "php",
      title: "PHP",
      desc: "Handling core server-side scripting, database connectivity, and backend web logic templates.",
      details: [
        { detail: "Backend", id: 1 },
        { detail: "Intermediate", id: 2 },
        { detail: "1 Year", id: 3 },
      ],
      icon: "icons/php.png",
      id: 7,
    },
    {
      key: "flutter",
      title: "Flutter",
      desc: "Gained core fundamentals for cross-platform mobile application development using Dart.",
      details: [
        { detail: "Mobile", id: 1 },
        { detail: "Beginner", id: 2 },
        { detail: "Basics", id: 3 },
      ],
      icon: "icons/flutter.png",
      id: 8,
    },
    {
      key: "uiUx",
      title: "UI/UX & Graphic Design",
      desc: "Applying visual hierarchy, color theory, and user-centric design principles to create beautiful and intuitive digital experiences.",
      details: [
        { detail: "Design", id: 1 },
        { detail: "Beginner", id: 2 },
        { detail: "Basics", id: 3 },
      ],
      icon: "icons/ui.png",
      id: 9,
    },
  ],
  certificates: [
    {
      key: "BCS",
      id: 1,
      title: "Bachelor of Science in Computer Science",
      issuer:
        "University of Basrah - College of Computer Science and Information Technology",
      icon: "icons/mortarboard.png",
      date: "July 2025",
      expiry: "No Expiry",
      certId: "Ranked among the Top 8 graduates",
    },
    {
      key: "AIapp",
      id: 2,
      title:
        "Artificial Intelligence Applications and Their Impacts on Daily Life Symposium",
      issuer:
        "College of Computer Science and Information Technology - University of Basrah",
      icon: "icons/mortarboard.png",
      date: "26 Dec 2023",
      expiry: "No Expiry",
      certId: "Attendance Certificate - Postgraduate Hall",
    },
  ],
  techStack: [
{
    id: 1,
    key: "frontend",
    abbr: "FE",
    title: "Frontend Development",
    desc: "React, JavaScript, HTML5, CSS3, Material-UI (MUI)"
  },
  {
    id: 2,
    key: "backend",
    abbr: "BE",
    title: "Backend & Databases",
    desc: "PHP, Node.js basics, Core Web Logic & API Connectivity"
  },
  {
    id: 3,
    key: "software",
    abbr: "SE",
    title: "Software & OOP",
    desc: "C++, Java, Object-Oriented Programming & Data Structures"
  },
  {
    id: 4,
    key: "design",
    abbr: "UX",
    title: "Design & Mobile",
    desc: "UI/UX Foundations, Graphic Design, Flutter Basics"
  }
  ],
});

export default PotfolioDataContext;
