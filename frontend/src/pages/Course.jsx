"use client";

import { motion } from "framer-motion";
import Navbar from "../Navbar";
import Footer from "../Footer";
import { 
  Search, 
  Clock, 
  Users, 
  Star, 
  BookOpen, 
  Code, 
  Brain, 
  Database, 
  Smartphone,
  Shield,
  TrendingUp,
  ChevronRight,
  CheckCircle,
  Target,
  Award,
  Briefcase,
  Palette,
  Megaphone
} from "lucide-react";
import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import FloatingSocialGlass from "../FloatingSocialGlass";

/* ---------------- ANIMATION VARIANTS ---------------- */
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5 } },
};

const scaleUp = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.4 } },
};

/* ---------------- CATEGORIES ---------------- */
const categories = [
  { id: "all", name: "All Tutors", icon: Code, count: 70 },
  { id: "ai-ml", name: "AI & ML", icon: Brain, count: 10 },
  { id: "web-dev", name: "Web Dev", icon: Code, count: 10 },
  { id: "data-science", name: "Data Science", icon: Database, count: 10 },
  { id: "mobile", name: "Mobile", icon: Smartphone, count: 10 },
  { id: "UIUX", name: "UI/UX Design", icon: Palette, count: 10 },
  { id: "Digital-marketing", name: "Digital Marketing", icon: Megaphone, count: 10 },
  // { id: "cybersecurity", name: "Cybersecurity", icon: Shield, count: 10 },
];

