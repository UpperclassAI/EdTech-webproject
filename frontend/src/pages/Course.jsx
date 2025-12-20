"use client";

import { motion } from "framer-motion";
import Navbar from "../Navbar";
import Footer from "../footer";
import { 
  Search, 
  Filter, 
  Clock, 
  Users, 
  BarChart, 
  Star, 
  PlayCircle, 
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

/* ---------------- ANIMATION VARIANTS ---------------- */
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
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
  { id: "all", name: "All Courses", icon: BookOpen, count: 45 },
  { id: "ai-ml", name: "AI & Machine Learning", icon: Brain, count: 12 },
  { id: "web-dev", name: "Web Development", icon: Code, count: 15 },
  { id: "data-science", name: "Data Science", icon: Database, count: 8 },
  { id: "mobile", name: "Mobile Development", icon: Smartphone, count: 6 },
  { id: "cybersecurity", name: "Cybersecurity", icon: Shield, count: 4 },
];

/* ---------------- COURSES DATA ---------------- */
const featuredCourses = [
  {
    id: 1,
    title: "Full-Stack Web Development",
    category: "web-dev",
    description: "Master React, Node.js, and modern web development tools",
    duration: "12 weeks",
    students: 1245,
    level: "Beginner to Advanced",
    rating: 4.9,
    reviews: 320,
    instructor: "Sarah Chen",
    instructorRole: "Senior Engineer at Google",
    price: "$299",
    originalPrice: "$499",
    featured: true,
    badge: "Most Popular",
    modules: 24,
    projects: 8,
    skills: ["React", "Node.js", "MongoDB", "TypeScript", "AWS"],
  },
  {
    id: 2,
    title: "AI & Machine Learning Fundamentals",
    category: "ai-ml",
    description: "Build AI models with Python, TensorFlow, and PyTorch",
    duration: "16 weeks",
    students: 890,
    level: "Intermediate",
    rating: 4.8,
    reviews: 245,
    instructor: "Dr. Alex Johnson",
    instructorRole: "AI Research Lead",
    price: "$349",
    originalPrice: "$599",
    featured: true,
    badge: "Trending",
    modules: 32,
    projects: 12,
    skills: ["Python", "TensorFlow", "PyTorch", "Neural Networks", "NLP"],
  },
  {
    id: 3,
    title: "Data Science Bootcamp",
    category: "data-science",
    description: "Complete data analysis, visualization, and ML pipeline",
    duration: "14 weeks",
    students: 765,
    level: "Beginner",
    rating: 4.7,
    reviews: 198,
    instructor: "Maria Rodriguez",
    instructorRole: "Data Scientist at Netflix",
    price: "$279",
    originalPrice: "$449",
    featured: true,
    badge: "New",
    modules: 28,
    projects: 10,
    skills: ["Python", "Pandas", "SQL", "Tableau", "ML Algorithms"],
  },
];

