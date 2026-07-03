const { GoogleGenerativeAI } = require("@google/generative-ai");
const { Pinecone } = require("@pinecone-database/pinecone");
require("dotenv").config();

const CONFIG = {
    pineconeIndex: process.env.PINECONE_INDEX || "portfolio-rag-768",
    modelName: "models/gemini-embedding-001",
    embeddingDim: 3072,
};

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const pinecone = new Pinecone({ apiKey: process.env.PINECONE_API_KEY });

const rawData = [
    {
        id: "greeting-identity",
        category: "General",
        title: "Greeting & AI Identity",
        text: `If the user says 'Hello', 'Hi', 'Hey', or asks 'Who are you?', respond with:
"Hello! I am Anshul's AI Portfolio Assistant. I can tell you about his projects (like InternNova, EchoMatrix, PageRank & LuxeLodge), his skills in Java, Spring Boot & Python, or his internship experiences at BinaryBits.co and TechSaksham. What would you like to know?"
I am an AI interface for Anshul Patel's portfolio.`,
        topics: ["hello", "hi", "hey", "greetings", "who are you", "identity"]
    },
    {
        id: "bio-contact",
        category: "Personal",
        title: "Contact & Bio",
        text: `Name: Anshul Patel.
Role: Software Engineer & Backend Developer. Also interested in AI/ML and Full Stack Development.
Location: Ahmedabad, Gujarat, India.
Contact: anshulpatel2023@gmail.com | +91 63531 43083.
Links: LinkedIn, GitHub (anshul755).
Summary: A Computer Science Engineering student with a strong focus on Software Engineering & Backend Development. Currently working with Spring Boot, FastAPI, and Microservices, and actively learning how scalable, distributed systems are architected. Aims to evolve into a well-rounded software engineer by mastering system architecture, API design, and production-grade backend practices. Actively exploring Cloud Computing and Generative AI. Enjoys participating in hackathons and building real-world applications ranging from scalable microservices and semantic search platforms to AI-powered recruitment portals.`,
        topics: ["contact", "email", "location", "bio", "about", "summary"]
    },
    {
        id: "education",
        category: "Personal",
        title: "Education History",
        text: `Degree: B.Tech in Computer Science and Engineering.
Institution: Institute of Technology, Nirma University (2023-2027).
Current Semester: 6.
Performance: Current CGPA 8.59/10.00.
Focus: Software Engineering, Backend Development using Spring Boot, exploring Generative AI technologies.
Key Coursework: Data Structures & Algorithms (DSA), Object-Oriented Programming (OOP), Database Management Systems (DBMS), Machine Learning (ML), Operating Systems (OS).
High School: Purohit Science School (HSC) - 78.7%. ACPC State Rank: 529.
Activities: Hackathons, tech workshops, and open-source contributions.`,
        topics: ["education", "university", "cgpa", "courses", "nirma", "semester"]
    },
    {
        id: "skills-languages",
        category: "Skills",
        title: "Programming Languages",
        text: `Programming Languages: Java, Python, JavaScript.
Java: Primary language for backend development with Spring Boot. Used extensively in projects like InternNova and PageRank Visualizer.
Python: Used for AI/ML projects, FastAPI backends, data science (pandas, scikit-learn, XGBoost), and automation.
JavaScript: Used for React.js frontends, Node.js/Express.js backends.`,
        topics: ["skills", "java", "python", "javascript", "programming", "languages"]
    },
    {
        id: "skills-frameworks",
        category: "Skills",
        title: "Frameworks & Libraries",
        text: `Frameworks & Libraries:
- Spring Boot: Java-based backend framework for building microservices (used in InternNova, PageRank Visualizer).
- React.js: Frontend library for building user interfaces (used in EchoMatrix, PageRank Visualizer, Portfolio).
- Node.js & Express.js: JavaScript runtime and web framework for backend services (used in LuxeLodge, Portfolio RAG server).
- FastAPI: Python-based high-performance API framework (used in InternNova AI services, EchoMatrix backend).
- LangChain & LangGraph: AI orchestration frameworks for building LLM-powered pipelines (used in InternNova for candidate evaluation).
- scikit-learn: Machine learning library for model training and evaluation.
- SentenceTransformers: For embedding-based semantic retrieval (used in EchoMatrix).
- NetworkX: For graph-based data exploration and community detection (used in EchoMatrix).
- pandas: Data manipulation and analysis library.`,
        topics: ["skills", "spring boot", "react", "node", "fastapi", "langchain", "langgraph", "frameworks"]
    },
    {
        id: "skills-backend-devops",
        category: "Skills",
        title: "Backend, DevOps & Tools",
        text: `Backend & APIs: REST APIs, Apache Kafka (event streaming), Redis (caching).
Databases: MySQL, PostgreSQL, MongoDB.
DevOps & OS: Docker (containerization), Kubernetes (orchestration), Linux.
Developer Tools: Git, GitHub, Claude Code (AI coding assistant), Postman, Hoppscotch (API testing).
AI/ML & Data: LangGraph, scikit-learn, pandas, SentenceTransformers, NetworkX.
Cloud & Deployment: DigitalOcean, Vercel, GitHub Actions CI/CD.`,
        topics: ["skills", "docker", "kubernetes", "kafka", "redis", "postgresql", "mysql", "mongodb", "devops", "tools", "databases"]
    },
    {
        id: "achievements",
        category: "Achievements",
        title: "Coding Achievements & Certifications",
        text: `Competitive Programming:
- LeetCode: Solved 700+ questions. Max Rating: 1651.
- Codeforces: Max Rating 966.
Hackathons:
- Runner-Up, HACKaMINED'26 (DevX Track), Nirma University.
- Finalist in Odoo X Gujarat Vidyapith Hackathon 2026, selected among 72 teams.
Certifications:
- AWS Academy Graduate – Cloud Foundations (Badge Credentials).
- Google Developer Groups Solution Challenge 2025.
- AICTE Internship on AI (TechSaksham, Microsoft & SAP Initiative).`,
        topics: ["leetcode", "codeforces", "awards", "certifications", "competitive programming", "hackathon", "aws", "hackamined", "odoo"]
    },
    {
        id: "experience-binarybits",
        category: "Experience",
        title: "Software Engineering Internship at BinaryBits.co",
        text: `Role: Software Engineering Intern at BinaryBits.co.
Dates: May 2026 – June 2026 (On Site).
Key Contributions:
1. Contributed to the development of a microservices-based restaurant management platform using React, Node.js, FastAPI, PostgreSQL, Kafka, and Redis.
2. Worked on backend services and API integrations supporting order processing, payments, notifications, and analytics.
3. Assisted in implementing AI-powered chat and voice ordering features to enhance customer experience and streamline restaurant operations.
4. Collaborated with team members to improve the performance, reliability, and maintainability of distributed services across the platform.
Tech Stack: React, Node.js, FastAPI, PostgreSQL, Kafka, Redis, Microservices.`,
        topics: ["internship", "experience", "binarybits", "software engineering", "microservices", "backend", "kafka", "redis"]
    },
    {
        id: "experience-techsaksham",
        category: "Experience",
        title: "AI Internship at TechSaksham",
        text: `Role: AI Intern at TechSaksham (Microsoft & SAP Initiative).
Dates: Dec 2024 - Jan 2025 (Remote).
Key Projects during Internship:
1. Gesture-controlled music player using DeepFace, MediaPipe, and OpenCV.
2. AI-powered mood-based music recommendation system using Streamlit.
Impact: Enhanced real-time user interaction with facial and gesture recognition technologies.`,
        topics: ["internship", "experience", "ai", "computer vision", "microsoft", "techsaksham"]
    },
    {
        id: "internnova-overview",
        category: "Project",
        title: "InternNova - Overview",
        text: `Project Name: InternNova.
Date: June 2026.
Summary: AI-Powered Microservices Recruitment Platform.
Description: A full-stack microservices recruitment platform built using Spring Boot, FastAPI, MongoDB, and Docker. Designed and developed a scalable architecture consisting of five containerized services orchestrated with Docker Compose and deployed to DigitalOcean using GitHub Actions CI/CD. Developed the Core Service handling authentication, profile management, job board CRUD, application workflows, Cloudinary file uploads, SMTP email notifications, and CRON-based job scheduling. Integrated an AI-powered candidate evaluation pipeline using LangGraph and LangChain to analyze resumes, detect timeline anomalies, score candidates against job descriptions, and automatically generate tailored LaTeX-based PDF resumes.
Links: GitHub - https://github.com/anshul755/InternNova | Live - https://intern-nova.in`,
        topics: ["internnova", "recruitment", "microservices", "spring boot", "fastapi", "docker", "langchain", "langgraph", "ai"]
    },
    {
        id: "internnova-tech",
        category: "Project",
        title: "InternNova - Tech Stack & Architecture",
        text: `Tech Stack for InternNova:
Backend: Java Spring Boot (Core Service), Python FastAPI (AI Service).
Database: MongoDB.
Infrastructure: Docker, Docker Compose, DigitalOcean, GitHub Actions CI/CD.
AI Pipeline: LangGraph, LangChain for candidate evaluation, resume analysis, timeline anomaly detection, and automated LaTeX PDF resume generation.
Features: Authentication, profile management, job board CRUD, application workflows, Cloudinary file uploads, SMTP email notifications, CRON-based job scheduling.
Architecture: 5 containerized microservices orchestrated with Docker Compose.`,
        topics: ["internnova", "java", "spring boot", "fastapi", "docker", "mongodb", "microservices", "architecture"]
    },
    {
        id: "echomatrix-overview",
        category: "Project",
        title: "EchoMatrix - Overview",
        text: `Project Name: EchoMatrix.
Date: April 2026.
Summary: Investigative Intelligence & Semantic Analytics Platform.
Description: A full-stack investigative intelligence platform designed for semantic search, temporal analysis, and graph-based data exploration. Built using React.js, FastAPI, pandas, scikit-learn, and SentenceTransformers. Implemented embedding-based semantic retrieval, topic clustering with KMeans, interactive dashboards for time-series analysis, network visualization, and community detection using NetworkX. Optimized analytics performance through backend dataset caching, embedding warm-up, and lazy-loaded frontend routes, enabling faster and more efficient investigative workflows.
Links: GitHub - https://github.com/anshul755/EchoMatrix | Live - https://echo-matrix.vercel.app`,
        topics: ["echomatrix", "semantic search", "analytics", "react", "fastapi", "machine learning", "networkx"]
    },
    {
        id: "rul-overview",
        category: "Project",
        title: "Predictive Maintenance (RUL) - Overview",
        text: `Project Name: Predictive Maintenance Using Sensor Data.
Date: November 2025.
Goal: Estimate the Remaining Useful Life (RUL) of turbofan engines using the NASA C-MAPSS dataset (FD001).
Approach: A machine learning regression problem to predict engine failure before it occurs using sensor data (temperature, pressure, vibration).
Pipeline: Data loading -> EDA -> Feature Engineering -> Model Training -> Evaluation.
Best Model: XGBoost Regressor with RMSE 19.85 and R² 0.77.
Tested Models: Linear Regression, SVR, Decision Tree, Random Forest, XGBoost.
Key Insight: Sensor data patterns showed clear degradation trends over the engine lifecycle.`,
        topics: ["machine learning", "python", "predictive maintenance", "nasa", "xgboost", "rmse", "data science"]
    },
    {
        id: "pagerank-overview",
        category: "Project",
        title: "PageRank Visualizer - Overview",
        text: `Project Name: Page Rank Visualizer.
Date: November 2025.
Description: An interactive web-based tool that visualizes how Google's PageRank algorithm works. Users can build directed graphs, run PageRank iterations, and observe how importance distributes across nodes in real-time.
Core Logic: Uses the iterative formula PR(v) = (1 - d) / N + d * Σ [ PR(u) / L(u) ] where 'd' is the damping factor (default 0.85).
Features: Dynamic graph creation, damping factor control, result animation, and an API for PageRank computation. Ideal for students and developers exploring graph theory, search ranking, and algorithm behavior.
Tech Stack: Frontend - React.js, JavaScript, CSS (Deployed on Vercel). Backend - Java, Spring Boot, Maven (Containerized with Docker). Database - MongoDB. Architecture - REST API between React frontend and Spring Boot backend.
Links: GitHub - https://github.com/anshul755/Page-Rank-Visualizer | Live - https://page-rank-visualizer.vercel.app/`,
        topics: ["pagerank", "algorithm", "graph", "visualization", "java", "spring boot", "react", "docker"]
    },
    {
        id: "luxelodge-overview",
        category: "Project",
        title: "LuxeLodge - Overview",
        text: `Project Name: LuxeLodge.
Date: May 2025.
Summary: Modern Lodge Management System.
Description: Built a modern, full-stack lodge management system with secure user authentication, dynamic room listings, image uploads via Cloudinary, and a booking management dashboard. Server-rendered with EJS for smooth, SEO-friendly pages and Bootstrap for responsive design.
Features: User Authentication (Passport.js), Role-Based Access, Media Management (Cloudinary), Booking System.
Tech Stack: Backend - Node.js, Express.js. Frontend - EJS Templating, Bootstrap, CSS. Database - MongoDB (Mongoose ORM). Auth & Media - Passport.js, Cloudinary.
Links: GitHub - https://github.com/anshul755/LuxeLodge | Live - https://luxelodge.onrender.com/`,
        topics: ["luxelodge", "web dev", "full stack", "management system", "booking", "node.js", "express", "mongodb"]
    },
    {
        id: "neuralagri-overview",
        category: "Project",
        title: "NeuralAgri - Overview",
        text: `Project Name: NeuralAgri.
Date: March 2025.
Summary: AI-Powered Agricultural Advisory System.
Description: Built a cross-platform farming assistant integrating ML models for crop yield prediction, disease detection, and personalized crop recommendations. Used React, Flask, TensorFlow, PyTorch, and Google Earth Engine to provide real-time insights, satellite-based soil moisture, and a Hindi-supported chatbot for small and marginal farmers.
Links: GitHub - https://github.com/anshul755/NeuralAgri | Live - https://neuralagri.web.app/`,
        topics: ["neuralagri", "agriculture", "ai", "ml", "react", "flask", "tensorflow", "pytorch"]
    },
    {
        id: "smartmusic-overview",
        category: "Project",
        title: "SmartMusic - Overview",
        text: `Project Name: SmartMusic (Mood and Gesture Activated Smart Music System).
Date: January 2025.
Description: Developed an AI-powered music player that detects facial emotions and hand gestures to control playback using DeepFace, MediaPipe, and OpenCV. Integrated Streamlit for a user-friendly interface, allowing real-time webcam-based interaction. The system identifies moods like happiness, sadness, and anger, playing corresponding songs while enabling gesture-based playback control.
Links: GitHub - https://github.com/anshul755/Mood-and-Gesture-Activated-Smart-Music-System`,
        topics: ["smartmusic", "music", "ai", "computer vision", "deepface", "mediapipe", "opencv", "python"]
    },
    {
        id: "library-system",
        category: "Project",
        title: "Library System - Overview",
        text: `Project Name: Library System.
Date: October 2024.
Summary: Java-Based Library Management System.
Description: A simple Java-based Library Management System that uses a Binary Search Tree (BST) to store, search, and manage books. Each book is represented by its ISBN, title, author, and published year. The system allows users to add, search, delete, and display books in an ordered format.
Links: GitHub - https://github.com/anshul755/LibrarySystem`,
        topics: ["library", "java", "bst", "data structures"]
    }
];