/* ---------------- AI TUTORS DATA ---------------- */
const aiTutors = [
  /* --- AI & ML --- */
  {
    id: 1,
    title: "AI & ML Basics Tutor",
    category: "ai-ml",
    description: "Learn AI fundamentals and machine learning algorithms interactively.",
    level: "Beginner",
    students: 1500,
    rating: 4.8,
    modules: 20,
    skills: ["Python", "Scikit-learn", "NumPy", "Pandas"],
    detailedDescription: "Covers supervised and unsupervised learning, feature engineering, model evaluation, and hands-on projects."
  },
  {
    id: 2,
    title: "Deep Learning AI Tutor",
    category: "ai-ml",
    description: "Master deep learning and neural networks with interactive projects.",
    level: "Intermediate",
    students: 980,
    rating: 4.9,
    modules: 25,
    skills: ["TensorFlow", "Keras", "CNN", "RNN"],
    detailedDescription: "Focuses on building CNN, RNN, LSTM models and deploying deep learning solutions."
  },
  { id: 3, title: "Reinforcement Learning Tutor", category: "ai-ml", description: "Learn reinforcement learning techniques and Q-learning algorithms.", level: "Advanced", students: 500, rating: 4.7, modules: 18, skills: ["Python", "RL", "Gym", "Deep Q-Learning"], detailedDescription: "Build RL agents and train them on simulations and games." },
  { id: 4, title: "NLP AI Tutor", category: "ai-ml", description: "Understand natural language processing and text analysis.", level: "Intermediate", students: 750, rating: 4.8, modules: 22, skills: ["Python", "NLTK", "Spacy", "Transformers"], detailedDescription: "Work with text data, sentiment analysis, and transformer models." },
  { id: 5, title: "Computer Vision AI Tutor", category: "ai-ml", description: "Learn image recognition and object detection techniques.", level: "Intermediate", students: 680, rating: 4.9, modules: 24, skills: ["OpenCV", "Python", "CNN", "YOLO"], detailedDescription: "Build image classification, detection, and segmentation projects." },
  { id: 6, title: "ML Ops Tutor", category: "ai-ml", description: "Deploy machine learning models into production.", level: "Advanced", students: 410, rating: 4.7, modules: 20, skills: ["Docker", "Kubernetes", "Python", "Flask"], detailedDescription: "Learn model serving, versioning, and pipeline automation." },
  { id: 7, title: "AI Ethics & Governance Tutor", category: "ai-ml", description: "Understand ethical implications of AI systems.", level: "Intermediate", students: 390, rating: 4.6, modules: 15, skills: ["AI Policy", "Bias Detection", "Ethics"], detailedDescription: "Covers AI fairness, bias detection, and regulatory frameworks." },
  { id: 8, title: "Generative AI Tutor", category: "ai-ml", description: "Learn to create AI-generated content.", level: "Intermediate", students: 550, rating: 4.8, modules: 18, skills: ["Python", "GANs", "Diffusion Models"], detailedDescription: "Build generative models for images, text, and audio." },
  { id: 9, title: "Time Series AI Tutor", category: "ai-ml", description: "Analyze and forecast time series data with AI.", level: "Intermediate", students: 470, rating: 4.7, modules: 16, skills: ["Python", "Pandas", "ARIMA", "LSTM"], detailedDescription: "Forecast trends and analyze temporal data using ML models." },
  { id: 10, title: "AI Research Assistant Tutor", category: "ai-ml", description: "Assist in AI research with advanced modeling techniques.", level: "Advanced", students: 310, rating: 4.9, modules: 28, skills: ["Python", "PyTorch", "Research", "Mathematics"], detailedDescription: "Design experiments, run simulations, and generate research insights." },

  /* --- Web Development --- */
  { id: 11, title: "Frontend Web Development Tutor", category: "web-dev", description: "Learn HTML, CSS, and JavaScript with AI guidance.", level: "Beginner", students: 2000, rating: 4.7, modules: 18, skills: ["HTML", "CSS", "JS", "React"], detailedDescription: "Covers responsive design, DOM manipulation, and building dynamic UIs." },
  { id: 12, title: "Backend Web Development Tutor", category: "web-dev", description: "Learn Node.js, Express, and databases with AI assistance.", level: "Intermediate", students: 1250, rating: 4.8, modules: 22, skills: ["Node.js", "Express", "MongoDB", "SQL"], detailedDescription: "Build REST APIs, integrate databases, and deploy backend services." },
  { id: 13, title: "Full Stack Web Tutor", category: "web-dev", description: "Master both frontend and backend web development.", level: "Advanced", students: 980, rating: 4.9, modules: 26, skills: ["React", "Node.js", "MongoDB", "TypeScript"], detailedDescription: "Combine frontend and backend skills to build full applications." },
  { id: 14, title: "React Web Tutor", category: "web-dev", description: "Specialize in building React applications.", level: "Intermediate", students: 1200, rating: 4.8, modules: 20, skills: ["React", "Redux", "Hooks"], detailedDescription: "Learn component-based design, state management, and routing." },
  { id: 15, title: "Vue.js Web Tutor", category: "web-dev", description: "Learn Vue.js and build interactive web apps.", level: "Intermediate", students: 950, rating: 4.7, modules: 18, skills: ["Vue.js", "Vuex", "Composition API"], detailedDescription: "Create reactive web applications using Vue ecosystem." },
  { id: 16, title: "Angular Web Tutor", category: "web-dev", description: "Build scalable applications using Angular.", level: "Intermediate", students: 850, rating: 4.7, modules: 22, skills: ["Angular", "TypeScript", "RxJS"], detailedDescription: "Covers components, services, routing, and state management." },
  { id: 17, title: "Next.js Web Tutor", category: "web-dev", description: "Learn server-side rendering with Next.js.", level: "Advanced", students: 720, rating: 4.8, modules: 20, skills: ["Next.js", "React", "SSR"], detailedDescription: "Build optimized web apps with SEO and server-side rendering." },
  { id: 18, title: "WordPress Tutor", category: "web-dev", description: "Learn to create websites with WordPress.", level: "Beginner", students: 1100, rating: 4.6, modules: 15, skills: ["WordPress", "PHP", "Plugins"], detailedDescription: "Build websites, customize themes, and manage content." },
  { id: 19, title: "Web Accessibility Tutor", category: "web-dev", description: "Learn web accessibility standards.", level: "Beginner", students: 650, rating: 4.7, modules: 12, skills: ["WCAG", "HTML", "ARIA"], detailedDescription: "Ensure websites are accessible to all users." },
  { id: 20, title: "Progressive Web App Tutor", category: "web-dev", description: "Build PWAs with offline capabilities.", level: "Intermediate", students: 550, rating: 4.8, modules: 18, skills: ["PWA", "Service Workers", "JS"], detailedDescription: "Learn caching, offline support, and push notifications." },

  /* --- Data Science --- */
  { id: 21, title: "Data Analysis Tutor", category: "data-science", description: "Learn to analyze datasets and extract insights with Python.", level: "Beginner", students: 1700, rating: 4.8, modules: 20, skills: ["Python", "Pandas", "NumPy", "Matplotlib"], detailedDescription: "Covers data cleaning, visualization, and basic statistical analysis." },
  { id: 22, title: "Advanced Data Science Tutor", category: "data-science", description: "Master data pipelines, ML models, and advanced analytics.", level: "Advanced", students: 1100, rating: 4.9, modules: 30, skills: ["Python", "ML", "Big Data", "SQL"], detailedDescription: "Focuses on building end-to-end data pipelines, feature engineering, and predictive models." },
  { id: 23, title: "Statistics for Data Science", category: "data-science", description: "Learn statistical concepts for data analysis.", level: "Beginner", students: 950, rating: 4.7, modules: 18, skills: ["Statistics", "Python", "R"], detailedDescription: "Covers probability, hypothesis testing, and statistical modeling." },
  { id: 24, title: "Data Visualization Tutor", category: "data-science", description: "Master visualization techniques using Python and tools.", level: "Intermediate", students: 900, rating: 4.8, modules: 16, skills: ["Matplotlib", "Seaborn", "Tableau"], detailedDescription: "Create impactful charts and dashboards." },
  { id: 25, title: "Big Data Tutor", category: "data-science", description: "Learn big data technologies like Spark and Hadoop.", level: "Advanced", students: 700, rating: 4.8, modules: 22, skills: ["Spark", "Hadoop", "Python"], detailedDescription: "Process large datasets efficiently and build analytics pipelines." },
  { id: 26, title: "SQL & Databases Tutor", category: "data-science", description: "Learn database management and SQL queries.", level: "Beginner", students: 800, rating: 4.7, modules: 15, skills: ["SQL", "PostgreSQL", "MySQL"], detailedDescription: "Query, manage, and optimize relational databases." },
  { id: 27, title: "Python for Data Science Tutor", category: "data-science", description: "Master Python for analysis and ML.", level: "Intermediate", students: 1000, rating: 4.8, modules: 20, skills: ["Python", "Pandas", "NumPy"], detailedDescription: "Work on real datasets and implement ML algorithms." },
  { id: 28, title: "Machine Learning for Data Science", category: "data-science", description: "Apply ML models to data science projects.", level: "Intermediate", students: 750, rating: 4.8, modules: 22, skills: ["Python", "Scikit-learn", "ML"], detailedDescription: "Build predictive models and evaluate performance." },
  { id: 29, title: "Data Cleaning & Preprocessing Tutor", category: "data-science", description: "Learn data preprocessing techniques.", level: "Beginner", students: 680, rating: 4.7, modules: 14, skills: ["Python", "Pandas", "NumPy"], detailedDescription: "Handle missing data, outliers, and normalization." },
  { id: 30, title: "Time Series Data Science Tutor", category: "data-science", description: "Analyze temporal data for forecasting.", level: "Intermediate", students: 600, rating: 4.8, modules: 18, skills: ["Python", "ARIMA", "LSTM"], detailedDescription: "Work with time series datasets and predictive models." },

  /* --- Mobile Development --- */
  { id: 31, title: "iOS Development Tutor", category: "mobile", description: "Learn Swift and build iOS applications with AI guidance.", level: "Beginner", students: 1200, rating: 4.7, modules: 18, skills: ["Swift", "Xcode", "UIKit"], detailedDescription: "Build functional iOS apps, integrate APIs, and deploy to App Store." },
  { id: 32, title: "Android Development Tutor", category: "mobile", description: "Build Android apps with Kotlin and AI support.", level: "Beginner", students: 1100, rating: 4.7, modules: 18, skills: ["Kotlin", "Android Studio", "UI Design"], detailedDescription: "Create interactive Android apps with modern design patterns." },
  { id: 33, title: "Flutter Development Tutor", category: "mobile", description: "Learn cross-platform development using Flutter.", level: "Intermediate", students: 950, rating: 4.8, modules: 20, skills: ["Flutter", "Dart", "Firebase"], detailedDescription: "Build cross-platform apps with a single codebase." },
  { id: 34, title: "React Native Tutor", category: "mobile", description: "Master React Native for mobile development.", level: "Intermediate", students: 900, rating: 4.7, modules: 20, skills: ["React Native", "JS", "Redux"], detailedDescription: "Build cross-platform apps with React ecosystem." },
  { id: 35, title: "Mobile Game Development Tutor", category: "mobile", description: "Create mobile games with Unity and AI support.", level: "Advanced", students: 650, rating: 4.8, modules: 22, skills: ["Unity", "C#", "Game Dev"], detailedDescription: "Design and build mobile games for iOS and Android." },
  { id: 36, title: "Mobile UI/UX Tutor", category: "mobile", description: "Learn mobile design and user experience principles.", level: "Beginner", students: 700, rating: 4.7, modules: 16, skills: ["Figma", "Adobe XD", "UI Design"], detailedDescription: "Create engaging and user-friendly mobile interfaces." },
  { id: 37, title: "Kotlin Android Tutor", category: "mobile", description: "Specialize in Kotlin-based Android apps.", level: "Intermediate", students: 600, rating: 4.7, modules: 18, skills: ["Kotlin", "Android Studio"], detailedDescription: "Build efficient Android apps with modern Kotlin features." },
  { id: 38, title: "SwiftUI iOS Tutor", category: "mobile", description: "Learn SwiftUI for modern iOS apps.", level: "Intermediate", students: 550, rating: 4.8, modules: 18, skills: ["SwiftUI", "Swift"], detailedDescription: "Create declarative UI apps and leverage SwiftUI animations." },
  { id: 39, title: "Mobile App Security Tutor", category: "mobile", description: "Secure mobile apps against vulnerabilities.", level: "Advanced", students: 400, rating: 4.7, modules: 16, skills: ["Security", "Mobile Apps", "Encryption"], detailedDescription: "Implement secure login, data protection, and threat mitigation." },
  { id: 40, title: "Cross-Platform Mobile Tutor", category: "mobile", description: "Build apps that run on multiple platforms.", level: "Intermediate", students: 500, rating: 4.8, modules: 20, skills: ["Flutter", "React Native", "Dart"], detailedDescription: "Learn techniques to maintain a single codebase for iOS and Android." },

  /* --- UI/UX Design --- */
  { id: 41, title: "UI Design Fundamentals Tutor", category: "UIUX", description: "Master the principles of user interface design.", level: "Beginner", students: 1200, rating: 4.7, modules: 16, skills: ["Figma", "UI Principles", "Typography", "Color Theory"], detailedDescription: "Learn visual design principles, typography, color theory, and layout techniques." },
  { id: 42, title: "UX Research & Strategy Tutor", category: "UIUX", description: "Learn user research methods and UX strategy.", level: "Intermediate", students: 850, rating: 4.8, modules: 18, skills: ["User Research", "Personas", "Journey Maps", "Usability Testing"], detailedDescription: "Conduct user research, create personas, and develop UX strategies." },
  { id: 43, title: "Figma Mastery Tutor", category: "UIUX", description: "Become proficient in Figma for UI/UX design.", level: "Intermediate", students: 1100, rating: 4.9, modules: 20, skills: ["Figma", "Prototyping", "Design Systems", "Components"], detailedDescription: "Master Figma tools, prototyping, and design system creation." },
  { id: 44, title: "Mobile App Design Tutor", category: "UIUX", description: "Design engaging mobile app interfaces.", level: "Intermediate", students: 900, rating: 4.7, modules: 18, skills: ["Mobile Design", "iOS Guidelines", "Material Design", "Responsive"], detailedDescription: "Design mobile interfaces following platform guidelines and best practices." },
  { id: 45, title: "Web Design & Prototyping Tutor", category: "UIUX", description: "Design and prototype responsive websites.", level: "Intermediate", students: 950, rating: 4.8, modules: 19, skills: ["Web Design", "Responsive", "Wireframing", "Prototyping"], detailedDescription: "Create wireframes, mockups, and interactive prototypes for websites." },
  { id: 46, title: "Design Systems Tutor", category: "UIUX", description: "Build scalable design systems for teams.", level: "Advanced", students: 600, rating: 4.8, modules: 22, skills: ["Design Systems", "Components", "Tokens", "Documentation"], detailedDescription: "Create and maintain design systems with reusable components." },
  { id: 47, title: "Interaction Design Tutor", category: "UIUX", description: "Master micro-interactions and animations.", level: "Intermediate", students: 700, rating: 4.7, modules: 17, skills: ["Interaction Design", "Animations", "Micro-interactions", "Motion"], detailedDescription: "Design engaging interactions and animations for digital products." },
  { id: 48, title: "Accessibility Design Tutor", category: "UIUX", description: "Design inclusive and accessible interfaces.", level: "Intermediate", students: 550, rating: 4.7, modules: 15, skills: ["Accessibility", "WCAG", "Inclusive Design", "Screen Readers"], detailedDescription: "Create designs that are accessible to users with disabilities." },
  { id: 49, title: "UX Writing & Content Strategy", category: "UIUX", description: "Craft effective UX copy and content strategies.", level: "Beginner", students: 500, rating: 4.6, modules: 14, skills: ["UX Writing", "Content Strategy", "Microcopy", "Tone"], detailedDescription: "Write clear, concise UX copy and develop content strategies." },
  { id: 50, title: "Portfolio Design Tutor", category: "UIUX", description: "Create stunning UI/UX design portfolios.", level: "Intermediate", students: 750, rating: 4.8, modules: 16, skills: ["Portfolio", "Case Studies", "Presentation", "Storytelling"], detailedDescription: "Build compelling portfolios and present design work effectively." },

  /* --- Digital Marketing --- */
  { id: 51, title: "Digital Marketing Fundamentals", category: "Digital-marketing", description: "Learn the basics of digital marketing strategies.", level: "Beginner", students: 1400, rating: 4.7, modules: 18, skills: ["SEO", "Content Marketing", "Social Media", "Analytics"], detailedDescription: "Master SEO, content marketing, social media, and analytics fundamentals." },
  { id: 52, title: "SEO Mastery Tutor", category: "Digital-marketing", description: "Become an expert in search engine optimization.", level: "Intermediate", students: 1100, rating: 4.8, modules: 20, skills: ["SEO", "Keyword Research", "Technical SEO", "Link Building"], detailedDescription: "Learn advanced SEO techniques, keyword research, and technical SEO." },
  { id: 53, title: "Social Media Marketing Tutor", category: "Digital-marketing", description: "Master social media marketing strategies.", level: "Intermediate", students: 1300, rating: 4.7, modules: 19, skills: ["Social Media", "Content Creation", "Community Management", "Ads"], detailedDescription: "Create engaging social content and run effective ad campaigns." },
  { id: 54, title: "Content Marketing Tutor", category: "Digital-marketing", description: "Develop compelling content marketing strategies.", level: "Intermediate", students: 950, rating: 4.8, modules: 17, skills: ["Content Strategy", "Blogging", "Video Content", "Email Marketing"], detailedDescription: "Create content strategies that drive engagement and conversions." },
  { id: 55, title: "Google Ads Tutor", category: "Digital-marketing", description: "Master Google Ads and PPC campaigns.", level: "Intermediate", students: 800, rating: 4.7, modules: 18, skills: ["Google Ads", "PPC", "Campaign Management", "ROI"], detailedDescription: "Set up and optimize Google Ads campaigns for maximum ROI." },
  { id: 56, title: "Email Marketing Tutor", category: "Digital-marketing", description: "Create effective email marketing campaigns.", level: "Beginner", students: 700, rating: 4.6, modules: 16, skills: ["Email Marketing", "Automation", "Newsletters", "CTR"], detailedDescription: "Design email campaigns, automate workflows, and analyze performance." },
  { id: 57, title: "Analytics & Data Marketing", category: "Digital-marketing", description: "Use data to drive marketing decisions.", level: "Intermediate", students: 650, rating: 4.8, modules: 19, skills: ["Google Analytics", "Data Analysis", "KPI Tracking", "Reporting"], detailedDescription: "Analyze marketing data, track KPIs, and create insightful reports." },
  { id: 58, title: "Conversion Rate Optimization", category: "Digital-marketing", description: "Optimize websites for maximum conversions.", level: "Advanced", students: 550, rating: 4.7, modules: 17, skills: ["CRO", "A/B Testing", "Landing Pages", "User Psychology"], detailedDescription: "Improve conversion rates through testing and optimization strategies." },
  { id: 59, title: "Influencer Marketing Tutor", category: "Digital-marketing", description: "Leverage influencers for brand growth.", level: "Intermediate", students: 600, rating: 4.6, modules: 15, skills: ["Influencer Marketing", "Partnerships", "Campaigns", "ROI"], detailedDescription: "Develop and execute successful influencer marketing campaigns." },
  { id: 60, title: "Digital Marketing Strategy", category: "Digital-marketing", description: "Create comprehensive digital marketing plans.", level: "Advanced", students: 500, rating: 4.8, modules: 20, skills: ["Strategy", "Planning", "Budgeting", "Measurement"], detailedDescription: "Develop end-to-end digital marketing strategies and measure success." },

  // /* --- Cybersecurity --- */
  // { id: 61, title: "Cybersecurity Fundamentals", category: "cybersecurity", description: "Learn the basics of cybersecurity principles.", level: "Beginner", students: 900, rating: 4.7, modules: 18, skills: ["Security Basics", "Threats", "Vulnerabilities", "Risk Management"], detailedDescription: "Understand cybersecurity fundamentals, threats, and risk management." },
  // { id: 62, title: "Network Security Tutor", category: "cybersecurity", description: "Secure computer networks from threats.", level: "Intermediate", students: 750, rating: 4.8, modules: 20, skills: ["Network Security", "Firewalls", "VPNs", "IDS/IPS"], detailedDescription: "Implement network security measures and monitor for threats." },
  // { id: 63, title: "Ethical Hacking Tutor", category: "cybersecurity", description: "Learn ethical hacking techniques.", level: "Advanced", students: 600, rating: 4.9, modules: 22, skills: ["Penetration Testing", "Vulnerability Assessment", "Tools", "Methodologies"], detailedDescription: "Conduct ethical hacking and penetration testing exercises." },
  // { id: 64, title: "Cloud Security Tutor", category: "cybersecurity", description: "Secure cloud infrastructure and services.", level: "Intermediate", students: 550, rating: 4.7, modules: 19, skills: ["Cloud Security", "AWS", "Azure", "GCP"], detailedDescription: "Implement security measures for cloud platforms and services." },
  // { id: 65, title: "Cryptography Tutor", category: "cybersecurity", description: "Master encryption and cryptographic techniques.", level: "Advanced", students: 450, rating: 4.8, modules: 21, skills: ["Cryptography", "Encryption", "Digital Signatures", "PKI"], detailedDescription: "Learn cryptographic algorithms and secure communication methods." },
  // { id: 66, title: "Incident Response Tutor", category: "cybersecurity", description: "Respond to security incidents effectively.", level: "Intermediate", students: 500, rating: 4.7, modules: 18, skills: ["Incident Response", "Forensics", "Containment", "Recovery"], detailedDescription: "Develop incident response plans and handle security breaches." },
  // { id: 67, title: "Web Application Security", category: "cybersecurity", description: "Secure web applications from attacks.", level: "Intermediate", students: 650, rating: 4.8, modules: 20, skills: ["Web Security", "OWASP", "SQL Injection", "XSS"], detailedDescription: "Identify and mitigate common web application vulnerabilities." },
  // { id: 68, title: "Security Compliance Tutor", category: "cybersecurity", description: "Understand security regulations and compliance.", level: "Intermediate", students: 400, rating: 4.6, modules: 17, skills: ["Compliance", "GDPR", "HIPAA", "ISO 27001"], detailedDescription: "Navigate security regulations and implement compliance frameworks." },
  // { id: 69, title: "IoT Security Tutor", category: "cybersecurity", description: "Secure Internet of Things devices.", level: "Advanced", students: 350, rating: 4.7, modules: 19, skills: ["IoT Security", "Device Security", "Network Protocols", "Encryption"], detailedDescription: "Implement security measures for IoT devices and networks." },
  // { id: 70, title: "Security Operations Center", category: "cybersecurity", description: "Manage and operate security monitoring.", level: "Advanced", students: 300, rating: 4.8, modules: 20, skills: ["SOC", "SIEM", "Monitoring", "Threat Intelligence"], detailedDescription: "Operate security monitoring systems and analyze security events." },
];

