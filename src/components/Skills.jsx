import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import claudeLogo from './images/claude.svg';

const DI = 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons';

const skillCategories = [
  {
    category: 'Programming Languages',
    skills: [
      { name: 'Java', img: `${DI}/java/java-original.svg` },
      { name: 'Python', img: `${DI}/python/python-original.svg` },
      { name: 'JavaScript', img: `${DI}/javascript/javascript-original.svg` },
    ],
  },
  {
    category: 'Frameworks & Libraries',
    skills: [
      { name: 'Spring Boot', img: `${DI}/spring/spring-original.svg` },
      { name: 'React', img: `${DI}/react/react-original.svg` },
      { name: 'Node.js', img: `${DI}/nodejs/nodejs-original.svg` },
      { name: 'Express.js', img: `${DI}/express/express-original.svg`, invert: true },
      { name: 'FastAPI', img: `${DI}/fastapi/fastapi-original.svg` },
      { name: 'LangChain', icon: 'fas fa-link', color: '#22c55e' },
    ],
  },
  {
    category: 'Backend & APIs',
    skills: [
      { name: 'REST APIs', icon: 'fas fa-exchange-alt', color: '#60a5fa' },
      { name: 'Apache Kafka', img: `${DI}/apachekafka/apachekafka-original.svg`, invert: true },
      { name: 'Redis', img: `${DI}/redis/redis-original.svg` },
    ],
  },
  {
    category: 'Databases',
    skills: [
      { name: 'MySQL', img: `${DI}/mysql/mysql-original.svg` },
      { name: 'PostgreSQL', img: `${DI}/postgresql/postgresql-original.svg` },
      { name: 'MongoDB', img: `${DI}/mongodb/mongodb-original.svg` },
    ],
  },
  {
    category: 'DevOps & OS',
    skills: [
      { name: 'Docker', img: `${DI}/docker/docker-original.svg` },
      { name: 'Kubernetes', img: `${DI}/kubernetes/kubernetes-original.svg` },
      { name: 'Linux', img: `${DI}/linux/linux-original.svg` },
    ],
  },
  {
    category: 'Developer Tools',
    skills: [
      { name: 'Git', img: `${DI}/git/git-original.svg` },
      { name: 'GitHub', img: `${DI}/github/github-original.svg`, invert: true },
      { name: 'Claude Code', img: claudeLogo },
      { name: 'Postman', img: `${DI}/postman/postman-original.svg` },
      { name: 'Hoppscotch', icon: 'fas fa-rocket', color: '#28c840' },
    ],
  },
  {
    category: 'AI / ML & Data',
    skills: [
      { name: 'LangGraph', icon: 'fas fa-project-diagram', color: '#a78bfa' },
      { name: 'scikit-learn', img: `${DI}/scikitlearn/scikitlearn-original.svg` },
      { name: 'pandas', img: `${DI}/pandas/pandas-original.svg`, invert: true },
      { name: 'SentenceTransformers', icon: 'fas fa-language', color: '#fbbf24' },
      { name: 'NetworkX', icon: 'fas fa-share-alt', color: '#38bdf8' },
    ],
  },
];

const ITEMS_PER_PAGE = 4;
const totalPages = Math.ceil(skillCategories.length / ITEMS_PER_PAGE);