async function ensureIndex() {
    console.log(`Checking Pinecone index: "${CONFIG.pineconeIndex}"...`);
    try {
        const list = await pinecone.listIndexes();
        const indexes = list.indexes ? list.indexes : list;
        const existingIndex = indexes.find(i => (i.name || i) === CONFIG.pineconeIndex);

        if (existingIndex) {
            console.log(`   Found index "${CONFIG.pineconeIndex}". Checking dimensions...`);
            try {
                const description = await pinecone.describeIndex(CONFIG.pineconeIndex);
                if (description.dimension === CONFIG.embeddingDim) {
                    console.log("Index exists and dimensions match.");
                    return;
                }
                console.log(`Dimension Mismatch! Index has ${description.dimension}, but we need ${CONFIG.embeddingDim}.`);
                console.log("Deleting old index to recreate it with correct dimensions...");
                await pinecone.deleteIndex(CONFIG.pineconeIndex);
                console.log("Deletion in progress... Waiting 20 seconds to ensure cleanup...");
                await new Promise(r => setTimeout(r, 20000));
            } catch (descError) {
                console.log("   (Could not describe index, assuming it needs recreation due to error context)");
            }
        }

        console.log(`Creating Index "${CONFIG.pineconeIndex}" (Dims: ${CONFIG.embeddingDim})...`);
        await pinecone.createIndex({
            name: CONFIG.pineconeIndex,
            dimension: CONFIG.embeddingDim,
            metric: "cosine",
            spec: {
                serverless: { cloud: "aws", region: "us-east-1" },
            },
        });
        console.log("Index created. Waiting 30s for initialization...");
        await new Promise(r => setTimeout(r, 30000));
    } catch (err) {
        console.error("Error ensuring index:", err);
        process.exit(1);
    }
}