/* ---------------- LEARNING PATHS ---------------- */
const learningPaths = [
  {
    id: "frontend",
    title: "Frontend Developer Path",
    description: "Master modern frontend technologies with AI guidance",
    duration: "6 months",
    courses: "8 AI Tutors",
    averageSalary: "$95,000",
    icon: Code,
    color: "from-blue-500 to-cyan-500",
  },
  {
    id: "backend",
    title: "Backend Engineer Path",
    description: "Build scalable servers, APIs, and databases",
    duration: "7 months",
    courses: "10 AI Tutors",
    averageSalary: "$110,000",
    icon: Database,
    color: "from-purple-500 to-pink-500",
  },
  {
    id: "data",
    title: "Data Scientist Path",
    description: "Turn data into insights and predictions",
    duration: "8 months",
    courses: "12 AI Tutors",
    averageSalary: "$120,000",
    icon: TrendingUp,
    color: "from-green-500 to-emerald-500",
  },
  {
    id: "ai",
    title: "AI Specialist Path",
    description: "Create intelligent systems and AI applications",
    duration: "9 months",
    courses: "14 AI Tutors",
    averageSalary: "$140,000",
    icon: Brain,
    color: "from-orange-500 to-red-500",
  },
];

/* ---------------- COURSE PAGE COMPONENT ---------------- */
export default function Course() {
  const { theme } = useTheme();
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [hoveredTutor, setHoveredTutor] = useState(null);

  // Filter tutors based on selected category and search query
  const filteredTutors = useMemo(() => {
    return aiTutors.filter(tutor => {
      // Category filter
      const matchesCategory = selectedCategory === "all" || tutor.category === selectedCategory;
      
      // Search filter
      const matchesSearch = searchQuery === "" || 
        tutor.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tutor.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tutor.skills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()));
      
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const bgMain = theme === "dark" ? "bg-slate-950 text-gray-200" : "bg-gray-50 text-gray-900";
  const cardBg = theme === "dark" ? "bg-slate-900 text-gray-200" : "bg-white text-gray-900";
  const inputBg = theme === "dark" ? "bg-slate-800 text-gray-200 placeholder-gray-400" : "bg-white text-gray-900 placeholder-gray-500";

  return (
    <div className={`w-full min-h-screen transition-colors ${bgMain}`}>
      <Navbar />
      <FloatingSocialGlass />

      {/* HERO SECTION */}
      <section className={`relative text-white py-32 ${theme === "dark" ? "bg-slate-900" : "bg-blue-900"}`}>
        <div className="absolute inset-0 bg-[url('/assets/course.png')] bg-cover bg-center opacity-20" />
        <motion.div variants={fadeUp} initial="hidden" animate="visible" className="relative z-10 max-w-6xl mx-auto px-6 text-center">
          <h1 className="text-5xl md:text-6xl font-extrabold leading-tight">
            Learn With Intelligent <span className="text-blue-400">AI Tutors</span> 
          </h1>
          <p className={`mt-6 text-xl max-w-3xl mx-auto ${theme === "dark" ? "text-gray-300" : "text-blue-100"}`}>
            No videos, no lectures. Interactive AI tutors that adapt to your learning style and pace.
          </p>

          {/* SEARCH BAR */}
          <motion.div variants={fadeUp} transition={{ delay: 0.2 }} className="mt-12 max-w-2xl mx-auto">
            <div className="relative">
              <Search className={`absolute left-6 top-1/2 transform -translate-y-1/2 ${theme === "dark" ? "text-gray-400" : "text-gray-400"} w-6 h-6`} />
              <input
                type="text"
                placeholder="Search AI tutors by skill or topic..."
                className={`w-full pl-16 pr-6 py-5 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-500/30 transition ${inputBg}`}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                aria-label="Search AI tutors"
              />
            </div>
          </motion.div>

          {/* STATS */}
          <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }} className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8">
            <Stat value="70+" label="AI Tutors" theme={theme} />
            <Stat value="24/7" label="Availability" theme={theme} />
            <Stat value="4.8" label="Avg Rating" theme={theme} />
            <Stat value="10,000+" label="Active Learners" theme={theme} />
          </motion.div>
        </motion.div>
      </section>
{/* CATEGORIES SECTION - UNIFIED FOR MOBILE & PC */}
<motion.section 
  variants={fadeUp} 
  initial="hidden" 
  whileInView="visible" 
  viewport={{ once: true }} 
  className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12 -mt-8 sm:-mt-10"
>
  <div className={`${cardBg} rounded-2xl sm:rounded-3xl shadow-lg sm:shadow-xl p-6 sm:p-8 sm:py-7 border-b-4 sm:border-b-6 border-blue-600 transition-colors`}>
    <div className="mb-6 sm:mb-8">
      <h2 className={`text-xl sm:text-2xl md:text-3xl font-bold text-center ${theme === "dark" ? "text-gray-100" : "text-gray-900"}`}>
        Browse AI Tutors by Category
      </h2>
      <p className={`mt-1 sm:mt-2 text-sm sm:text-base text-center ${theme === "dark" ? "text-gray-300" : "text-gray-600"}`}>
        Find the perfect AI tutor for your learning goals
      </p>
    </div>
    
    {/* CATEGORY BUTTONS - DUAL LAYOUT: MOBILE GRID & PC HORIZONTAL */}
    <div className="grid grid-cols-2 sm:grid-cols-4 lg:flex lg:flex-wrap lg:justify-center gap-3 sm:gap-4">
      {categories.map((category) => {
        const Icon = category.icon;
        const isSelected = selectedCategory === category.id;
        
        return (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(category.id)}
            className={`transition-all duration-300 rounded-xl sm:rounded-2xl hover:shadow-md active:scale-95 lg:active:scale-100
              /* Mobile Layout (Grid) */
              flex flex-col items-center justify-center gap-2 px-3 py-4 min-h-[100px] sm:min-h-[110px] w-full
              /* Desktop Layout (Horizontal) */
              lg:flex-row lg:items-center lg:justify-start lg:gap-3 lg:px-5 lg:py-3 lg:min-h-0 lg:w-auto
              ${
              isSelected
                ? "bg-blue-600 text-white shadow-lg lg:scale-105"
                : theme === "dark"
                  ? "bg-slate-800 text-gray-300 hover:bg-slate-700"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
            aria-label={`Select ${category.name} category`}
            aria-pressed={isSelected}
          >
            {/* Icon Container */}
            <div className={`p-2 sm:p-2.5 rounded-lg 
              lg:flex-shrink-0 ${
              isSelected 
                ? "bg-white/20" 
                : theme === "dark" 
                  ? "bg-slate-700/50" 
                  : "bg-white/80"
            }`}>
              <Icon className="w-5 h-5 sm:w-6 sm:h-6 lg:w-5 lg:h-5" />
            </div>
            
            {/* Content Container */}
            <div className="flex flex-col items-center lg:flex-row lg:items-center lg:gap-2">
              <span className="font-semibold text-xs sm:text-sm lg:text-sm text-center lg:text-left whitespace-nowrap">
                {category.name}
              </span>
              <span className={`px-2 py-0.5 sm:px-2.5 sm:py-1 text-xs rounded-full lg:mt-0 ${
                isSelected
                  ? "bg-white/20"
                  : theme === "dark" 
                    ? "bg-gray-700" 
                    : "bg-gray-300"
              }`}>
                {category.count}
              </span>
            </div>
          </button>
        );
      })}
    </div>
  </div>
</motion.section>


      {/* AI TUTORS GRID */}
      <motion.section 
        variants={stagger} 
        initial="hidden" 
        whileInView="visible" 
        viewport={{ once: true }} 
        className="max-w-7xl mx-auto px-6 py-16"
      >
        {/* Section Header */}
        <div className="mb-12">
          <h2 className={`text-3xl font-bold ${theme === "dark" ? "text-gray-100" : "text-gray-900"}`}>
            {selectedCategory === "all" 
              ? "All AI Tutors" 
              : `${categories.find(c => c.id === selectedCategory)?.name} Tutors`
            }
          </h2>
          <p className={`${theme === "dark" ? "text-gray-300" : "text-gray-600"} mt-2`}>
            {filteredTutors.length} AI tutors available • Hover to see detailed description
            {selectedCategory !== "all" && ` • Showing 10 of 10 ${categories.find(c => c.id === selectedCategory)?.name} tutors`}
          </p>
        </div>

        {/* Tutors Grid or No Results */}
        {filteredTutors.length === 0 ? (
          <div className="text-center py-20">
            <Search className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className={`${theme === "dark" ? "text-gray-100" : "text-gray-700"} text-2xl font-semibold mb-2`}>
              No AI tutors found
            </h3>
            <p className={`${theme === "dark" ? "text-gray-300" : "text-gray-500"}`}>
              Try adjusting your search or filter criteria
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredTutors.map((tutor) => (
              <AITutorCard 
                key={tutor.id} 
                tutor={tutor}
                isHovered={hoveredTutor === tutor.id}
                onHover={() => setHoveredTutor(tutor.id)}
                onLeave={() => setHoveredTutor(null)}
                theme={theme}
              />
            ))}
          </div>
        )}

        {/* GET STARTED BUTTON */}
        <motion.div 
          variants={fadeUp} 
          initial="hidden" 
          whileInView="visible" 
          viewport={{ once: true }} 
          className="text-center mt-16"
        >
          <Link
            to="/auth"
            className="inline-flex items-center justify-center gap-3 bg-gradient-to-r from-red-600 to-red-600 hover:from-blue-700 hover:to-blue-700 text-white px-12 py-4 rounded-full text-lg font-semibold transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
            aria-label="Start learning with AI tutor"
          >
            Start Learning with AI Tutor
            <ChevronRight className="w-5 h-5" />
          </Link>
          <p className={`${theme === "dark" ? "text-gray-300" : "text-gray-600"} mt-4`}>
            Get instant access to all AI tutors • No credit card required
          </p>
        </motion.div>
      </motion.section>

      {/* LEARNING PATHS */}
      <section
        className={`relative py-32 transition-colors ${
          theme === "dark"
            ? "bg-slate-900 text-gray-200"
            : "bg-gradient-to-br from-gray-900 to-blue-900 text-white"
        }`}
      >
        {/* Background image */}
        <div className="absolute inset-0 bg-[url('/assets/ghj.png')] bg-cover bg-center opacity-10" />

        {/* Content wrapper */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="relative z-10 max-w-7xl mx-auto px-6"
        >
          {/* Section header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">AI-Powered Learning Paths</h2>
            <p
              className={`max-w-2xl mx-auto ${
                theme === "dark" ? "text-gray-300" : "text-blue-200"
              }`}
            >
              Follow intelligent roadmaps curated by AI to become job-ready in high-demand tech roles
            </p>
          </div>

          {/* Learning paths grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {learningPaths.map((path) => {
              const Icon = path.icon;
              return (
                <motion.div
                  key={path.id}
                  variants={scaleUp}
                  className={`flex flex-col justify-between p-8 rounded-3xl transition-colors backdrop-blur-xl ${
                    theme === "dark"
                      ? "bg-slate-800 hover:bg-slate-700"
                      : "bg-white/10 hover:bg-white/15"
                  }`}
                >
                  {/* Icon */}
                  <div
                    className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${path.color} flex items-center justify-center mb-6`}
                  >
                    <Icon className="w-8 h-8 text-white" />
                  </div>

                  {/* Title & description */}
                  <div>
                    <h3
                      className={`text-2xl font-bold mb-3 ${
                        theme === "dark" ? "text-gray-100" : "text-white"
                      }`}
                    >
                      {path.title}
                    </h3>
                    <p
                      className={`mb-6 ${
                        theme === "dark" ? "text-gray-300" : "text-blue-200"
                      }`}
                    >
                      {path.description}
                    </p>

                    {/* Details */}
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <Clock className="w-5 h-5 text-blue-300" />
                        <span>{path.duration}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <BookOpen className="w-5 h-5 text-blue-300" />
                        <span>{path.courses}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <TrendingUp className="w-5 h-5 text-blue-300" />
                        <span>{path.averageSalary}/year</span>
                      </div>
                    </div>
                  </div>

                  {/* Explore button */}
                  <Link
                    to={`/career-path/${path.id}`}
                    className={`mt-6 w-full py-3 px-6 rounded-xl font-semibold transition ${
                      theme === "dark"
                        ? "bg-blue-600 text-white hover:bg-blue-700"
                        : "bg-white text-blue-900 hover:bg-blue-50"
                    }`}
                    aria-label={`Explore ${path.title} learning path`}
                  >
                    Explore Path
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </section>

      {/* WHY CHOOSE */}
      <motion.section 
        variants={stagger} 
        initial="hidden" 
        whileInView="visible" 
        viewport={{ once: true }} 
        className="max-w-6xl mx-auto px-6 py-24"
      >
        <div className="text-center mb-16">
          <h2 className={`text-4xl font-bold mb-4 ${theme === "dark" ? "text-gray-100" : "text-gray-900"}`}>
            Why Learn With AI Tutors?
          </h2>
          <p className={`${theme === "dark" ? "text-gray-300" : "text-gray-600"} max-w-2xl mx-auto`}>
            Experience personalized, adaptive learning that traditional courses can't match
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <BenefitCard icon={Target} title="Personalized Learning" description="AI adapts to your pace, knowledge gaps, and learning style for optimal progress" theme={theme} />
          <BenefitCard icon={Briefcase} title="Project-Based Guidance" description="Build real portfolio projects with step-by-step AI mentorship" theme={theme} />
          <BenefitCard icon={Award} title="Instant Feedback" description="Get code reviews and explanations in real-time, 24/7" theme={theme} />
          <BenefitCard icon={Users} title="Always Available" description="Learn anytime, anywhere - no scheduling, no waiting" theme={theme} />
          <BenefitCard icon={Brain} title="Adaptive Difficulty" description="Content adjusts based on your understanding and progress" theme={theme} />
          <BenefitCard icon={CheckCircle} title="Career-Focused" description="Learn skills that companies actually need and use" theme={theme} />
        </div>
      </motion.section>

      {/* CTA */}
      <motion.section 
        variants={fadeUp} 
        initial="hidden" 
        whileInView="visible" 
        viewport={{ once: true }} 
        className={`py-24 transition-colors ${theme === "dark" ? "bg-slate-900 text-gray-200" : "bg-blue-800 text-white"}`}
      >
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-extrabold mb-6">Start Your AI-Powered Learning Journey</h2>
          <p className={`${theme === "dark" ? "text-gray-300" : "text-blue-100"} text-xl max-w-2xl mx-auto mb-10`}>
            Join thousands of learners who are mastering tech skills faster with intelligent AI tutors.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Link 
              to="/auth" 
              className="px-10 py-4 rounded-full font-semibold transition hover:scale-105 text-blue-900 bg-white hover:bg-blue-50"
              aria-label="Get started for free"
            >
              Get Started Free
            </Link>
            <Link to="/contact">
              <button 
                className="border-2 px-10 py-4 rounded-full font-semibold transition hover:bg-white/10 border-white text-white"
                aria-label="Partner with us"
              >
                Partner with us
              </button>
            </Link>
          </div>
          <p className={`${theme === "dark" ? "text-gray-300" : "text-blue-200"} mt-8`}>
            Free 7-day trial • No credit card required • Cancel anytime
          </p>
        </div>
      </motion.section>

      <Footer />
    </div>
  );
}

/* ---------------- COMPONENTS ---------------- */
function AITutorCard({ tutor, isHovered, onHover, onLeave, theme }) {
  return (
    <motion.div 
      variants={scaleUp}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      className={`relative rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 min-h-[280px] cursor-pointer ${
        theme === "dark" ? "bg-slate-900 text-gray-200" : "bg-white text-gray-900"
      }`}
      aria-label={`${tutor.title} - ${tutor.level} level`}
      role="article"
    >
      <div className="p-6 h-full flex flex-col">
        <div className="flex justify-between items-start mb-4">
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${
            theme === "dark" ? "bg-blue-900/30 text-blue-300" : "bg-blue-100 text-blue-700"
          }`}>
            {tutor.level}
          </span>
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span className="font-semibold">{tutor.rating}</span>
          </div>
        </div>

        <h3 className={`text-xl font-bold mb-3 line-clamp-2 ${
          theme === "dark" ? "text-gray-100" : "text-gray-900"
        }`}>
          {tutor.title}
        </h3>
        
        <p className={`mb-4 flex-grow line-clamp-3 ${
          theme === "dark" ? "text-gray-300" : "text-gray-600"
        }`}>
          {tutor.description}
        </p>

        <div className="flex items-center justify-between text-sm mt-4">
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4" />
            <span>{tutor.students.toLocaleString()}+ learners</span>
          </div>
          <div className="flex items-center gap-2">
            <BookOpen className="w-4 h-4" />
            <span>{tutor.modules} modules</span>
          </div>
        </div>

        {isHovered && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className={`absolute inset-0 p-6 flex flex-col backdrop-blur-sm rounded-3xl ${
              theme === "dark" ? "bg-slate-800/90 text-gray-200" : "bg-blue-700/90 text-white"
            }`}
          >
            <div className="flex-grow">
              <h4 className="text-lg font-bold mb-3">What You'll Learn</h4>
              <p className="text-sm leading-relaxed mb-4">{tutor.detailedDescription}</p>
              <div className="mt-4">
                <h5 className="font-semibold mb-2">Key Skills:</h5>
                <div className="flex flex-wrap gap-2">
                  {tutor.skills.slice(0,3).map((skill, idx) => (
                    <span key={idx} className="px-3 py-1 rounded-full text-xs bg-white/20">
                      {skill}
                    </span>
                  ))}
                  {tutor.skills.length > 3 && (
                    <span className="px-3 py-1 rounded-full text-xs bg-white/20">
                      +{tutor.skills.length - 3} more
                    </span>
                  )}
                </div>
              </div>
            </div>
            <div className="pt-4 border-t border-white/20 mt-4">
              <div className="flex items-center justify-center gap-2 text-sm">
                <Clock className="w-4 h-4 text-blue-300" />
                <span>Available 24/7</span>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}

function Stat({ value, label, theme }) {
  return (
    <motion.div variants={fadeIn} className="text-center">
      <div className="text-4xl font-bold mb-2">{value}</div>
      <div className={`font-medium ${theme === "dark" ? "text-gray-300" : "text-blue-200"}`}>
        {label}
      </div>
    </motion.div>
  );
}

function BenefitCard({ icon: Icon, title, description, theme }) {
  return (
    <motion.div 
      variants={fadeUp} 
      className={`rounded-3xl p-8 shadow-lg hover:shadow-xl ${
        theme === "dark" ? "bg-slate-800 text-gray-200" : "bg-white text-gray-900"
      }`}
    >
      <div className="w-14 h-14 rounded-2xl bg-blue-100 flex items-center justify-center mb-6">
        <Icon className="w-7 h-7 text-blue-600" />
      </div>
      <h3 className="text-xl font-bold mb-3">{title}</h3>
      <p className={`leading-relaxed ${theme === "dark" ? "text-gray-300" : "text-gray-600"}`}>
        {description}
      </p>
    </motion.div>
  );
}