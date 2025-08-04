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
  "Software Development Intern @ Accelerant": "Currently designing sophisticated layered churn-prediction machine learning models while building the supporting Node.js/Express ETL pipeline integrated with PostgreSQL databases. I'm documenting comprehensive workflows in GitHub SOPs to enable real-time customer churn intervention capabilities for global teams, combining data science with robust backend engineering to deliver scalable business solutions.",
  "Frontend Engineer @ Jin Marketing": "Delivering scalable web solutions deployed on Vercel while leveraging AWS for data and image optimization to achieve faster load times and enhanced performance. I utilize Next.js and Tailwind CSS to craft consistent, responsive designs that provide user-friendly interfaces. Additionally, I engineered a Django-based admin dashboard tailored for non-tech-savvy business owners, centralizing control of all business websites and integrating Gmail API for real-time email notifications.",
  "Web Developer @ Arché Journal": "Enhanced user experience by designing and implementing responsive React components, including dynamic social media integration and visually distinct publication sections, which improved navigation clarity and increased user engagement by 23%. I successfully migrated deployment from manual FTP uploads to an automated Git-based workflow with AWS hosting optimization, reducing page load time by 35% and simplifying content updates for future development teams.",
  "Software Engineer Fellow @ BU Spark! Innovation Program": "Developed chatsqrd, an innovative adaptive educational app leveraging conversational AI through OpenAI API and speech recognition via ElevenLabs, significantly boosting accessibility and engagement for children struggling with traditional learning methods. I collaborated in Agile teams using Jira and Figma to rapidly iterate on conversational UI prototypes, integrating OpenAI APIs to improve learner outcomes and create more inclusive educational experiences."
};

// Project details
export const PROJECT_DETAILS: ProjectDetails = {
  "Stock Trading Platform": "Developed a comprehensive stock trading platform using React.js and Flask, featuring secure user account management with password hashing and SQLite database integration. The application includes interactive visualizations of historical stock trends through Alpha Vantage API integration and React charting libraries, enabling effective market data analysis. Containerized with Docker and implemented automated CI/CD pipelines using GitHub Actions to streamline deployments and enhance development efficiency.",
  "chatsqrd": "Built an adaptive educational app leveraging conversational AI through OpenAI API and speech recognition via ElevenLabs. Implemented a hybrid Firestore database structure that reduced database read operations by ~60% through efficient conversation history management. Engineered modular React frontend components and developed a fallback audio processing pipeline using MediaRecorder API for seamless speech-to-text transcription across various network and browser conditions.",
  "Jin Marketing Business Suite": "Designing and implementing multiple business websites using Figma, Next.js, and Tailwind CSS for various popular Boston establishments including Underdog Hot Chicken (underdoghotchickenboston.com), Han Nightclub (hanlounge.com), Gopchang Story (WIP), First Liquor Corporation (WIP), Sojuba (WIP), and Tofu Story (WIP). Co-engineering a comprehensive Django-based admin dashboard that centralizes management of all business operations, allowing the owner to control multiple websites from a single unified interface with a streamlined Next.js frontend.",
  "Spotify Playlist Recommender": "Developing a machine learning-powered music recommendation system to improve upon Spotify's current algorithm by better understanding individual music taste patterns. Integrating multiple APIs including Spotify API for user data and music features, Genius API for lyrical analysis, and Last.fm API for enhanced music metadata. The project aims to create a more personalized and accurate music discovery experience through advanced algorithmic analysis of listening habits and preferences Help me collect user data and preferences for model training! (https://spotify-recommender-app-frontend.vercel.app/)"
};

// GitHub repository links
export const PROJECT_GITHUB_LINKS: Record<string, string> = {
  'Stock Trading Platform': 'https://github.com/jiehoonn/411-finalproject',
  'chatsqrd': 'https://github.com/miloopark/chatchat/tree/dev',
  'Spotify Playlist Recommender': 'https://github.com/jiehoonn/spotify-song-recommender'
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