function useReveal(threshold = 0.15) {
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

export default function Skills() {
  const [page, setPage] = useState(0);
  const [direction, setDirection] = useState(0);
  const [sectionRef, revealed] = useReveal();

  const paginate = (newDir) => {
    setDirection(newDir);
    setPage((prev) => {
      const next = prev + newDir;
      if (next < 0) return totalPages - 1;
      if (next >= totalPages) return 0;
      return next;
    });
  };

  const currentCategories = skillCategories.slice(
    page * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE + ITEMS_PER_PAGE
  );

  return (
    <section
      id="skills"
      ref={sectionRef}
      className={`scroll-mt-20 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-24 transition-opacity duration-700 ease-out ${revealed ? 'opacity-100' : 'opacity-0'
        }`}
    >
      <div className="w-full max-w-7xl">
        {/* Outer glass container */}
        <div className="bg-black/30 backdrop-blur-md rounded-2xl border border-white/20 shadow-2xl p-8 md:p-12">
          {/* Header row */}
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-2">Skills</h2>
              <div className="w-16 h-1 bg-gradient-to-r from-orange-400 to-transparent rounded-full" />
            </div>

            <div className="flex items-center gap-4">
              {/* Page dots */}
              <div className="hidden sm:flex items-center gap-2">
                {Array.from({ length: totalPages }).map((_, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      setDirection(i > page ? 1 : -1);
                      setPage(i);
                    }}
                    className={`rounded-full transition-all duration-300 ${i === page
                      ? 'bg-orange-400 w-7 h-3'
                      : 'bg-white/20 hover:bg-white/40 w-3 h-3'
                      }`}
                  />
                ))}
              </div>

              {/* Arrow buttons */}
              <button
                onClick={() => paginate(-1)}
                className="w-12 h-12 rounded-full border border-white/20 bg-white/5 backdrop-blur-sm flex items-center justify-center text-white hover:bg-orange-400 hover:text-black hover:border-orange-400 transition-all duration-300 hover:scale-110"
              >
                <i className="fas fa-chevron-left" />
              </button>
              <button
                onClick={() => paginate(1)}
                className="w-12 h-12 rounded-full border border-white/20 bg-white/5 backdrop-blur-sm flex items-center justify-center text-white hover:bg-orange-400 hover:text-black hover:border-orange-400 transition-all duration-300 hover:scale-110"
              >
                <i className="fas fa-chevron-right" />
              </button>
            </div>
          </div>

          {/* Carousel area — fixed height keeps outer box stable between pages */}
          <div className="relative w-full overflow-hidden h-[1200px] sm:h-[600px] lg:h-[300px]">
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={page}
                custom={direction}
                initial={(dir) => ({ x: dir > 0 ? 200 : -200, opacity: 0 })}
                animate={{ x: 0, opacity: 1 }}
                exit={(dir) => ({ x: dir > 0 ? -200 : 200, opacity: 0 })}
                transition={{ duration: 0.2, ease: 'easeOut' }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch"
              >
                {currentCategories.map((cat) => (
                  <CategoryCard key={cat.category} cat={cat} />
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Skill icon renderer ---------- */
function SkillIcon({ skill }) {
  if (skill.img) {
    return (
      <img
        src={skill.img}
        alt={skill.name}
        className="w-5 h-5 object-contain shrink-0"
        style={skill.invert ? { filter: 'brightness(0) invert(1)' } : undefined}
        loading="lazy"
      />
    );
  }
  return (
    <i
      className={`${skill.icon} text-base`}
      style={{ color: skill.color || '#d1d5db', minWidth: '20px', textAlign: 'center' }}
    />
  );
}

/* ---------- Category card ---------- */
function CategoryCard({ cat }) {
  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-5 hover:border-orange-400/30 transition-all duration-300 hover:bg-white/[0.08] group flex flex-col h-[280px]">
      {/* Header */}
      <div className="flex items-center gap-2.5 mb-4 pb-3 border-b border-white/10">
        <div className="w-1.5 h-6 rounded-full bg-orange-400 shrink-0" />
        <h3 className="text-sm font-extrabold text-white uppercase tracking-widest">
          {cat.category}
        </h3>
      </div>

      {/* Skill pills */}
      <div className="flex flex-wrap gap-2">
        {cat.skills.map((skill) => (
          <motion.div
            key={skill.name}
            whileHover={{ scale: 1.05, y: -2 }}
            className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/[0.07] border border-white/[0.08] hover:bg-white/15 hover:border-orange-400/30 cursor-pointer transition-all duration-200"
          >
            <SkillIcon skill={skill} />
            <span className="text-[13px] font-semibold text-gray-200 whitespace-nowrap">
              {skill.name}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
