import React, { useRef, useState, useEffect } from 'react';
import { Mail, Download } from 'lucide-react';

function useReveal(threshold = 0.2) {
  const ref = useRef(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setRevealed(entry.isIntersecting),
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);

  return [ref, revealed];
}

export default function About() {
  const [ref, revealed] = useReveal();

  return (
    <section
      id="about"
      ref={ref}
      className={`scroll-mt-20 w-full flex items-center justify-center px-4 sm:px-6 py-4 lg:py-6 transition-opacity duration-700 ease-out
        ${revealed ? 'opacity-100' : 'opacity-0'}`}
    >
      <div className="w-full max-w-5xl relative bg-white/10 dark:bg-gray-900/10 backdrop-blur-lg rounded-2xl p-5 lg:p-6 shadow-lg border border-white/20 overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 lg:gap-6 items-center">

          {/* Image Section */}
          <div className="flex justify-center relative group lg:order-last">
            <div className="absolute inset-0 bg-gradient-to-tr from-orange-500/40 to-transparent rounded-2xl blur-xl opacity-50 group-hover:opacity-80 transition-opacity duration-700" />
            <div className="relative w-48 h-48 sm:w-56 sm:h-56 lg:w-[400px] lg:h-[400px] rounded-2xl overflow-hidden border border-white/20 shadow-xl transition-transform duration-700 group-hover:scale-[1.02]">
              <img
                src="https://www.dropbox.com/scl/fi/0alki56r8dj3ikdvpix50/Anshul.jpeg?rlkey=4ptc71fwwvr10ppey498xsfpp&st=sa4ueako&raw=1"
                alt="Anshul Patel"
                loading="lazy"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Text Section */}
          <div className="flex flex-col justify-center space-y-3 text-white relative z-10 lg:order-first">
            <div>
              <h2 className="text-3xl font-extrabold text-white mb-1">About Me</h2>
              <div className="w-12 h-1 bg-gradient-to-r from-orange-400 to-transparent rounded-full" />
            </div>

            <div className="space-y-2 text-sm text-gray-300 leading-relaxed">
              <p>
                Hi, I'm <span className="font-semibold text-orange-400">Anshul Patel</span>,
                a Computer Science Engineering student with a strong focus on
                <span className="font-semibold text-white"> Software Engineering & Backend Development</span>.
                I'm currently working with <span className="font-semibold text-orange-400">Spring Boot, FastAPI, and Microservices</span>,
                and actively learning how scalable, distributed systems are architected.
              </p>
              <p>
                I aim to evolve into a well-rounded software engineer by mastering
                <span className="font-semibold text-white"> system architecture, API design</span>,
                and production-grade backend practices. I am actively exploring <span className="font-semibold text-orange-400">Cloud Computing</span> and <span className="font-semibold text-orange-400">Generative AI</span>.
              </p>
              <p>
                I enjoy participating in hackathons and building real-world applications. Over time, I have built projects ranging from scalable microservices and semantic search platforms to AI-powered recruitment portals.
              </p>
            </div>

            <div className="text-sm pt-1">
              <h3 className="font-semibold text-orange-400 mb-1">Tech Stack:</h3>
              <ul className="list-disc list-outside ml-5 space-y-0.5 text-gray-300">
                <li><span className="font-medium text-orange-400">Languages:</span> Java, Python, JavaScript</li>
                <li><span className="font-medium text-orange-400">Frameworks & Libraries:</span> Spring Boot, Node.js, FastAPI, React.js, LangChain</li>
                <li><span className="font-medium text-orange-400">Backend & Databases:</span> REST APIs, Kafka, MySQL, PostgreSQL, MongoDB</li>
                <li><span className="font-medium text-orange-400">DevOps & Cloud:</span> Docker, Kubernetes, Linux</li>
              </ul>
            </div>
            <div className="mt-4 flex flex-col sm:flex-row gap-3 pt-3 border-t border-white/10">
              <a
                href="/contact"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  window.history.replaceState(null, '', '/contact');
                }}
                className="inline-flex items-center justify-center px-6 py-2 bg-gradient-to-r from-orange-400 to-orange-500 text-black hover:text-white font-bold rounded-lg shadow-lg hover:shadow-orange-500/25 transition-all duration-300 w-full sm:w-auto"
              >
                Open to Opportunities
              </a>
              <a
                href="https://drive.google.com/file/d/1_cAV6JbpofzQeq2IB9VEZS7P90bulIPB/view?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-6 py-2 bg-white/5 border border-white/20 text-white hover:border-orange-400 hover:text-orange-400 font-bold rounded-lg shadow-lg hover:shadow-orange-500/10 transition-all duration-300 w-full sm:w-auto"
              >
                <Download className="w-5 h-5 mr-2" />
                Resume
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