const allCourses = [
  ...featuredCourses,
  {
    id: 4,
    title: "iOS Development with SwiftUI",
    category: "mobile",
    description: "Build beautiful iOS apps with modern SwiftUI",
    duration: "10 weeks",
    students: 540,
    level: "Beginner",
    rating: 4.6,
    reviews: 156,
    instructor: "Michael Park",
    instructorRole: "iOS Developer at Apple",
    price: "$249",
    originalPrice: "$399",
    modules: 20,
    projects: 6,
    skills: ["Swift", "SwiftUI", "Xcode", "Core Data", "ARKit"],
  },
  {
    id: 5,
    title: "Cybersecurity Essentials",
    category: "cybersecurity",
    description: "Learn to protect systems and networks from threats",
    duration: "8 weeks",
    students: 420,
    level: "Beginner",
    rating: 4.9,
    reviews: 89,
    instructor: "James Wilson",
    instructorRole: "Security Analyst",
    price: "$229",
    originalPrice: "$379",
    modules: 16,
    projects: 5,
    skills: ["Network Security", "Ethical Hacking", "Cryptography", "Firewalls"],
  },
  {
    id: 6,
    title: "Advanced React Patterns",
    category: "web-dev",
    description: "Master advanced React concepts and performance optimization",
    duration: "6 weeks",
    students: 680,
    level: "Advanced",
    rating: 4.8,
    reviews: 142,
    instructor: "Emma Davis",
    instructorRole: "React Core Contributor",
    price: "$199",
    originalPrice: "$349",
    modules: 12,
    projects: 4,
    skills: ["React", "Performance", "State Management", "Testing", "TypeScript"],
  },
  {
    id: 7,
    title: "Mobile App Development",
    category: "mobile",
    description: "Cross-platform apps with React Native",
    duration: "10 weeks",
    students: 520,
    level: "Intermediate",
    rating: 4.7,
    reviews: 134,
    instructor: "David Kim",
    instructorRole: "Mobile Lead at Meta",
    price: "$269",
    originalPrice: "$429",
    modules: 22,
    projects: 7,
    skills: ["React Native", "JavaScript", "Redux", "Native Modules"],
  },
  {
    id: 8,
    title: "Machine Learning Engineering",
    category: "ai-ml",
    description: "Production-ready ML systems and MLOps",
    duration: "12 weeks",
    students: 380,
    level: "Advanced",
    rating: 4.9,
    reviews: 98,
    instructor: "Dr. Lisa Wang",
    instructorRole: "ML Engineer at OpenAI",
    price: "$399",
    originalPrice: "$699",
    modules: 26,
    projects: 9,
    skills: ["MLOps", "Docker", "Kubernetes", "AWS SageMaker", "CI/CD"],
  },
];

/* ---------------- LEARNING PATHS ---------------- */
const learningPaths = [
  {
    id: "frontend",
    title: "Frontend Developer",
    description: "Master modern frontend technologies and frameworks",
    duration: "6 months",
    courses: 8,
    averageSalary: "$95,000",
    jobs: "12K+ openings",
    icon: Code,
    color: "from-blue-500 to-cyan-500",
  },
  {
    id: "backend",
    title: "Backend Engineer",
    description: "Build scalable servers, APIs, and databases",
    duration: "7 months",
    courses: 10,
    averageSalary: "$110,000",
    jobs: "8K+ openings",
    icon: Database,
    color: "from-purple-500 to-pink-500",
  },
  {
    id: "data",
    title: "Data Scientist",
    description: "Turn data into insights and predictions",
    duration: "8 months",
    courses: 12,
    averageSalary: "$120,000",
    jobs: "15K+ openings",
    icon: BarChart,
    color: "from-green-500 to-emerald-500",
  },
  {
    id: "ai",
    title: "AI Specialist",
    description: "Create intelligent systems and AI applications",
    duration: "9 months",
    courses: 14,
    averageSalary: "$140,000",
    jobs: "10K+ openings",
    icon: Brain,
    color: "from-orange-500 to-red-500",
  },
];

