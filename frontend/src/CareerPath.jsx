"use client";

import { motion } from "framer-motion";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { 
  Clock, 
  BookOpen, 
  TrendingUp,
  CheckCircle,
  ArrowLeft,
  Star,
  Users,
  Target,
  Briefcase,
  Award,
  Brain,
  ChevronRight,
  Code,
  Database,
  Shield,
  Smartphone
} from "lucide-react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useTheme } from "./context/ThemeContext";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7 } },
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

// Define learning paths with detailed information and courses
const learningPathsData = {
  frontend: {
    id: "frontend",
    title: "Frontend Developer Path",
    description: "Master modern frontend technologies with AI guidance",
    fullDescription: "Become a professional frontend developer by learning HTML, CSS, JavaScript, React, and modern frameworks. Build responsive, accessible web applications.",
    duration: "6 months",
    courses: 8,
    averageSalary: "$95,000",
    icon: Code,
    color: "from-blue-500 to-cyan-500",
    skills: [
      "HTML5 & CSS3",
      "JavaScript ES6+",
      "React.js",
      "TypeScript",
      "Responsive Design",
      "State Management",
      "Web Performance",
      "Testing & Debugging"
    ],
    roadmap: [
      { month: 1, title: "Web Fundamentals", focus: "HTML, CSS, Git basics" },
      { month: 2, title: "JavaScript Mastery", focus: "ES6+, DOM, Async JS" },
      { month: 3, title: "React Foundations", focus: "Components, Hooks, Props" },
      { month: 4, title: "Advanced React", focus: "Context, Redux, Routing" },
      { month: 5, title: "Modern Tooling", focus: "Webpack, Testing, TypeScript" },
      { month: 6, title: "Capstone Project", focus: "Full portfolio project" }
    ],
    courseList: [
      { id: 11, title: "HTML & CSS Fundamentals", level: "Beginner", duration: "4 weeks", skills: ["HTML5", "CSS3", "Responsive"] },
      { id: 12, title: "JavaScript Complete Guide", level: "Beginner", duration: "6 weeks", skills: ["ES6", "DOM", "Async"] },
      { id: 14, title: "React Masterclass", level: "Intermediate", duration: "8 weeks", skills: ["React", "Hooks", "Context"] },
      { id: 13, title: "Advanced React Patterns", level: "Advanced", duration: "6 weeks", skills: ["Redux", "Testing", "Performance"] },
      { id: 17, title: "Next.js & Server-Side Rendering", level: "Intermediate", duration: "6 weeks", skills: ["Next.js", "SSR", "SEO"] },
      { id: 19, title: "Web Accessibility", level: "Intermediate", duration: "4 weeks", skills: ["WCAG", "ARIA", "Testing"] },
      { id: 20, title: "Progressive Web Apps", level: "Advanced", duration: "6 weeks", skills: ["PWA", "Service Workers", "Caching"] },
      { id: 18, title: "Build & Deployment", level: "Intermediate", duration: "4 weeks", skills: ["Webpack", "CI/CD", "Hosting"] }
    ],
    prerequisites: ["Basic computer skills", "No coding experience required"],
    outcomes: [
      "Build responsive websites",
      "Create React applications",
      "Implement state management",
      "Deploy production apps",
      "Pass technical interviews"
    ]
  },
  backend: {
    id: "backend",
    title: "Backend Engineer Path",
    description: "Build scalable servers, APIs, and databases",
    fullDescription: "Learn to design, build, and maintain robust backend systems. Master server-side programming, databases, APIs, and cloud infrastructure.",
    duration: "7 months",
    courses: 10,
    averageSalary: "$110,000",
    icon: Database,
    color: "from-purple-500 to-pink-500",
    skills: [
      "Node.js",
      "Python/Java",
      "REST APIs",
      "Database Design",
      "Authentication",
      "Microservices",
      "Cloud Platforms",
      "DevOps Basics"
    ],
    roadmap: [
      { month: 1, title: "Programming Fundamentals", focus: "JavaScript/Python basics" },
      { month: 2, title: "Server Basics", focus: "Node.js, Express.js" },
      { month: 3, title: "Database Design", focus: "SQL, NoSQL, ORMs" },
      { month: 4, title: "API Development", focus: "REST, GraphQL, Documentation" },
      { month: 5, title: "Authentication & Security", focus: "JWT, OAuth, Encryption" },
      { month: 6, title: "System Design", focus: "Microservices, Caching, Queues" },
      { month: 7, title: "Deployment & DevOps", focus: "Docker, AWS, CI/CD" }
    ],
    courseList: [
      { id: 22, title: "Node.js Fundamentals", level: "Beginner", duration: "5 weeks", skills: ["Node.js", "Express", "NPM"] },
      { id: 26, title: "Database Systems", level: "Intermediate", duration: "6 weeks", skills: ["SQL", "MongoDB", "Redis"] },
      { id: 12, title: "REST API Development", level: "Intermediate", duration: "6 weeks", skills: ["Express", "Postman", "Swagger"] },
      { id: 39, title: "API Security", level: "Advanced", duration: "5 weeks", skills: ["JWT", "OAuth2", "Encryption"] },
      { id: 6, title: "Docker & Containerization", level: "Intermediate", duration: "4 weeks", skills: ["Docker", "Kubernetes", "Orchestration"] },
      { id: 28, title: "Microservices Architecture", level: "Advanced", duration: "7 weeks", skills: ["Microservices", "Message Queues", "gRPC"] },
      { id: 40, title: "Cloud Deployment", level: "Intermediate", duration: "5 weeks", skills: ["AWS", "Azure", "Google Cloud"] },
      { id: 23, title: "System Design", level: "Advanced", duration: "6 weeks", skills: ["Scalability", "Load Balancing", "Caching"] },
      { id: 29, title: "Testing & Monitoring", level: "Intermediate", duration: "4 weeks", skills: ["Jest", "Mocha", "Logging"] },
      { id: 16, title: "CI/CD Pipeline", level: "Advanced", duration: "5 weeks", skills: ["GitHub Actions", "Jenkins", "Automation"] }
    ],
    prerequisites: ["Basic programming knowledge", "Understanding of web concepts"],
    outcomes: [
      "Design database schemas",
      "Build RESTful APIs",
      "Implement authentication systems",
      "Deploy to cloud platforms",
      "Design scalable architecture"
    ]
  },
  data: {
    id: "data",
    title: "Data Scientist Path",
    description: "Turn data into insights and predictions",
    fullDescription: "Master data analysis, machine learning, and statistical modeling. Learn to extract insights from data and build predictive models.",
    duration: "8 months",
    courses: 12,
    averageSalary: "$120,000",
    icon: TrendingUp,
    color: "from-green-500 to-emerald-500",
    skills: [
      "Python/R",
      "Statistics",
      "Machine Learning",
      "Data Visualization",
      "SQL",
      "Big Data Tools",
      "Cloud ML Services",
      "Model Deployment"
    ],
    roadmap: [
      { month: 1, title: "Python & Statistics", focus: "Python basics, Descriptive stats" },
      { month: 2, title: "Data Analysis", focus: "Pandas, NumPy, EDA" },
      { month: 3, title: "Data Visualization", focus: "Matplotlib, Seaborn, Tableau" },
      { month: 4, title: "Machine Learning Basics", focus: "Regression, Classification" },
      { month: 5, title: "Advanced ML", focus: "Ensembles, Neural Networks" },
      { month: 6, title: "Big Data", focus: "Spark, Hadoop, Cloud" },
      { month: 7, title: "Deep Learning", focus: "TensorFlow, PyTorch" },
      { month: 8, title: "MLOps & Deployment", focus: "Model serving, Monitoring" }
    ],
    courseList: [
      { id: 21, title: "Python for Data Science", level: "Beginner", duration: "5 weeks", skills: ["Python", "Pandas", "NumPy"] },
      { id: 23, title: "Statistics Fundamentals", level: "Beginner", duration: "6 weeks", skills: ["Probability", "Hypothesis Testing", "Distributions"] },
      { id: 21, title: "Data Analysis with Python", level: "Intermediate", duration: "6 weeks", skills: ["EDA", "Data Cleaning", "Feature Engineering"] },
      { id: 24, title: "Data Visualization", level: "Intermediate", duration: "5 weeks", skills: ["Matplotlib", "Seaborn", "Plotly"] },
      { id: 1, title: "Machine Learning Basics", level: "Intermediate", duration: "7 weeks", skills: ["Scikit-learn", "Supervised Learning", "Evaluation"] },
      { id: 28, title: "Advanced ML Algorithms", level: "Advanced", duration: "7 weeks", skills: ["Ensembles", "Clustering", "Dimensionality Reduction"] },
      { id: 25, title: "Big Data Technologies", level: "Advanced", duration: "6 weeks", skills: ["Spark", "Hadoop", "Hive"] },
      { id: 2, title: "Deep Learning Fundamentals", level: "Advanced", duration: "8 weeks", skills: ["TensorFlow", "Neural Networks", "CNNs"] },
      { id: 30, title: "Time Series Analysis", level: "Intermediate", duration: "5 weeks", skills: ["ARIMA", "Forecasting", "Seasonality"] },
      { id: 4, title: "NLP Fundamentals", level: "Intermediate", duration: "6 weeks", skills: ["Text Processing", "Sentiment Analysis", "Transformers"] },
      { id: 6, title: "MLOps & Deployment", level: "Advanced", duration: "6 weeks", skills: ["Docker", "Model Serving", "Monitoring"] },
      { id: 22, title: "Data Science Capstone", level: "Advanced", duration: "8 weeks", skills: ["End-to-end Project", "Portfolio", "Presentation"] }
    ],
    prerequisites: ["Basic math knowledge", "Some programming experience preferred"],
    outcomes: [
      "Perform statistical analysis",
      "Build ML models",
      "Create data visualizations",
      "Work with big data tools",
      "Deploy ML solutions"
    ]
  },
  ai: {
    id: "ai",
    title: "AI Specialist Path",
    description: "Create intelligent systems and AI applications",
    fullDescription: "Master artificial intelligence, machine learning, deep learning, and AI system design. Build cutting-edge AI applications and solutions.",
    duration: "9 months",
    courses: 14,
    averageSalary: "$140,000",
    icon: Brain,
    color: "from-orange-500 to-red-500",
    skills: [
      "Python",
      "Machine Learning",
      "Deep Learning",
      "Computer Vision",
      "NLP",
      "Reinforcement Learning",
      "MLOps",
      "AI Ethics"
    ],
    roadmap: [
      { month: 1, title: "AI Mathematics", focus: "Linear Algebra, Calculus, Probability" },
      { month: 2, title: "Python for AI", focus: "NumPy, Pandas, ML libraries" },
      { month: 3, title: "ML Foundations", focus: "Supervised/Unsupervised learning" },
      { month: 4, title: "Deep Learning", focus: "Neural Networks, TensorFlow/PyTorch" },
      { month: 5, title: "Computer Vision", focus: "CNNs, Object Detection, Segmentation" },
      { month: 6, title: "Natural Language Processing", focus: "Transformers, BERT, GPT" },
      { month: 7, title: "Reinforcement Learning", focus: "Q-learning, Policy Gradients" },
      { month: 8, title: "Advanced Topics", focus: "GANs, AutoML, Federated Learning" },
      { month: 9, title: "AI Systems", focus: "MLOps, Deployment, Scaling" }
    ],
    courseList: [
      { id: 1, title: "AI & ML Fundamentals", level: "Beginner", duration: "6 weeks", skills: ["Python", "Scikit-learn", "ML Basics"] },
      { id: 2, title: "Deep Learning", level: "Intermediate", duration: "8 weeks", skills: ["TensorFlow", "Keras", "Neural Networks"] },
      { id: 3, title: "Reinforcement Learning", level: "Advanced", duration: "7 weeks", skills: ["RL Algorithms", "Gym", "Q-learning"] },
      { id: 4, title: "Natural Language Processing", level: "Intermediate", duration: "7 weeks", skills: ["NLTK", "Spacy", "Transformers"] },
      { id: 5, title: "Computer Vision", level: "Intermediate", duration: "8 weeks", skills: ["OpenCV", "CNN", "YOLO"] },
      { id: 8, title: "Generative AI", level: "Intermediate", duration: "6 weeks", skills: ["GANs", "Diffusion Models", "Stable Diffusion"] },
      { id: 7, title: "AI Ethics & Governance", level: "Intermediate", duration: "5 weeks", skills: ["AI Policy", "Bias", "Fairness"] },
      { id: 6, title: "MLOps Fundamentals", level: "Advanced", duration: "6 weeks", skills: ["Docker", "MLflow", "Model Serving"] },
      { id: 9, title: "Time Series with AI", level: "Intermediate", duration: "5 weeks", skills: ["ARIMA", "LSTM", "Forecasting"] },
      { id: 10, title: "AI Research Methods", level: "Advanced", duration: "7 weeks", skills: ["Research Design", "Experimentation", "Paper Reading"] },
      { id: 35, title: "AI for Games", level: "Advanced", duration: "6 weeks", skills: ["Game AI", "Pathfinding", "Decision Making"] },
      { id: 36, title: "AI Product Management", level: "Intermediate", duration: "5 weeks", skills: ["Product Strategy", "User Stories", "Metrics"] },
      { id: 37, title: "Edge AI", level: "Advanced", duration: "6 weeks", skills: ["TensorFlow Lite", "ONNX", "Mobile AI"] },
      { id: 38, title: "AI Capstone Project", level: "Advanced", duration: "8 weeks", skills: ["Full AI System", "Deployment", "Presentation"] }
    ],
    prerequisites: ["Strong math background", "Intermediate Python", "Basic ML knowledge"],
    outcomes: [
      "Design AI systems",
      "Implement ML algorithms",
      "Build deep learning models",
      "Deploy AI solutions",
      "Conduct AI research"
    ]
  }
};

