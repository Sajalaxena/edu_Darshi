// src/data/mentorsData.js
import m1 from "../../assets/mentor1.jpg";
import m2 from "../../assets/mentor2.jpg";
import m3 from "../../assets/mentor2.jpg";

const mentors = [
  {
    id: "dr-gyan",
    name: "Dr. Gyan",
    title: "Ph.D (Mathematics) • IIT Delhi",
    short: "National Postdoctoral Fellow • IISC Bengaluru",
    bio:
      "Dr. Gyan has 10+ years of research and teaching experience in applied mathematics. He mentors aspirants for competitive exams with a special focus on problem solving and exam strategy.",
    qualifications: [
      "Ph.D. Mathematics — IIT Delhi",
      "National Postdoctoral Fellow — IISC Bengaluru",
      "10+ years teaching & research",
    ],
    tags: ["Academia", "Exam Strategy"],
    img: m1,
    linkedin: "https://www.linkedin.com",
    email: "gyan@example.com",
  },
  {
    id: "sajal-saxena",
    name: "Sajal Saxena",
    title: "MCA • NIT Patna",
    short: "GEN AI • IIT Mandi",
    bio:
      "Sajal is a full-stack engineer turned AI mentor. He coaches students on project design, interview prep and practical ML for admission and placement interviews.",
    qualifications: ["MCA — NIT Patna", "GEN AI — IIT Mandi"],
    tags: ["AI", "Projects"],
    img: m2,
    linkedin: "https://www.linkedin.com",
    email: "sajal@example.com",
  },
  {
    id: "kavita-sonkar",
    name: "Kavita Sonkar",
    title: "M.Tech • IIT Madras",
    short: "Embedded systems and IoT specialist",
    bio:
      "Kavita focuses on hands-on systems projects and interview readiness. Her sessions emphasize concept clarity and step-by-step project building.",
    qualifications: ["M.Tech — IIT Madras", "Industry experience in IoT"],
    tags: ["Embedded", "Industry"],
    img: m3,
    linkedin: "https://www.linkedin.com",
    email: "kavita@example.com",
  },
];

export default mentors;
