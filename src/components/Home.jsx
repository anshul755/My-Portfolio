import React, { useRef, useEffect, useState } from "react";
import { ChevronDown, Send } from "lucide-react";

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

function useTypedWords(words, speed = 100, pause = 1200) {
  const [index, setIndex] = useState(0);
  const [typed, setTyped] = useState('');
  const [deleting, setDeleting] = useState(false);
  const [cursor, setCursor] = useState(true);

  useEffect(() => {
    const word = words[index];
    const timeout = setTimeout(() => {
      setTyped((prev) => {
        if (!deleting) {
          const next = word.slice(0, prev.length + 1);
          if (next === word) setTimeout(() => setDeleting(true), pause);
          return next;
        } else {
          const next = prev.slice(0, -1);
          if (next === '') {
            setDeleting(false);
            setIndex((index + 1) % words.length);
          }
          return next;
        }
      });
    }, deleting ? speed / 2 : speed);

    return () => clearTimeout(timeout);
  }, [typed, deleting]);

  useEffect(() => {
    const blink = setInterval(() => setCursor(c => !c), 500);
    return () => clearInterval(blink);
  }, []);

  return typed + (cursor ? "|" : " ");
}

export default function Home() {
  const [ref, revealed] = useReveal();
  const typed = useTypedWords([
    "Full Stack Developer  ",
    "AI/ML Enthusiast  ",
    "Tech Explorer  "
  ]);

  const images = ["https://images.unsplash.com/photo-1672676434074-20ff3b80a9c0?auto=format&fit=crop&q=70&w=1280", "https://images.unsplash.com/photo-1605903211242-9821559b5b10?auto=format&fit=crop&q=70&w=1280"];
  const [bgIndex, setBgIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setBgIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 7000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="home"
      ref={ref}
      className={`scroll-mt-20 relative min-h-screen w-full flex flex-col items-center justify-center px-4 text-white text-center transition-opacity duration-700 ease-out overflow-hidden ${revealed ? "opacity-100" : "opacity-0"
        }`}
      style={{
        backgroundImage: `url(${images[bgIndex]})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        transition: "background-image 1s ease-in-out"
      }}
    >
      <div className="absolute inset-0 bg-black/50 z-0"></div>

      <div className="max-w-5xl mx-auto z-10 relative">
        <h1 className="text-4xl md:text-6xl font-extrabold mb-6 tracking-tight leading-snug">
          Hi, I’m <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-yellow-300">Anshul Patel</span>
        </h1>
        <h2 className="text-xl md:text-3xl font-medium mb-4 text-gray-300">
          I’m a <span className="text-orange-300 font-semibold">{typed}</span>
        </h2>
        <p className="text-md md:text-lg text-gray-400 max-w-2xl mx-auto mb-10">
          Crafting immersive digital experiences and AI-powered tools. Driven by curiosity, built on code. Let’s build the future—together.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
          <a
            href="/project"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById('project')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
              window.history.replaceState(null, '', '/project');
            }}
            className="flex items-center justify-center w-full sm:w-auto px-8 py-3 bg-gradient-to-r from-orange-400 to-orange-500 text-black hover:text-white font-bold rounded-xl shadow-lg hover:shadow-orange-500/25 transition-all duration-300"
          >
            View Projects
          </a>
          <a
            href="/contact"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
              window.history.replaceState(null, '', '/contact');
            }}
            className="flex items-center justify-center w-full sm:w-auto gap-2 px-8 py-3 border border-orange-400 text-orange-400 hover:text-white font-semibold rounded-xl transition"
          >
            <Send className="w-5 h-5" />
            Get in Touch
          </a>
        </div>
      </div>

      <div className="absolute bottom-10 animate-bounce text-orange-400 z-10">
        <a
          href={"#education"}
          className="text-orange text-lg font-medium hover:text-white transition-colors"
        >
          <ChevronDown className="w-8 h-8" />
        </a>
      </div>
    </section>
  );
}
