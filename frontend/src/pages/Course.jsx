import { motion } from "framer-motion";
import Navbar from "../Navbar";
import Footer from "../footer";
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
  Briefcase
} from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

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

/* ---------------- COURSE CATEGORIES ---------------- */
const categories = [
  { id: "all", name: "All AI Tutors", icon: BookOpen, count: 10 },
  { id: "ai-ml", name: "AI & Machine Learning", icon: Brain, count: 3 },
  { id: "web-dev", name: "Web Development", icon: Code, count: 3 },
  { id: "data-science", name: "Data Science", icon: Database, count: 2 },
  { id: "mobile", name: "Mobile Development", icon: Smartphone, count: 1 },
  { id: "cybersecurity", name: "Cybersecurity", icon: Shield, count: 1 },
];

/* ---------------- AI TUTORS DATA (10 total) ---------------- */
const aiTutors = [
  {
    id: 1,
    title: "Full-Stack Web AI Tutor",
    category: "web-dev",
    description: "Interactive AI tutor for mastering modern web development from frontend to backend with real-world projects.",
    level: "Beginner to Advanced",
    students: 1245,
    rating: 4.9,
    modules: 24,
    skills: ["React", "Node.js", "MongoDB", "TypeScript", "AWS"],
    detailedDescription: "This AI tutor guides you through building complete web applications. Learn React hooks, state management, server-side rendering with Next.js, REST APIs, authentication, and deployment. Get instant code reviews and personalized learning paths."
  },
  {
    id: 2,
    title: "AI & Machine Learning Tutor",
    category: "ai-ml",
    description: "Intelligent AI mentor for understanding and implementing machine learning algorithms and neural networks.",
    level: "Intermediate",
    students: 890,
    rating: 4.8,
    modules: 32,
    skills: ["Python", "TensorFlow", "PyTorch", "Neural Networks"],
    detailedDescription: "From linear regression to deep learning, this AI tutor explains complex concepts with interactive examples. Work on real datasets, build models, and understand the mathematics behind ML. Get personalized project suggestions based on your progress."
  },
  {
    id: 3,
    title: "Data Science AI Tutor",
    category: "data-science",
    description: "Smart tutor for data analysis, visualization, and statistical modeling with hands-on projects.",
    level: "Beginner",
    students: 765,
    rating: 4.7,
    modules: 28,
    skills: ["Python", "Pandas", "SQL", "Tableau", "Statistics"],
    detailedDescription: "Learn data cleaning, exploratory analysis, and storytelling with data. This AI tutor provides instant feedback on your analysis, suggests better visualization techniques, and helps you build a strong portfolio of data projects."
  },
  {
    id: 4,
    title: "Mobile Development AI Tutor",
    category: "mobile",
    description: "AI-powered guide for building cross-platform mobile apps with React Native and Flutter.",
    level: "Beginner",
    students: 540,
    rating: 4.6,
    modules: 20,
    skills: ["React Native", "JavaScript", "Redux", "Mobile UI"],
    detailedDescription: "Create beautiful mobile apps that work on both iOS and Android. Learn navigation, state management, API integration, and app store deployment. The AI tutor reviews your code, suggests optimizations, and helps debug mobile-specific issues."
  },
  {
    id: 5,
    title: "Cybersecurity AI Tutor",
    category: "cybersecurity",
    description: "Interactive security mentor teaching ethical hacking, network security, and threat protection.",
    level: "Intermediate",
    students: 420,
    rating: 4.9,
    modules: 16,
    skills: ["Network Security", "Ethical Hacking", "Cryptography"],
    detailedDescription: "Learn to think like a hacker to better defend systems. This AI tutor guides you through penetration testing, vulnerability assessment, and security best practices. Practice in safe, simulated environments with real-time feedback."
  },
  {
    id: 6,
    title: "Advanced React Patterns AI Tutor",
    category: "web-dev",
    description: "Master complex React patterns, performance optimization, and advanced state management techniques.",
    level: "Advanced",
    students: 680,
    rating: 4.8,
    modules: 12,
    skills: ["React", "Performance", "State Management", "Testing"],
    detailedDescription: "Dive deep into React internals, custom hooks, render optimization, and testing strategies. This AI tutor helps you write scalable, maintainable React code with industry best practices and architectural patterns."
  },
  {
    id: 7,
    title: "Machine Learning Engineering AI Tutor",
    category: "ai-ml",
    description: "AI mentor for deploying, scaling, and maintaining production ML systems with MLOps practices.",
    level: "Advanced",
    students: 380,
    rating: 4.9,
    modules: 26,
    skills: ["MLOps", "Docker", "Kubernetes", "AWS SageMaker"],
    detailedDescription: "Transition from ML models to production systems. Learn containerization, CI/CD for ML, model monitoring, and cloud deployment. The AI tutor reviews your pipeline architecture and suggests improvements for scalability."
  },
  {
    id: 8,
    title: "Python & Automation AI Tutor",
    category: "web-dev",
    description: "Learn Python programming, automation scripts, and backend development with intelligent guidance.",
    level: "Beginner",
    students: 920,
    rating: 4.7,
    modules: 18,
    skills: ["Python", "FastAPI", "Automation", "Scripting"],
    detailedDescription: "Master Python from basics to advanced topics. Build web APIs with FastAPI, automate repetitive tasks, and learn backend development. The AI tutor provides instant code reviews and suggests more Pythonic solutions."
  },
  {
    id: 9,
    title: "Data Engineering AI Tutor",
    category: "data-science",
    description: "Build data pipelines, ETL processes, and data warehouses with guided AI mentorship.",
    level: "Intermediate",
    students: 450,
    rating: 4.8,
    modules: 22,
    skills: ["SQL", "ETL", "Data Pipelines", "Airflow", "Spark"],
    detailedDescription: "Learn to build scalable data infrastructure. This AI tutor guides you through designing data models, creating ETL pipelines, and working with big data technologies. Get architecture reviews and optimization suggestions."
  },
  {
    id: 10,
    title: "DevOps & Cloud AI Tutor",
    category: "cybersecurity",
    description: "Master infrastructure as code, CI/CD pipelines, and cloud deployment with AI-powered guidance.",
    level: "Intermediate",
    students: 510,
    rating: 4.7,
    modules: 20,
    skills: ["Docker", "Kubernetes", "Terraform", "AWS", "GitHub Actions"],
    detailedDescription: "Learn modern DevOps practices and cloud infrastructure. This AI tutor helps you set up automated deployment pipelines, manage infrastructure as code, and optimize cloud costs. Get real-time feedback on your configurations."
  },
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

export default function Course() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [hoveredTutor, setHoveredTutor] = useState(null);

  const filteredTutors = aiTutors.filter(tutor => {
    const matchesCategory = selectedCategory === "all" || tutor.category === selectedCategory;
    const matchesSearch = tutor.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         tutor.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="w-full min-h-screen bg-gray-50">
      <Navbar />

      {/* HERO SECTION - Raised 5px */}
      <section className="relative text-white py-32 bg-blue-900  to-purple-900 -mt-5">
        <div className="absolute inset-0 bg-[url('/assets/course.png')] bg-cover bg-center opacity-20" />
        
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="relative z-10 max-w-6xl mx-auto px-6 text-center"
        >
          <h1 className="text-5xl md:text-6xl font-extrabold leading-tight">
            Learn With Intelligent AI Tutors
          </h1>
          
          <p className="mt-6 text-xl text-blue-100 max-w-3xl mx-auto">
            No videos, no lectures. Interactive AI tutors that adapt to your learning style and pace.
          </p>

          {/* SEARCH BAR */}
          <motion.div
            variants={fadeUp}
            transition={{ delay: 0.2 }}
            className="mt-12 max-w-2xl mx-auto"
          >
            <div className="relative">
              <Search className="absolute left-6 top-1/2 transform -translate-y-1/2 text-gray-400 w-6 h-6" />
              <input
                type="text"
                placeholder="Search AI tutors by skill or topic..."
                className="w-full pl-16 pr-6 bg-white py-5 rounded-2xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-4 focus:ring-blue-500/30"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </motion.div>

          {/* STATS */}
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8"
          >
            <Stat value="10+" label="AI Tutors" />
            <Stat value="24/7" label="Availability" />
            <Stat value="4.8" label="Avg Rating" />
            <Stat value="6,500+" label="Active Learners" />
          </motion.div>
        </motion.div>
      </section>

      {/* CATEGORIES */}
      <motion.section
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="max-w-7xl mx-auto px-6 py-12 -mt-10"
      >
        <div className="bg-white rounded-3xl shadow-xl p-8">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900">Browse AI Tutors by Category</h2>
            <p className="text-gray-600 mt-2">Find the perfect AI tutor for your learning goals</p>
          </div>

          <div className="flex flex-wrap gap-4">
            {categories.map((category) => {
              const Icon = category.icon;
              return (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`flex items-center gap-3 px-6 py-4 rounded-2xl transition-all ${
                    selectedCategory === category.id
                      ? "bg-blue-600 text-white shadow-lg"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-semibold">{category.name}</span>
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    selectedCategory === category.id
                      ? "bg-white/20"
                      : "bg-gray-300"
                  }`}>
                    {category.count}
                  </span>
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
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900">
            {selectedCategory === "all" 
              ? "All AI Tutors" 
              : categories.find(c => c.id === selectedCategory)?.name}
          </h2>
          <p className="text-gray-600 mt-2">
            {filteredTutors.length} AI tutors available • Hover to see detailed description
          </p>
        </div>

        {filteredTutors.length === 0 ? (
          <div className="text-center py-20">
            <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-2xl font-semibold text-gray-700 mb-2">No AI tutors found</h3>
            <p className="text-gray-500">Try adjusting your search or filter criteria</p>
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
            className="inline-flex items-center justify-center gap-3 bg-blue-600 hover:from-blue-700 hover:to-purple-700 text-white px-12 py-4 rounded-full text-lg font-semibold transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
          >
            Start Learning with AI Tutor
            <ChevronRight className="w-5 h-5" />
          </Link>
          <p className="text-gray-600 mt-4">
            Get instant access to all AI tutors • No credit card required
          </p>
        </motion.div>
      </motion.section>

      {/* LEARNING PATHS */}
      <section className="relative py-32 bg-gradient-to-br from-gray-900 to-blue-900 text-white">
        <div className="absolute inset-0 bg-[url('/assets/ghj.png')] bg-cover bg-center opacity-10" />
        
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="relative z-10 max-w-7xl mx-auto px-6"
        >
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">AI-Powered Learning Paths</h2>
            <p className="text-blue-200 max-w-2xl mx-auto">
              Follow intelligent roadmaps curated by AI to become job-ready in high-demand tech roles
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {learningPaths.map((path) => {
              const Icon = path.icon;
              return (
                <motion.div
                  key={path.id}
                  variants={scaleUp}
                  className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 hover:bg-white/15 transition"
                >
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${path.color} flex items-center justify-center mb-6`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold mb-3">{path.title}</h3>
                  <p className="text-blue-200 mb-6">{path.description}</p>
                  
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

                  <button className="w-full mt-8 bg-white text-blue-900 py-3 rounded-xl font-semibold hover:bg-blue-50 transition">
                    Explore Path
                  </button>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </section>

      {/* WHY CHOOSE UPPERCLASS AI */}
      <motion.section
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="max-w-6xl mx-auto px-6 py-24"
      >
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Why Learn With AI Tutors?
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Experience personalized, adaptive learning that traditional courses can't match
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <BenefitCard
            icon={Target}
            title="Personalized Learning"
            description="AI adapts to your pace, knowledge gaps, and learning style for optimal progress"
          />
          <BenefitCard
            icon={Briefcase}
            title="Project-Based Guidance"
            description="Build real portfolio projects with step-by-step AI mentorship"
          />
          <BenefitCard
            icon={Award}
            title="Instant Feedback"
            description="Get code reviews and explanations in real-time, 24/7"
          />
          <BenefitCard
            icon={Users}
            title="Always Available"
            description="Learn anytime, anywhere - no scheduling, no waiting"
          />
          <BenefitCard
            icon={Brain}
            title="Adaptive Difficulty"
            description="Content adjusts based on your understanding and progress"
          />
          <BenefitCard
            icon={CheckCircle}
            title="Career-Focused"
            description="Learn skills that companies actually need and use"
          />
        </div>
      </motion.section>

      {/* CTA SECTION */}
      <motion.section
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="py-24 bg-blue-800 text-white"
      >
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl -extrabold mb-6">
            Start Your AI-Powered Learning Journey
          </h2>
          
          <p className="text-xl text-blue-100 max-w-2xl mx-auto mb-10">
            Join thousands of learners who are mastering tech skills faster with intelligent AI tutors.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Link
              to="/auth/authpage"
              className="bg-white text-blue-900 px-10 py-4 rounded-full font-semibold hover:scale-105 transition"
            >
              Get Started Free
            </Link>
            
            <button className="border-2 border-white text-white px-10 py-4 rounded-full font-semibold hover:bg-white/10 transition">
              Try AI Tutor Demo
            </button>
          </div>
          
          <p className="mt-8 text-blue-200">
            Free 7-day trial • No credit card required • Cancel anytime
          </p>
        </div>
      </motion.section>

      <Footer />
    </div>
  );
}

/* ---------------- COMPONENTS ---------------- */
function AITutorCard({ tutor, isHovered, onHover, onLeave }) {
  return (
    <motion.div 
      variants={scaleUp}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      className="relative bg-white rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 min-h-[280px] cursor-pointer"
    >
      <div className="p-6 h-full flex flex-col">
        <div className="flex justify-between items-start mb-4">
          <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
            {tutor.level}
          </span>
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span className="font-semibold">{tutor.rating}</span>
          </div>
        </div>

        <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
          {tutor.title}
        </h3>
        
        <p className="text-gray-600 mb-4 flex-grow line-clamp-3">
          {tutor.description}
        </p>

        <div className="flex items-center justify-between text-sm text-gray-600 mt-4">
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4" />
            <span>{tutor.students.toLocaleString()}+ learners</span>
          </div>
          <div className="flex items-center gap-2">
            <BookOpen className="w-4 h-4" />
            <span>{tutor.modules} modules</span>
          </div>
        </div>

        {/* Hover Overlay with Detailed Description */}
        {isHovered && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 bg-gradient-to-br from-blue-700/95 to-indigo-700/95 backdrop-blur-sm text-white p-6 flex flex-col"
          >
            <div className="flex-grow">
              <h4 className="text-lg font-bold mb-3">What You'll Learn</h4>
              <p className="text-blue-100 text-sm leading-relaxed mb-4">
                {tutor.detailedDescription}
              </p>
              
              <div className="mt-4">
                <h5 className="font-semibold mb-2">Key Skills:</h5>
                <div className="flex flex-wrap gap-2">
                  {tutor.skills.slice(0, 3).map((skill, idx) => (
                    <span key={idx} className="px-3 py-1 bg-white/20 rounded-full text-xs">
                      {skill}
                    </span>
                  ))}
                  {tutor.skills.length > 3 && (
                    <span className="px-3 py-1 bg-white/20 rounded-full text-xs">
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

function Stat({ value, label }) {
  return (
    <motion.div variants={fadeIn} className="text-center">
      <div className="text-4xl font-bold mb-2">{value}</div>
      <div className="text-blue-200 font-medium">{label}</div>
    </motion.div>
  );
}

function BenefitCard({ icon: Icon, title, description }) {
  return (
    <motion.div variants={fadeUp} className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-shadow">
      <div className="w-14 h-14 rounded-2xl bg-blue-100 flex items-center justify-center mb-6">
        <Icon className="w-7 h-7 text-blue-600" />
      </div>
      <h3 className="text-xl font-bold text-gray-900 mb-3">{title}</h3>
      <p className="text-gray-600 leading-relaxed">{description}</p>
    </motion.div>
  );
}