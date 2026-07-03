import React, { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

function useReveal(threshold = 0.2) {
  const ref = useRef(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => setRevealed(e.isIntersecting),
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);

  return [ref, revealed];
}

const experiences = [
  {
    role: "Software Engineering Intern",
    organization: "BinaryBits.co",
    location: "On Site",
    duration: "May 2026 – June 2026",
    points: [
      <React.Fragment key="1">Contributed to the development of a microservices-based restaurant management platform using <span className="font-medium">React, Node.js, FastAPI, PostgreSQL, Kafka, and Redis</span>.</React.Fragment>,
      <React.Fragment key="2">Worked on backend services and API integrations supporting order processing, payments, notifications, and analytics.</React.Fragment>,
      <React.Fragment key="3">Assisted in implementing AI-powered chat and voice ordering features to enhance customer experience and streamline restaurant operations.</React.Fragment>,
      <React.Fragment key="4">Collaborated with team members to improve the performance, reliability, and maintainability of distributed services across the platform.</React.Fragment>
    ],
    certLink: "https://drive.google.com/file/d/15izmIx1IyxJi0XMXYtyRBaeoEmWpppwc/view?usp=sharing"
  },
  {
    role: "AI Intern",
    organization: "AICTE Internship on AI with TechSaksham (Microsoft & SAP Initiative)",
    location: "Remote",
    duration: "December 2024 – January 2025",
    points: [
      <React.Fragment key="1">Developed a gesture‐controlled, mood‐based music player using <span className="font-medium">DeepFace</span>, <span className="font-medium">MediaPipe</span>, and <span className="font-medium">OpenCV</span> to detect emotions and hand gestures.</React.Fragment>,
      <React.Fragment key="2">Built an interactive AI‐powered music recommendation system with <span className="font-medium">Streamlit</span>, playing songs based on mood detection.</React.Fragment>
    ],
    certLink: "https://drive.google.com/file/d/1UbrGqDx9ZFAH8eaWk-eqcC5J9-bF9xcb/view"
  }
];

export default function Experience() {
  const [ref, revealed] = useReveal();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const next = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % experiences.length);
  };

  const prev = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + experiences.length) % experiences.length);
  };

  return (
    <section
      id="experience"
      ref={ref}
      className={`scroll-mt-20 w-full flex justify-center px-6 py-16 md:py-24 transition-opacity duration-700 ease-out ${revealed ? "opacity-100" : "opacity-0"}`}
    >
      <div className="w-full max-w-6xl bg-black/30 backdrop-blur-md rounded-2xl p-6 md:p-8 lg:p-10 shadow-2xl border border-white/20 text-white overflow-hidden">

        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-2">Experience</h2>
            <div className="w-16 h-1 bg-gradient-to-r from-orange-400 to-transparent rounded-full" />
          </div>
          <div className="flex items-center gap-4 relative z-20">
            <button
              onClick={prev}
              className="w-12 h-12 rounded-full border border-white/20 bg-white/5 backdrop-blur-sm flex items-center justify-center text-white hover:bg-orange-400 hover:text-black hover:border-orange-400 transition-all duration-300 hover:scale-110"
            >
              <i className="fas fa-chevron-left" />
            </button>
            <button
              onClick={next}
              className="w-12 h-12 rounded-full border border-white/20 bg-white/5 backdrop-blur-sm flex items-center justify-center text-white hover:bg-orange-400 hover:text-black hover:border-orange-400 transition-all duration-300 hover:scale-110"
            >
              <i className="fas fa-chevron-right" />
            </button>
          </div>
        </div>

        <div className="relative w-full overflow-hidden">
          {/* Ghost element of the tallest experience to enforce a perfectly responsive minimum height */}
          <div className="invisible pointer-events-none" aria-hidden="true">
            <h3 className="text-2xl md:text-3xl font-extrabold mb-4">
              {experiences[0].role}
            </h3>
            <p className="text-lg md:text-xl mb-2">
              Organization: {experiences[0].organization} ({experiences[0].location})
            </p>
            <p className="text-lg md:text-xl mb-4">
              Duration: {experiences[0].duration}
            </p>
            <ul className="list-disc list-outside ml-5 space-y-2 mb-4 text-base md:text-lg">
              {experiences[0].points.map((point, idx) => (
                <li key={idx}>{point}</li>
              ))}
            </ul>
            <div className="inline-block px-8 py-3 text-lg md:text-xl">
              View Certificate
            </div>
          </div>

          <div className="absolute top-0 left-0 w-full h-full">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={currentIndex}
                custom={direction}
                initial={(dir) => ({ opacity: 0, x: dir > 0 ? 100 : -100 })}
                animate={{ opacity: 1, x: 0 }}
                exit={(dir) => ({ opacity: 0, x: dir > 0 ? -100 : 100 })}
                transition={{ duration: 0.4 }}
                className="w-full h-full flex flex-col"
              >
                <h3 className="text-2xl md:text-3xl font-extrabold text-orange-400 mb-4">
                  {experiences[currentIndex].role}
                </h3>
                <p className="text-lg md:text-xl text-gray-300 mb-2">
                  <span className="font-semibold">Organization:</span> {experiences[currentIndex].organization}
                  {experiences[currentIndex].location && (
                    <span className="text-sm md:text-base text-gray-400 ml-2">({experiences[currentIndex].location})</span>
                  )}
                </p>
                <p className="text-lg md:text-xl text-gray-300 mb-4">
                  <span className="font-semibold">Duration:</span> {experiences[currentIndex].duration}
                </p>
                <ul className="list-disc list-outside ml-5 space-y-2 mb-4 text-base md:text-lg text-gray-300">
                  {experiences[currentIndex].points.map((point, idx) => (
                    <li key={idx}>{point}</li>
                  ))}
                </ul>
                <div className="mt-auto">
                  {experiences[currentIndex].certLink && (
                    <a
                      href={experiences[currentIndex].certLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block px-8 py-3 w-full md:w-auto text-center bg-gradient-to-r from-orange-400 to-orange-500 text-black hover:text-white font-bold rounded-2xl shadow-lg hover:shadow-orange-500/25 transition-all duration-300 text-lg md:text-xl"
                    >
                      View Certificate
                    </a>
                  )}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

      </div>
    </section>
  );
}