async function generateEmbedding(text) {
    try {
        const model = genAI.getGenerativeModel({ model: CONFIG.modelName });
        const result = await model.embedContent(text);
        return result.embedding.values;
    } catch (err) {
        console.error("Embedding generation failed:", err.message);
        throw err;
    }
}

async function seed() {
    try {
        console.log("Starting Seeding Process...");
        await ensureIndex();

        const index = pinecone.index(CONFIG.pineconeIndex);
        const vectors = [];

        console.log(`Processing ${rawData.length} data chunks...`);

        for (const [i, item] of rawData.entries()) {
            const contentToEmbed = `${item.title}:\n${item.text}`;
            const embedding = await generateEmbedding(contentToEmbed);

            vectors.push({
                id: item.id,
                values: embedding,
                metadata: {
                    text: item.text,
                    title: item.title,
                    category: item.category,
                    topics: item.topics
                }
            });

            process.stdout.write(`\rEmbeddings generated: ${i + 1}/${rawData.length}`);
        }

        console.log("\nUpserting vectors to Pinecone...");
        await index.upsert(vectors);

        console.log("SUCCESS: Portfolio data successfully indexed!");
        console.log("---------------------------------------------");
        console.log(`Index: ${CONFIG.pineconeIndex}`);
        console.log(`Vectors: ${vectors.length}`);
        console.log(`Model: ${CONFIG.modelName}`);

    } catch (error) {
        console.error("CRITICAL ERROR:", error);
        process.exit(1);
    }
}

seed();