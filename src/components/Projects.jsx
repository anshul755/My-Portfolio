import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Github, Globe } from "lucide-react";

import NA from "./images/NA.png";
import predictive from "./images/RUL.png";
import pagerank from "./images/PG.png";
import LL from "./images/LL.png";
import SM from "./images/SM.png";
import LS from "./images/LS.png";
import IN from "./images/IN.png";
import EM from "./images/EM.svg";

export default function Projects() {
  const projects = [
    {
      name: "InternNova",
      logo: IN,
      domain: "Java | Spring Boot | FastAPI | Microservices",
      date: "June 2026",
      summary: "AI-Powered Microservices Recruitment Platform",
      description:
        "A full-stack microservices recruitment platform built using Spring Boot, FastAPI, MongoDB, and Docker. Designed and developed a scalable architecture consisting of five containerized services orchestrated with Docker Compose and deployed to DigitalOcean using GitHub Actions CI/CD. Developed the Core Service handling authentication, profile management, job board CRUD, application workflows, Cloudinary file uploads, SMTP email notifications, and CRON-based job scheduling. Integrated an AI-powered candidate evaluation pipeline using LangGraph and LangChain to analyze resumes, detect timeline anomalies, score candidates against job descriptions, and automatically generate tailored LaTeX-based PDF resumes.",
      links: {
        code: "https://github.com/anshul755/InternNova",
        live: "https://intern-nova.in"
      },
    },
    {
      name: "EchoMatrix",
      logo: EM,
      domain: "React.js | FastAPI | Machine Learning",
      date: "April 2026",
      summary: "Investigative Intelligence & Semantic Analytics Platform",
      description:
        "A full-stack investigative intelligence platform designed for semantic search, temporal analysis, and graph-based data exploration. Built using React.js, FastAPI, pandas, scikit-learn, and SentenceTransformers. Implemented embedding-based semantic retrieval, topic clustering with KMeans, interactive dashboards for time-series analysis, network visualization, and community detection using NetworkX. Optimized analytics performance through backend dataset caching, embedding warm-up, and lazy-loaded frontend routes, enabling faster and more efficient investigative workflows.",
      links: {
        code: "https://github.com/anshul755/EchoMatrix",
        live: "https://echo-matrix.vercel.app"
      },
    },
    {
      name: "Predictive Maintenance Using Sensor Data",
      logo: predictive,
      domain: "Python | Machine Learning",
      date: "November 2025",
      summary: "Machine Learning-Based RUL Prediction for NASA Turbofan Engines",
      description:
        "A machine learning project focused on predicting Remaining Useful Life (RUL) of NASA turbofan engines using sensor time-series data from the C-MAPSS dataset. The workflow includes data preprocessing, EDA, visualization, feature engineering, model training, and performance benchmarking across 7 regression models. Achieved best performance using XGBoost with RMSE 19.85 and R² 0.77, demonstrating its potential for real-world predictive maintenance applications.",
      links: { code: "https://github.com/anshul755/Predictive-Maintenance-Using-Sensor-Data" },
    },
    {
      name: "PageRank Visualizer",
      logo: pagerank,
      domain: "Java Spring Boot | React",
      date: "November 2025",
      summary: "Interactive Visualization Tool for Google's PageRank Algorithm",
      description:
        "An interactive web-based tool that visualizes how Google's PageRank algorithm works. Users can build directed graphs, run PageRank iterations, and observe how importance distributes across nodes in real-time. The app supports dynamic graph creation, damping factor control, result animation, and exposes an API for PageRank computation. Ideal for students and developers exploring graph theory, search ranking, and algorithm behavior.",
      links: {
        code: "https://github.com/anshul755/Page-Rank-Visualizer",
        live: "https://page-rank-visualizer.vercel.app/"
      },
    },
    {
      name: "LuxeLodge",
      logo: LL,
      domain: "Node.js | Express | MongoDB | EJS",
      date: "May 2025",
      summary: "Modern Lodge Management System",
      description:
        "Built a modern, full-stack lodge management system with secure user authentication, dynamic room listings, image uploads via Cloudinary, and a booking management dashboard. Server-rendered with EJS for smooth, SEO-friendly pages and Bootstrap for responsive design.",
      links: {
        code: "https://github.com/anshul755/LuxeLodge",
        live: "https://luxelodge.onrender.com/"
      },
    },
    {
      name: "NeuralAgri",
      logo: NA,
      domain: "Full Stack | AI/ML | Android Development",
      date: "March 2025",
      summary: "AI-Powered Agricultural Advisory System",
      description:
        "Built a cross-platform farming assistant integrating ML models for crop yield prediction, disease detection, and personalized crop recommendations. Used React, Flask, TensorFlow, PyTorch, and Google Earth Engine to provide real-time insights, satellite-based soil moisture, and a Hindi-supported chatbot for small and marginal farmers.",
      links: { 
        code: "https://github.com/anshul755/NeuralAgri",
        live: "https://neuralagri.web.app/"
      },
    },
    {
      name: "SmartMusic",
      logo: SM,
      domain: "Python AI-ML",
      date: "January 2025",
      summary: "Mood and Gesture Activated Smart Music System",
      description:
        "Developed an AI-powered music player that detects facial emotions and hand gestures to control playback using DeepFace, MediaPipe, and OpenCV. Integrated Streamlit for a user-friendly interface, allowing real-time webcam-based interaction. The system identifies moods like happiness, sadness, and anger, playing corresponding songs while enabling gesture-based playback control.",
      links: { code: "https://github.com/anshul755/Mood-and-Gesture-Activated-Smart-Music-System" },
    },
    {
      name: "Library System",
      logo: LS,
      domain: "Java",
      date: "October 2024",
      summary: "Java-Based Library Management System",
      description:
        "A simple Java-based Library Management System that uses a Binary Search Tree (BST) to store, search, and manage books. Each book is represented by its ISBN, title, author, and published year. The system allows users to add, search, delete, and display books in an ordered format.",
      links: { code: "https://github.com/anshul755/LibrarySystem" },
    },
  ];
  const [openIndex, setOpenIndex] = useState(null);
  const [hoveredCard, setHoveredCard] = useState(null);
  const [startIndex, setStartIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(4);

  // Responsive items per page
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) setItemsPerPage(1);
      else if (window.innerWidth < 1024) setItemsPerPage(2);
      else setItemsPerPage(4);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const next = () => {
    setDirection(1);
    setStartIndex((prev) => (prev + 1) % projects.length);
  };

  const prev = () => {
    setDirection(-1);
    setStartIndex((prev) => (prev - 1 + projects.length) % projects.length);
  };

  const currentProjects = [];
  for (let i = 0; i < itemsPerPage; i++) {
    currentProjects.push({
      ...projects[(startIndex + i) % projects.length],
      actualIndex: (startIndex + i) % projects.length
    });
  }

  const handleMouseMove = (e, index) => {
    if (hoveredCard !== index) return;
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = (y - centerY) / 10;
    const rotateY = (centerX - x) / 10;
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05,1.05,1.05)`;
  };

  const handleMouseLeave = (e) => {
    e.currentTarget.style.transform = "perspective(1000px) rotateX(0) rotateY(0) scale3d(1,1,1)";
    setHoveredCard(null);
  };

  return (
    <section id="project" className="scroll-mt-20 py-16 px-4 sm:px-6 lg:px-8 bg-transparent">
      <div className="max-w-[1400px] mx-auto">
        <div className="bg-black/30 backdrop-blur-md rounded-2xl border border-white/20 shadow-2xl p-6 sm:p-8 md:p-12">
          <div className="flex items-center justify-between mb-10">
          <div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-2">Projects</h2>
            <div className="w-16 h-1 bg-gradient-to-r from-orange-400 to-transparent rounded-full" />
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={prev}
              className="w-12 h-12 rounded-full border border-white/20 bg-white/5 backdrop-blur-sm flex items-center justify-center text-white hover:bg-orange-400 hover:text-black hover:border-orange-400 transition-all duration-300 hover:scale-110 z-10"
            >
              <i className="fas fa-chevron-left" />
            </button>
            <button
              onClick={next}
              className="w-12 h-12 rounded-full border border-white/20 bg-white/5 backdrop-blur-sm flex items-center justify-center text-white hover:bg-orange-400 hover:text-black hover:border-orange-400 transition-all duration-300 hover:scale-110 z-10"
            >
              <i className="fas fa-chevron-right" />
            </button>
          </div>
        </div>

        <div className="relative overflow-hidden w-full pb-10">
          <div className="flex gap-6 w-full">
            <AnimatePresence mode="popLayout" custom={direction}>
              {currentProjects.map((proj) => (
                <motion.div
                  layout
                  custom={direction}
                  initial={(dir) => ({ opacity: 0, x: dir > 0 ? 200 : -200, scale: 0.8 })}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={(dir) => ({ opacity: 0, x: dir > 0 ? -200 : 200, scale: 0.8 })}
                  transition={{ duration: 0.4 }}
                  key={proj.name}
                  className="w-full sm:w-[calc(50%-12px)] lg:w-[calc(25%-20px)] flex-shrink-0 relative"
                >
                  <div
                    className="group relative bg-white/10 dark:bg-gray-900/10 backdrop-blur-lg rounded-2xl border border-white/20 shadow-lg overflow-hidden transition-all duration-500 h-[340px] flex flex-col justify-between"
                    style={{ perspective: "1000px", transformStyle: "preserve-3d", transition: "transform 0.3s ease-out" }}
                    onMouseMove={(e) => handleMouseMove(e, proj.name)}
                    onMouseEnter={() => setHoveredCard(proj.name)}
                    onMouseLeave={handleMouseLeave}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-orange-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-2xl pointer-events-none" />
                    <div className="p-6 flex flex-col z-10 relative h-full">
                      <div className="flex-1 flex flex-col items-center justify-start w-full pt-4">
                        <div className="relative mb-6 transition-transform duration-500 group-hover:scale-110 flex items-center justify-center h-20 w-20 bg-white/5 rounded-2xl border border-white/10 p-3 shadow-inner">
                          <div className="absolute -inset-2 bg-gradient-to-r from-orange-400 to-orange-600 rounded-2xl blur opacity-0 group-hover:opacity-30 transition-opacity duration-700" />
                          <img src={proj.logo} alt={proj.name} loading="lazy" className="h-full w-full object-contain relative z-10 drop-shadow-md" />
                        </div>
                        <h3 className="text-lg sm:text-xl font-bold text-white mb-1 transition-transform duration-500 group-hover:scale-105 text-center">{proj.name}</h3>
                        <p className="text-sm sm:text-base text-gray-300 text-center">{proj.domain}</p>
                      </div>
                      <div className="mt-auto flex space-x-3 w-full justify-center">
                        <AnimatedButton href={proj.links.code} external icon={<Github className="w-4 h-4 mr-1" />} text="Code" color="orange" />
                        {proj.links.live && <AnimatedButton href={proj.links.live} external icon={<Globe className="w-4 h-4 mr-1" />} text="Live" color="orange" />}
                        <AnimatedButton onClick={() => setOpenIndex(proj.actualIndex)} text="Details" color="orange" />
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
          </div>
        </div>
        <AnimatePresence>
          {openIndex !== null && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
              style={{ perspective: "1000px" }}
            >
              <div className="absolute inset-0 bg-black/80" onClick={() => setOpenIndex(null)} />
              <motion.div className="relative bg-black-700 backdrop-blur-lg rounded-2xl p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto z-10 border border-white/20">
                <button onClick={() => setOpenIndex(null)} className="absolute top-4 right-4 text-white text-2xl hover:text-orange-400">×</button>
                <div className="flex items-center mb-4">
                  <img src={projects[openIndex].logo} alt={projects[openIndex].name} loading="lazy" className="h-12 w-12 mr-4 object-contain" />
                  <div>
                    <h3 className="text-2xl font-bold text-orange-400">{projects[openIndex].name}</h3>
                    <p className="text-sm text-gray-200">{projects[openIndex].domain} • {projects[openIndex].date}</p>
                  </div>
                </div>
                <h4 className="text-lg font-semibold text-white mb-3">{projects[openIndex].summary}</h4>
                <p className="text-base text-gray-300 mb-6 whitespace-pre-line">{projects[openIndex].description}</p>
                <div className="flex space-x-4">
                  <a href={projects[openIndex].links.code} target="_blank" rel="noopener noreferrer" className="inline-flex items-center px-6 py-3 border border-orange-400 text-white hover:bg-orange-400 hover:text-black rounded-2xl">
                    <Github className="w-5 h-5 mr-2" /> View Code
                  </a>
                  {projects[openIndex].links.live && (
                    <a href={projects[openIndex].links.live} target="_blank" rel="noopener noreferrer" className="inline-flex items-center px-6 py-3 border border-orange-400 text-white hover:bg-white hover:text-black rounded-2xl">
                      <Globe className="w-5 h-5 mr-2" /> Live Site
                    </a>
                  )}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

function AnimatedButton({ onClick, href, text, color = "orange", icon, external = false, size = "normal" }) {
  const buttonRef = useRef(null);
  const handleMouseEnter = () => {
    const overlay = buttonRef.current?.querySelector(".button-overlay");
    overlay && (overlay.style.transform = "translateX(0)");
  };
  const handleMouseLeave = () => {
    const overlay = buttonRef.current?.querySelector(".button-overlay");
    overlay && (overlay.style.transform = "translateX(-100%)");
  };
  const base = "relative overflow-hidden rounded-md font-medium transition-all duration-300 flex items-center justify-center";
  const sz = size === "large" ? "px-6 py-3 text-base" : "px-4 py-2 text-sm";
  const colors = {
    orange: "border border-orange-400 text-white hover:text-black hover:bg-orange-400",
    white: "border border-white text-white hover:bg-white hover:text-black"
  };
  const overlayCol = { orange: "bg-orange-400", white: "bg-white" };
  const Content = () => (
    <>
      <div
        className={`button-overlay absolute inset-0 ${overlayCol[color]} transform -translate-x-full transition-transform duration-500`}
      />
      <span className="relative z-10 flex items-center">{icon}{text}</span>
    </>
  );
  if (href) {
    return (
      <a
        ref={buttonRef}
        href={href}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
        className={`${base} ${sz} ${colors[color]}`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <Content />
      </a>
    );
  }
  return (
    <button
      ref={buttonRef}
      onClick={onClick}
      className={`${base} ${sz} ${colors[color]}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Content />
    </button>
  );
}
