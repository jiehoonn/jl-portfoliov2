/**
 * Portfolio Constants
 * Centralized constants for the portfolio application
 */

import { NavigationItem, Skill, ExperienceDetails, ProjectDetails } from '@/types/portfolio';

// Navigation menu items
export const NAVIGATION_ITEMS: NavigationItem[] = [
  { href: '#experience', label: 'Experience' },
  { href: '#projects', label: 'Projects' },
  { href: '#contact', label: 'Contact' }
];

// Skills data with proper typing
export const SKILLS: Skill[] = [
  { name: 'React', icon: '/skill-icons/react-icon.png' },
  { name: 'TypeScript', icon: '/skill-icons/typescript-icon.png' },
  { name: 'JavaScript', icon: '/skill-icons/javascript-icon.png' },
  { name: 'Python', icon: '/skill-icons/python-icon.png' },
  { name: 'Node.js', icon: '/skill-icons/node-icon.png' },
  { name: 'Java', icon: '/skill-icons/java-icon.png' },
  { name: 'Express', icon: '/skill-icons/express-icon.png' },
  { name: 'Flask', icon: '/skill-icons/flask-icon.png' },
  { name: 'MongoDB', icon: '/skill-icons/mongoDB-icon.png' },
  { name: 'SQL', icon: '/skill-icons/sql-icon.png' },
  { name: 'Firebase', icon: '/skill-icons/firebase-icon.png' },
  { name: 'AWS', icon: '/skill-icons/aws-icon.png' },
  { name: 'Docker', icon: '/skill-icons/docker-icon.png' },
  { name: 'Git', icon: '/skill-icons/git-icon.png' },
  { name: 'Figma', icon: '/skill-icons/figma-icon.png' },
  { name: 'Jira', icon: '/skill-icons/jira-icon.png' },
  { name: 'Agile', icon: '/skill-icons/agile-icon.png' },
  { name: 'Vercel', icon: '/skill-icons/vercel-icon.png' },
  { name: 'Pandas', icon: '/skill-icons/pandas-icon.png' },
  { name: 'NumPy', icon: '/skill-icons/numpy-icon.png' },
  { name: 'Matplotlib', icon: '/skill-icons/matplotlib-icon.png' },
  { name: 'BeautifulSoup', icon: '/skill-icons/beautifulsoup-icon.png' },
];

// Experience details
export const EXPERIENCE_DETAILS: ExperienceDetails = {
  "Freelance Software Engineer @ Jin Marketing": "Delivered scalable web solutions deployed on Vercel while leveraging AWS for data and image optimization to achieve faster load times and enhanced performance. I utilized Next.js and Tailwind CSS to craft consistent, responsive designs that provide user-friendly interfaces. Additionally, I engineered a Django-based admin dashboard tailored for non-tech-savvy business owners, centralizing control of all business websites and integrating Gmail API for real-time email notifications.",
  "Web Developer @ Arché Journal": "Enhanced user experience by designing and implementing responsive React components, including dynamic social media integration and visually distinct publication sections, which improved navigation clarity and increased user engagement by 23%. I successfully migrated deployment from manual FTP uploads to an automated Git-based workflow with AWS hosting optimization, reducing page load time by 35% and simplifying content updates for future development teams.",
  "Software Engineer Fellow @ BU Spark! Innovation Program": "Developed chatsqrd, an innovative adaptive educational app leveraging conversational AI through OpenAI API and speech recognition via ElevenLabs, significantly boosting accessibility and engagement for children struggling with traditional learning methods. I collaborated in Agile teams using Jira and Figma to rapidly iterate on conversational UI prototypes, integrating OpenAI APIs to improve learner outcomes and create more inclusive educational experiences."
};