export default function Course() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("popular");

  const filteredCourses = allCourses.filter(course => {
    const matchesCategory = selectedCategory === "all" || course.category === selectedCategory;
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         course.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const sortedCourses = [...filteredCourses].sort((a, b) => {
    switch (sortBy) {
      case "popular":
        return b.students - a.students;
      case "rating":
        return b.rating - a.rating;
      case "newest":
        return b.id - a.id;
      case "price-low":
        return parseFloat(a.price.slice(1)) - parseFloat(b.price.slice(1));
      case "price-high":
        return parseFloat(b.price.slice(1)) - parseFloat(a.price.slice(1));
      default:
        return 0;
    }
  });

  return (
    <div className="w-full min-h-screen bg-gray-50">
      <Navbar />

      {/* HERO SECTION */}
      <section className="relative text-white py-32 bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900">
        <div className="absolute inset-0 bg-[url('/assets/abt.png')] bg-cover bg-center opacity-20" />
        
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="relative z-10 max-w-6xl mx-auto px-6 text-center"
        >
          <h1 className="text-5xl md:text-6xl font-extrabold leading-tight">
            Master In-Demand Tech Skills
          </h1>
          
          <p className="mt-6 text-xl text-blue-100 max-w-3xl mx-auto">
            Industry-relevant courses taught by experts from top tech companies. 
            Build your future with hands-on projects and mentorship.
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
                placeholder="Search courses, topics, or skills..."
                className="w-full pl-16 pr-6 py-5 rounded-2xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-4 focus:ring-blue-500/30"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-semibold transition">
                Search
              </button>
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
            <Stat value="45+" label="Courses" />
            <Stat value="10K+" label="Students" />
            <Stat value="50+" label="Instructors" />
            <Stat value="94%" label="Career Impact" />
          </motion.div>
        </motion.div>
      </section>

      {/* CATEGORIES & FILTERS */}
      <motion.section
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="max-w-7xl mx-auto px-6 py-12 -mt-10"
      >
        <div className="bg-white rounded-3xl shadow-xl p-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Browse by Category</h2>
              <p className="text-gray-600 mt-2">Find the perfect course for your goals</p>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-gray-600">
                <Filter className="w-5 h-5" />
                <span className="font-medium">Sort by:</span>
              </div>
              <select 
                className="border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="popular">Most Popular</option>
                <option value="rating">Highest Rated</option>
                <option value="newest">Newest</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
            </div>
          </div>

          {/* CATEGORY TABS */}
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

      {/* FEATURED COURSES */}
      {selectedCategory === "all" && (
        <motion.section
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="max-w-7xl mx-auto px-6 py-16"
        >
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl font-bold text-gray-900">Featured Courses</h2>
              <p className="text-gray-600 mt-2">Most popular courses chosen by students</p>
            </div>
            <button className="text-blue-600 hover:text-blue-700 font-semibold flex items-center gap-2">
              View All <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {featuredCourses.map((course) => (
              <FeaturedCourseCard key={course.id} course={course} />
            ))}
          </div>
        </motion.section>
      )}

      {/* ALL COURSES */}
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
              ? "All Courses" 
              : categories.find(c => c.id === selectedCategory)?.name}
          </h2>
          <p className="text-gray-600 mt-2">
            {sortedCourses.length} courses found
          </p>
        </div>

        {sortedCourses.length === 0 ? (
          <div className="text-center py-20">
            <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-2xl font-semibold text-gray-700 mb-2">No courses found</h3>
            <p className="text-gray-500">Try adjusting your search or filter criteria</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sortedCourses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        )}
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
            <h2 className="text-4xl font-bold mb-4">Structured Learning Paths</h2>
            <p className="text-blue-200 max-w-2xl mx-auto">
              Follow curated roadmaps to become job-ready in high-demand tech roles
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
                      <span>{path.courses} courses</span>
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
            Why Learn With Upperclass AI?
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            We're redefining tech education for the modern world
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <BenefitCard
            icon={Target}
            title="Industry-Relevant Skills"
            description="Learn exactly what companies are looking for with our constantly updated curriculum"
          />
          <BenefitCard
            icon={Briefcase}
            title="Project-Based Learning"
            description="Build real portfolio projects that demonstrate your skills to employers"
          />
          <BenefitCard
            icon={Award}
            title="Career Support"
            description="Get resume reviews, interview prep, and job placement assistance"
          />
          <BenefitCard
            icon={Users}
            title="Expert Instructors"
            description="Learn from professionals working at Google, Meta, Microsoft, and more"
          />
          <BenefitCard
            icon={Brain}
            title="AI-Powered Learning"
            description="Personalized learning paths that adapt to your pace and goals"
          />
          <BenefitCard
            icon={CheckCircle}
            title="Certification"
            description="Earn recognized certificates that boost your career prospects"
          />
        </div>
      </motion.section>

      {/* CTA SECTION */}
      <motion.section
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="py-24 bg-gradient-to-br from-blue-900 to-indigo-900 text-white"
      >
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-extrabold mb-6">
            Start Your Learning Journey Today
          </h2>
          
          <p className="text-xl text-blue-100 max-w-2xl mx-auto mb-10">
            Join thousands of learners transforming their careers with hands-on tech education.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <button className="bg-white text-blue-900 px-10 py-4 rounded-full font-semibold hover:scale-105 transition">
              Browse All Courses
            </button>
            
            <button className="border-2 border-white text-white px-10 py-4 rounded-full font-semibold hover:bg-white/10 transition">
              Book a Free Consultation
            </button>
          </div>
          
          <p className="mt-8 text-blue-200">
            Not sure where to start?{" "}
            <a href="#" className="underline font-semibold">Take our skill assessment</a>
          </p>
        </div>
      </motion.section>

      <Footer />
    </div>
  );
}