export default function CareerPath() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { theme } = useTheme();
  
  const path = learningPathsData[id];
  
  if (!path) {
    return (
      <div className={`min-h-screen ${theme === "dark" ? "bg-slate-950 text-gray-200" : "bg-gray-50 text-gray-900"}`}>
        <Navbar />
        <div className="max-w-4xl mx-auto px-6 py-32 text-center">
          <h1 className="text-4xl font-bold mb-6">Career Path Not Found</h1>
          <p className="text-xl mb-8">The learning path you're looking for doesn't exist.</p>
          <Link 
            to="/course" 
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to All Paths
          </Link>
        </div>
        <Footer />
      </div>
    );
  }
  
  const Icon = path.icon;
  const bgMain = theme === "dark" ? "bg-slate-950 text-gray-200" : "bg-gray-50 text-gray-900";
  const cardBg = theme === "dark" ? "bg-slate-900 text-gray-200" : "bg-white text-gray-900";
  const borderColor = theme === "dark" ? "border-slate-700" : "border-gray-200";
  
  return (
    <div className={`w-full min-h-screen transition-colors ${bgMain}`}>
      <Navbar />
      
      {/* Hero Section */}
      <section className={`relative text-white py-24 ${theme === "dark" ? "bg-slate-900" : "bg-gradient-to-r from-gray-900 to-blue-900"}`}>
        <div className="absolute inset-0 bg-[url('/assets/path-bg.png')] bg-cover bg-center opacity-10" />
        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <button
            onClick={() => navigate('/course')}
            className="inline-flex items-center gap-2 mb-8 text-blue-300 hover:text-white transition"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to All Learning Paths
          </button>
          
          <motion.div variants={fadeUp} initial="hidden" animate="visible" className="flex flex-col lg:flex-row items-start gap-8">
            <div className={`w-24 h-24 rounded-3xl bg-gradient-to-br ${path.color} flex items-center justify-center flex-shrink-0`}>
              <Icon className="w-12 h-12 text-white" />
            </div>
            
            <div className="flex-grow">
              <h1 className="text-5xl font-bold mb-4">{path.title}</h1>
              <p className="text-xl text-blue-100 mb-8 max-w-3xl">{path.fullDescription}</p>
              
              <div className="flex flex-wrap gap-6">
                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-blue-300" />
                  <span className="text-lg">{path.duration}</span>
                </div>
                <div className="flex items-center gap-3">
                  <BookOpen className="w-5 h-5 text-blue-300" />
                  <span className="text-lg">{path.courses} AI Tutors</span>
                </div>
                <div className="flex items-center gap-3">
                  <TrendingUp className="w-5 h-5 text-blue-300" />
                  <span className="text-lg">Avg. Salary: {path.averageSalary}/year</span>
                </div>
              </div>
            </div>
            
            <div className="lg:w-80 flex-shrink-0">
              <Link
                to="/auth"
                className="inline-flex items-center justify-center gap-2 w-full bg-white text-blue-900 hover:bg-blue-50 font-semibold py-4 px-8 rounded-xl transition hover:scale-105"
              >
                Start This Path
                <ChevronRight className="w-5 h-5" />
              </Link>
              <p className="text-blue-200 text-sm mt-3 text-center">Free 7-day trial available</p>
            </div>
          </motion.div>
        </div>
      </section>
      
      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Skills Section */}
            <motion.section variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className={cardBg + " rounded-3xl p-8 shadow-lg"}>
              <h2 className="text-2xl font-bold mb-6">Skills You'll Master</h2>
              <div className="flex flex-wrap gap-3">
                {path.skills.map((skill, index) => (
                  <span
                    key={index}
                    className={`px-4 py-2 rounded-full text-sm font-medium ${
                      theme === "dark" 
                        ? "bg-blue-900/30 text-blue-300" 
                        : "bg-blue-100 text-blue-700"
                    }`}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.section>
            
            {/* Course List */}
            <motion.section variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className={cardBg + " rounded-3xl p-8 shadow-lg"}>
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold">Course Curriculum</h2>
                <span className={`px-3 py-1 rounded-full text-sm ${
                  theme === "dark" ? "bg-slate-800 text-gray-300" : "bg-gray-100 text-gray-700"
                }`}>
                  {path.courseList.length} AI Tutors
                </span>
              </div>
              
              <div className="space-y-4">
                {path.courseList.map((course, index) => (
                  <div
                    key={index}
                    className={`p-6 rounded-2xl border ${borderColor} hover:border-blue-500 transition`}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-4 mb-2">
                          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                            <span className="text-white font-bold">{index + 1}</span>
                          </div>
                          <div>
                            <h3 className="font-bold text-lg">{course.title}</h3>
                            <div className="flex items-center gap-4 mt-1">
                              <span className={`px-2 py-1 rounded text-xs ${
                                course.level === "Beginner" ? "bg-green-100 text-green-800" :
                                course.level === "Intermediate" ? "bg-yellow-100 text-yellow-800" :
                                "bg-red-100 text-red-800"
                              }`}>
                                {course.level}
                              </span>
                              <span className="text-sm flex items-center gap-1">
                                <Clock className="w-4 h-4" />
                                {course.duration}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-wrap gap-2 mt-3">
                          {course.skills.map((skill, idx) => (
                            <span key={idx} className={`px-3 py-1 rounded-full text-xs ${
                              theme === "dark" ? "bg-slate-800 text-gray-300" : "bg-gray-100 text-gray-700"
                            }`}>
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                      <Link
                        to={`/course`}
                        className="text-blue-600 hover:text-blue-700 font-medium whitespace-nowrap"
                      >
                        View Details →
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </motion.section>
            
            {/* Roadmap */}
            <motion.section variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className={cardBg + " rounded-3xl p-8 shadow-lg"}>
              <h2 className="text-2xl font-bold mb-8">Learning Roadmap</h2>
              <div className="relative">
                <div className={`absolute left-8 top-0 bottom-0 w-0.5 ${theme === "dark" ? "bg-slate-700" : "bg-gray-200"}`} />
                <div className="space-y-12">
                  {path.roadmap.map((item, index) => (
                    <div key={index} className="relative flex gap-6">
                      <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${path.color} flex items-center justify-center flex-shrink-0 z-10`}>
                        <span className="text-white font-bold text-xl">M{item.month}</span>
                      </div>
                      <div className="pt-1 flex-grow">
                        <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                        <p className={`${theme === "dark" ? "text-gray-300" : "text-gray-600"}`}>
                          Focus: {item.focus}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.section>
          </div>
          
          {/* Right Column */}
          <div className="space-y-8">
            {/* Prerequisites */}
            <motion.section variants={scaleUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className={cardBg + " rounded-3xl p-8 shadow-lg"}>
              <h3 className="text-xl font-bold mb-6">Prerequisites</h3>
              <ul className="space-y-3">
                {path.prerequisites.map((req, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>{req}</span>
                  </li>
                ))}
              </ul>
            </motion.section>
            
            {/* Learning Outcomes */}
            <motion.section variants={scaleUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className={cardBg + " rounded-3xl p-8 shadow-lg"}>
              <h3 className="text-xl font-bold mb-6">What You'll Achieve</h3>
              <ul className="space-y-4">
                {path.outcomes.map((outcome, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <Target className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
                    <span>{outcome}</span>
                  </li>
                ))}
              </ul>
            </motion.section>
            
            {/* Stats */}
            <motion.section variants={scaleUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className={cardBg + " rounded-3xl p-8 shadow-lg"}>
              <h3 className="text-xl font-bold mb-6">Path Statistics</h3>
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Users className="w-5 h-5 text-blue-500" />
                    <span>Active Learners</span>
                  </div>
                  <span className="font-bold">2,500+</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Star className="w-5 h-5 text-yellow-500" />
                    <span>Average Rating</span>
                  </div>
                  <span className="font-bold">4.8/5.0</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Briefcase className="w-5 h-5 text-green-500" />
                    <span>Job Placement Rate</span>
                  </div>
                  <span className="font-bold">89%</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Award className="w-5 h-5 text-purple-500" />
                    <span>Completion Rate</span>
                  </div>
                  <span className="font-bold">76%</span>
                </div>
              </div>
            </motion.section>
            
            {/* CTA Card */}
            <motion.div variants={scaleUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className={`rounded-3xl p-8 shadow-lg bg-gradient-to-br ${path.color} text-white`}>
              <h3 className="text-2xl font-bold mb-4">Ready to Start?</h3>
              <p className="mb-6">Begin your journey to becoming a {path.title.split(" Path")[0]} today.</p>
              <Link
                to="/auth"
                className="inline-flex items-center justify-center gap-2 w-full bg-white text-blue-900 hover:bg-blue-50 font-semibold py-4 px-8 rounded-xl transition hover:scale-105"
              >
                Start Free Trial
                <ChevronRight className="w-5 h-5" />
              </Link>
              <p className="text-white/80 text-sm mt-3 text-center">No credit card required</p>
            </motion.div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}