// Project details
export const PROJECT_DETAILS: ProjectDetails = {
  "Docuquery": "Multi-tenant document Q&A platform built as a retrieval-augmented generation (RAG) system: users upload documents (PDF/DOCX/TXT), the backend chunks and embeds them, stores vectors in Qdrant, and answers natural-language queries by retrieving relevant chunks and calling an LLM (with source citations). The project combines a Python/FastAPI backend (SQLAlchemy, Pydantic), a Next.js + TypeScript frontend, and infrastructure patterns for production (Postgres, Redis cache, Qdrant, S3, SQS, Terraform, Docker Compose), and demonstrates end-to-end features such as tenant isolation, API auth, caching, monitoring, and unit tests.",
  "chatsqrd": "Built an adaptive educational app leveraging conversational AI through OpenAI API and speech recognition via ElevenLabs. Implemented a hybrid Firestore database structure that reduced database read operations by ~60% through efficient conversation history management. Engineered modular React frontend components and developed a fallback audio processing pipeline using MediaRecorder API for seamless speech-to-text transcription across various network and browser conditions.",
  "NBA Player Stats Predictor": "A small machine learning project that gathers historical NBA player and game data, engineers features, and trains predictive models to forecast player performance (e.g., points, rebounds, assists). The project contains data preprocessing scripts and modeling code in Python and Jupyter notebooks—along with evaluation and visualization routines to compare model performance and inspect predictions. It aims at exploring different feature sets and algorithms for player-level forecasting and includes utilities to reproduce experiments and inspect results.",
  "Trellis": "Trellis is a hackathon‑built, production‑minded AI workflow platform that converts natural‑language intents and CSV data into auditable, human‑approved processes—helping nonprofits cut manual workflow time by ~80%. It couples a modular Python/FastAPI backend (node‑based graph executor and LangGraph multi‑agent orchestration that runs propose→rebut→vote debate rounds) with a Next.js React/TypeScript frontend that consumes Server‑Sent Events to stream live agent reasoning into a DebateViewer and approval flow."
};

// GitHub repository links
export const PROJECT_GITHUB_LINKS: Record<string, string> = {
  'Docuquery': 'https://github.com/jiehoonn/docuquery',
  'chatsqrd': 'https://github.com/miloopark/chatchat/tree/dev',
  'NBA Player Stats Predictor': 'https://github.com/jiehoonn/nba-player-predictions',
  'Trellis': 'https://github.com/ebrivera/trellis'
};

// Contact information
export const CONTACT_INFO = {
  email: 'jiehoonn@bu.com',
  linkedin: 'https://www.linkedin.com/in/jiehoonlee2002/',
  github: 'https://github.com/jiehoonn'
};

// Animation and scroll constants
export const SCROLL_THRESHOLDS = {
  HERO_END: 0.8,
  EXPERIENCE_END: 1.8,
  CONTACT_START: 2.8
};

// 3D Model constants
export const MODEL_CONFIG = {
  LEGO: {
    scale: [0.2, 0.2, 0.2] as [number, number, number],
    position: [0, -5, 0] as [number, number, number],
    camera: { position: [0, 5, 30], fov: 20 }
  },
  LABUBU: {
    scale: [2, 2, 2] as [number, number, number],
    position: [0, 0, 0] as [number, number, number],
    camera: { position: [0, 2, 8], fov: 30 }
  },
  BABY_MILO: {
    scale: [2, 2, 2] as [number, number, number],
    position: [0, 0, 0] as [number, number, number],
    camera: { position: [0, 2, 24], fov: 30 }
  }
};

// Breakpoint constants for responsive design
export const BREAKPOINTS = {
  MOBILE: 401,
  TABLET: 626,
  DESKTOP: 1024
};

// Animation timing constants
export const ANIMATION_TIMINGS = {
  MENU_TRANSITION: 500,
  FADE_TRANSITION: 300,
  SCROLL_OFFSET: 100,
  ROTATION_SPEED: {
    SLOW: 0.002,
    MEDIUM: 0.003,
    FAST: 0.005
  }
};
