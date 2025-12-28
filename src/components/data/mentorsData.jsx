// src/data/mentorsData.js
import m1 from "../../assets/blank-profile-pic.jpg";
import w2 from "../../assets/unknown-woman.png";
import m2 from "../../assets/unknow-man.png";

const mentors = [
  {
    id: "dr-gyanendra-verma",
    name: "Dr. Gyanendra K Verma",
    title: "Postdoctoral Fellow • IISC Bengaluru",
    short: "Ph.D — IIT Delhi",
    bio: "Dr. Gyanendra is a dedicated researcher helping students understand advanced mathematics, research methodology, and exam strategies.",
    qualifications: [
      "Ph.D — IIT Delhi",
      "Postdoctoral Fellow — IISC Bengaluru",
    ],
    tags: ["Academia", "Research"],
    img: m2,
    linkedin: "#",
    email: "gyanendra@example.com",
  },

  {
    id: "dr-ashish-pandey",
    name: "Dr. Ashish K Pandey",
    title: "Ph.D • Allahabad University",
    short: "Mathematician in Industry",
    bio: "Dr. Ashish works at the intersection of academia and industry, applying mathematical models to real-world engineering and computational problems.",
    qualifications: [
      "Ph.D — Allahabad University",
      "Industry expert in applied mathematics",
    ],
    tags: ["Mathematics", "Industry"],
    img: m2,
    linkedin: "#",
    email: "ashish@example.com",
  },

  {
    id: "kavita-sonkar",
    name: "Kavita Sonkar",
    title: "M.Tech • IIT Madras",
    short: "Embedded systems and IoT specialist",
    bio: "Kavita mentors students in IoT, embedded systems, and real-world engineering. Her approach focuses on fundamental clarity and hands-on learning.",
    qualifications: ["M.Tech — IIT Madras", "Industry experience in IoT"],
    tags: ["Embedded", "Industry"],
    img: w2,
    linkedin: "https://www.linkedin.com",
    email: "kavita@example.com",
  },
  {
    id: "sajal-saxena",
    name: "Sajal Saxena",
    title: "MCA • NIT Patna",
    short: "GEN AI • IIT Mandi",
    bio: "Sajal is a full-stack engineer and AI mentor helping students in project building, ML concepts, interview prep, and career strategy.",
    qualifications: ["MCA — NIT Patna", "GEN AI — IIT Mandi"],
    tags: ["AI", "Projects"],
    img: m2,
    linkedin: "https://www.linkedin.com",
    email: "sajal@example.com",
  },

  // --------------------------
  // New mentors added below
  // --------------------------

  {
    id: "ms-ekta-pandey",
    name: "Ms. Ekta Pandey",
    title: "Bioinformatician • Industry",
    short: "Allahabad University",
    bio: "Ekta specializes in computational biology and bioinformatics. She guides students interested in research, genomics, and biotechnology careers.",
    qualifications: [
      "Bioinformatics — Allahabad University",
      "Industry experience in genomics & data science",
    ],
    tags: ["Bioinformatics", "Industry"],
    img: w2,
    linkedin: "#",
    email: "ekta@example.com",
  },

  {
    id: "dr-manuj-verma",
    name: "Dr. Manuj Verma",
    title: "Postdoctoral Fellow • Paris",
    short: "Ph.D – IIT Delhi",
    bio: "Dr. Manuj conducts advanced research in mathematics and trains students for competitive exams and research careers in STEM.",
    qualifications: ["Ph.D — IIT Delhi", "Postdoctoral Fellow — Paris"],
    tags: ["Research", "Mathematics"],
    img: m2,
    linkedin: "#",
    email: "manuj@example.com",
  },

  {
    id: "dr-tushar-singh",
    name: "Dr. Tushar Singh",
    title: "Visiting Fellow • HRI",
    short: "Ph.D — NIT Allahabad",
    bio: "Dr. Tushar focuses on higher mathematics and problem-solving techniques for competitive exams and advanced research.",
    qualifications: ["Ph.D — NIT Allahabad", "Visiting Fellow — HRI"],
    tags: ["Mathematics", "Research"],
    img: m2,
    linkedin: "#",
    email: "tushar@example.com",
  },

  {
    id: "dr-himanshu-sharma",
    name: "Dr. Himanshu Sharma",
    title: "Postdoctoral Fellow • Tel Aviv University",
    short: "Ph.D — IIT Delhi",
    bio: "Dr. Himanshu works in advanced mathematical and computational research, guiding students aiming for global academic careers.",
    qualifications: [
      "Ph.D — IIT Delhi",
      "Postdoctoral Fellow — Tel Aviv University, Israel",
    ],
    tags: ["Research", "International"],
    img: m2,
    linkedin: "#",
    email: "himanshu@example.com",
  },

  {
    id: "mr-aman-singh",
    name: "Mr. Aman Singh (Chemistry)",
    title: "Senior Research Scholar • IIT BHU",
    short: "Allahabad University",
    bio: "Aman specializes in physical and organic chemistry, mentoring students for competitive exams and research projects.",
    qualifications: [
      "Research Scholar — IIT BHU",
      "M.Sc — Allahabad University",
    ],
    tags: ["Chemistry", "Research"],
    img: m2,
    linkedin: "#",
    email: "aman@example.com",
  },

  {
    id: "dr-sarita",
    name: "Dr. Sarita",
    title: "Assistant Professor",
    short: "Ph.D — IIT BHU",
    bio: "Dr. Sarita guides students in foundational sciences and helps them prepare for higher studies and research opportunities.",
    qualifications: ["Ph.D — IIT BHU", "Assistant Professor"],
    tags: ["Academia", "Science"],
    img: w2,
    linkedin: "#",
    email: "sarita@example.com",
  },

  {
    id: "dr-anurag-patel",
    name: "Dr. Anurag Patel",
    title: "Assistant Professor",
    short: "Ph.D — BHU",
    bio: "Dr. Anurag focuses on applied mathematics and engineering, mentoring students in technical depth and career planning.",
    qualifications: ["Ph.D — BHU", "Assistant Professor"],
    tags: ["Mathematics", "Academia"],
    img: m2,
    linkedin: "#",
    email: "anurag@example.com",
  },

  {
    id: "mr-ankit-chaudhary",
    name: "Mr. Ankit Chaudhary",
    title: "Senior Research Scholar • IIT Jodhpur",
    short: "M.Sc — BHU",
    bio: "Ankit guides students on research-oriented preparation, especially in mathematical sciences and engineering.",
    qualifications: ["Senior Research Scholar — IIT Jodhpur", "M.Sc — BHU"],
    tags: ["Research", "Mathematics"],
    img: m2,
    linkedin: "#",
    email: "ankit@example.com",
  },

  {
    id: "dr-manan-singh",
    name: "Dr. Manan Singh",
    title: "Postdoctoral Fellow • TIFR",
    short: "Physics Specialist",
    bio: "Dr. Manan mentors physics aspirants, focusing on intuition building, derivations, and research-oriented thinking.",
    qualifications: ["Postdoctoral Fellow — TIFR", "Ph.D — Physics"],
    tags: ["Physics", "Research"],
    img: m2,
    linkedin: "#",
    email: "manan@example.com",
  },
];

export default mentors;