/* ---------------- COMPONENTS ---------------- */
function FeaturedCourseCard({ course }) {
  return (
    <motion.div variants={scaleUp} className="relative group">
      {course.badge && (
        <div className="absolute top-4 left-4 z-10 bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-2 rounded-full text-sm font-semibold">
          {course.badge}
        </div>
      )}
      
      <div className="bg-white rounded-3xl shadow-2xl overflow-hidden hover:shadow-3xl transition-all duration-300">
        {/* Course Image */}
        <div className="relative h-48 bg-gradient-to-br from-blue-500 to-indigo-600">
          <div className="absolute inset-0 flex items-center justify-center">
            <PlayCircle className="w-16 h-16 text-white/90" />
          </div>
          <div className="absolute bottom-4 right-4 flex items-center gap-1 bg-black/50 text-white px-3 py-1 rounded-full">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span className="font-semibold">{course.rating}</span>
            <span className="text-sm opacity-90">({course.reviews})</span>
          </div>
        </div>

        {/* Course Content */}
        <div className="p-8">
          <div className="flex items-center justify-between mb-4">
            <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
              {course.level}
            </span>
            <div className="flex items-center gap-2 text-gray-600">
              <Clock className="w-4 h-4" />
              <span className="text-sm">{course.duration}</span>
            </div>
          </div>

          <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition">
            {course.title}
          </h3>
          
          <p className="text-gray-600 mb-6 line-clamp-2">
            {course.description}
          </p>

          <div className="flex items-center justify-between mb-6">
            <div>
              <p className="font-semibold text-gray-900">{course.instructor}</p>
              <p className="text-sm text-gray-500">{course.instructorRole}</p>
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-gray-500" />
              <span className="text-sm text-gray-600">{course.students.toLocaleString()}</span>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <span className="text-2xl font-bold text-gray-900">{course.price}</span>
              {course.originalPrice && (
                <span className="text-gray-500 line-through ml-2">{course.originalPrice}</span>
              )}
            </div>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold transition">
              Enroll Now
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function CourseCard({ course }) {
  return (
    <motion.div variants={fadeUp} className="bg-white rounded-3xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
      <div className="p-8">
        <div className="flex items-start justify-between mb-6">
          <div>
            <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium mb-3 inline-block">
              {course.level}
            </span>
            <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
              {course.title}
            </h3>
          </div>
          {course.featured && (
            <Star className="w-6 h-6 text-yellow-500 fill-yellow-500" />
          )}
        </div>

        <p className="text-gray-600 mb-6 line-clamp-3">
          {course.description}
        </p>

        {/* Skills */}
        <div className="flex flex-wrap gap-2 mb-6">
          {course.skills.slice(0, 3).map((skill, idx) => (
            <span
              key={idx}
              className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
            >
              {skill}
            </span>
          ))}
          {course.skills.length > 3 && (
            <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
              +{course.skills.length - 3} more
            </span>
          )}
        </div>

        {/* Stats */}
        <div className="flex items-center justify-between text-sm text-gray-600 mb-6">
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            <span>{course.duration}</span>
          </div>
          <div className="flex items-center gap-1">
            <BookOpen className="w-4 h-4" />
            <span>{course.modules} modules</span>
          </div>
          <div className="flex items-center gap-1">
            <Users className="w-4 h-4" />
            <span>{course.students.toLocaleString()}</span>
          </div>
        </div>

        {/* Rating & Price */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span className="font-semibold">{course.rating}</span>
            </div>
            <span className="text-gray-500">({course.reviews} reviews)</span>
          </div>
          
          <div className="text-right">
            <div className="text-2xl font-bold text-gray-900">{course.price}</div>
            {course.originalPrice && (
              <div className="text-sm text-gray-500 line-through">{course.originalPrice}</div>
            )}
          </div>
        </div>

        <button className="w-full mt-6 border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white py-3 rounded-xl font-semibold transition">
          View Details
        </button>
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