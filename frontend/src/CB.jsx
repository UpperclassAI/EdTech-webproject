"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  MessageCircle, 
  X, 
  Send, 
  Bot, 
  HelpCircle,
  BookOpen,
  Users,
  Brain,
  Code,
  ChevronDown,
  ChevronUp,
  Sparkles,
  Clock,
  Star,
  Target,
  CheckCircle,
  DollarSign,
  GraduationCap,
  Globe,
  Smartphone,
  Database,
  Zap,
  Shield,
  TrendingUp,
  Briefcase,
  UserCheck,
  Award,
  Download,
  Video,
  Headphones,
  Mail,
  Calendar,
  Lock,
  Unlock,
  Smartphone as Mobile,
  Server,
  Cpu,
  Book,
  FileCode,
  Layout,
  Terminal,
  GitBranch,
  Cloud,
  BarChart,
  Settings,
  Gift,
  Clock as Timer,
  ThumbsUp,
  Rocket,
  Heart
} from "lucide-react";
import { useTheme } from "./context/ThemeContext";

// Comprehensive FAQ data covering all aspects
const faqData = [
  {
    category: "General Information",
    icon: Globe,
    questions: [
      {
        q: "What is Upperclass AI and what makes it unique?",
        a: "Upperclass AI is an innovative ed-tech platform that blends AI-powered personalized learning with human mentorship. Unlike traditional courses, we provide interactive AI tutors that adapt to your learning style, offer 24/7 guidance, and focus on real-world projects rather than passive video lectures."
      },
      {
        q: "Who founded Upperclass AI and what's the mission?",
        a: "Upperclass AI was founded in 2022 with a vision to democratize tech education. Our mission is to make quality tech education accessible and personalized for everyone through AI-driven learning, helping learners build confidence and real-world skills."
      },
      {
        q: "How many students have you helped so far?",
        a: "We've helped over 2,000 students globally across 50+ partner schools with a 98% satisfaction rate. Our community continues to grow as we expand our AI tutor offerings."
      },
      {
        q: "What values does Upperclass AI stand for?",
        a: "We operate on four core values: Innovation (constantly improving our AI), Integrity (transparent and honest education), Collaboration (global community learning), and Continuous Growth (helping learners evolve with technology)."
      },
      {
        q: "Is Upperclass AI available worldwide?",
        a: "Yes! We're a global platform accessible from anywhere with internet. Our content supports multiple languages and timezones, with AI tutors available 24/7."
      },
      {
        q: "What's the story behind the name 'Upperclass AI'?",
        a: "The name represents our commitment to providing 'upper-class' quality education through AI technology. We aim to elevate learning standards and help students achieve elite skills in their fields."
      }
    ]
  },
  {
    category: "AI Tutors & Learning",
    icon: Brain,
    questions: [
      {
        q: "How do your AI tutors actually work?",
        a: "Our AI tutors use advanced machine learning algorithms to: 1) Assess your current skill level, 2) Create personalized learning paths, 3) Provide interactive coding exercises, 4) Give instant feedback and corrections, 5) Adapt difficulty based on your progress, and 6) Offer project-based guidance 24/7."
      },
      {
        q: "How many AI tutors are available and what do they cover?",
        a: "We have 40+ specialized AI tutors across 4 categories: 10 for AI & ML (from basics to advanced models), 10 for Web Development (frontend, backend, full stack), 10 for Data Science (analysis to ML), and 10 for Mobile Development (iOS, Android, cross-platform)."
      },
      {
        q: "Can AI tutors help me build real portfolio projects?",
        a: "Absolutely! Each AI tutor guides you through 3-5 real-world projects. For example, our Web Dev tutors help build e-commerce sites, our Data Science tutors work on predictive models, and our Mobile tutors help create complete apps ready for app stores."
      },
      {
        q: "How do you ensure the AI tutors stay updated with latest tech?",
        a: "We update our AI models monthly with: Latest industry trends, New framework releases, Security best practices, and Student feedback. Our team of 20+ experts constantly refines the curriculum."
      },
      {
        q: "What if I get stuck on a complex problem?",
        a: "Our AI tutors provide step-by-step hints, multiple explanation approaches, and can break down complex problems. If still stuck, you can request human mentor intervention within 24 hours."
      },
      {
        q: "Do AI tutors provide code reviews?",
        a: "Yes! They offer instant code reviews covering: Code efficiency, Best practices, Security vulnerabilities, Performance optimization, and Style consistency. You'll learn professional-grade coding standards."
      },
      {
        q: "How personalized is the learning experience?",
        a: "Extremely personalized! The AI tracks your: Learning pace, Preferred explanation styles, Weak areas, Project interests, and Career goals to tailor content specifically for you."
      },
      {
        q: "Can I have multiple AI tutors simultaneously?",
        a: "Yes! Premium users can work with up to 3 AI tutors simultaneously. For example, you could learn React from one, Node.js from another, and database design from a third while building a full-stack project."
      }
    ]
  },
  {
    category: "Learning Paths & Courses",
    icon: BookOpen,
    questions: [
      {
        q: "What learning paths do you offer and how long do they take?",
        a: "We offer 4 career-focused paths: 1) Frontend Developer (6 months, 8 tutors) 2) Backend Engineer (7 months, 10 tutors) 3) Data Scientist (8 months, 12 tutors) 4) AI Specialist (9 months, 14 tutors). Each includes projects, mentorship, and career preparation."
      },
      {
        q: "What technologies are covered in each learning path?",
        a: "Frontend: HTML/CSS/JS, React, Vue, Next.js, TypeScript. Backend: Node.js, Python, Express, Databases, APIs, DevOps. Data Science: Python, Pandas, ML, Statistics, Visualization. AI: TensorFlow, PyTorch, NLP, Computer Vision, Reinforcement Learning."
      },
      {
        q: "How are the learning paths structured?",
        a: "Each path follows this structure: Month 1-2: Foundations, Month 3-4: Core skills, Month 5-6: Advanced topics, Month 7+: Specialization & capstone projects. Weekly milestones keep you on track."
      },
      {
        q: "Can I switch between learning paths?",
        a: "Yes, you can switch paths at any milestone. Completed modules from your current path will count toward the new path where applicable, ensuring no wasted progress."
      },
      {
        q: "What's the difference between individual tutors and learning paths?",
        a: "Individual tutors focus on specific skills (like 'React Tutor'), while learning paths provide comprehensive career preparation with structured progression, projects, and job-ready skills."
      },
      {
        q: "Do you offer beginner-friendly courses?",
        a: "Absolutely! Every learning path has a beginner track starting from zero. Our AI tutors adapt explanations based on your background - no prior experience needed."
      },
      {
        q: "How many projects will I build in each path?",
        a: "Each learning path includes: 5-8 mini projects, 3-4 medium projects, and 1-2 major capstone projects. By completion, you'll have a portfolio of 10-15 projects."
      },
      {
        q: "Are there any prerequisites for advanced paths?",
        a: "For AI Specialist and advanced Data Science paths, we recommend basic programming knowledge. However, our AI will assess your level and provide bridging content if needed."
      }
    ]
  },
  {
    category: "Pricing & Plans",
    icon: DollarSign,
    questions: [
      {
        q: "What are your pricing plans?",
        a: "We offer three tiers: 1) Basic: $29/month for 1 AI tutor 2) Pro: $49/month for learning paths + 3 tutors 3) Premium: $99/month for unlimited access + human mentorship. Annual plans save 20%."
      },
      {
        q: "Is there a free trial available?",
        a: "Yes! We offer a 7-day free trial with full access to any single AI tutor. No credit card required, no commitment - just pure learning experience."
      },
      {
        q: "Do you offer student discounts?",
        a: "Yes! Students get 40% off all plans with valid student ID. We also partner with universities for institutional discounts."
      },
      {
        q: "What payment methods do you accept?",
        a: "We accept all major credit/debit cards, PayPal, Apple Pay, Google Pay, and bank transfers in selected countries. All payments are secure and encrypted."
      },
      {
        q: "Can I cancel my subscription anytime?",
        a: "Absolutely! You can cancel anytime from your account settings. Your access continues until the end of your billing period, and there are no cancellation fees."
      },
      {
        q: "Do you offer refunds?",
        a: "We offer a 14-day money-back guarantee if you're not satisfied. Just contact support within 14 days of purchase for a full refund."
      },
      {
        q: "Are there any hidden fees?",
        a: "No hidden fees! The price you see is what you pay. No setup fees, no cancellation fees, no surprise charges."
      },
      {
        q: "Do you offer team or enterprise plans?",
        a: "Yes! We offer customized enterprise plans for companies and teams with features like: Admin dashboard, Progress tracking, Custom content, and Volume discounts."
      }
    ]
  },
  {
    category: "Technical Requirements",
    icon: Settings,
    questions: [
      {
        q: "What are the system requirements?",
        a: "Minimum: Modern browser (Chrome/Firefox/Safari), 4GB RAM, stable internet. Recommended: 8GB+ RAM, dual-core processor, for smooth AI interactions and coding environments."
      },
      {
        q: "Do I need to install any software?",
        a: "No installation needed! Everything runs in your browser. We provide cloud-based code editors, terminal access, and project environments."
      },
      {
        q: "What browsers are supported?",
        a: "Chrome 90+, Firefox 88+, Safari 14+, Edge 90+. We recommend Chrome for best performance with our AI features."
      },
      {
        q: "Can I use Upperclass AI on mobile devices?",
        a: "Yes! Our platform is fully responsive on tablets and smartphones. While coding is best on desktop, you can learn concepts, review materials, and chat with AI tutors on mobile."
      },
      {
        q: "Is there an app available?",
        a: "We have progressive web apps (PWAs) that work like native apps. You can 'install' Upperclass AI to your home screen from your browser for quick access."
      },
      {
        q: "What internet speed do I need?",
        a: "Minimum 5 Mbps for standard learning, 10+ Mbps recommended for smooth video calls with mentors and real-time coding sessions."
      },
      {
        q: "Do you support offline learning?",
        a: "Yes! You can download lessons, coding exercises, and project briefs for offline study. AI tutor interactions require internet connection."
      },
      {
        q: "What coding languages can I practice?",
        a: "All major languages: Python, JavaScript, Java, C++, Ruby, Go, Rust, Swift, Kotlin, and more. Our AI tutors support 20+ programming languages."
      }
    ]
  },
  {
    category: "Certificates & Career",
    icon: GraduationCap,
    questions: [
      {
        q: "Do you offer certificates upon completion?",
        a: "Yes! You receive verifiable digital certificates for: Each completed AI tutor, Learning path completion, Project milestones, and Special achievements. Certificates include skill verification and project links."
      },
      {
        q: "Are the certificates recognized by employers?",
        a: "Our certificates are recognized by 500+ partner companies who trust our skills assessment. They're verifiable online and can be shared on LinkedIn and resumes."
      },
      {
        q: "Do you offer job placement assistance?",
        a: "Premium members get: Resume reviews, LinkedIn optimization, Mock interviews, Job matching with partner companies, and Career coaching from industry professionals."
      },
      {
        q: "What's the average salary increase after completion?",
        a: "Our graduates report average salary increases of 40-60%. Frontend developers average $95k, backend engineers $110k, data scientists $120k, and AI specialists $140k annually."
      },
      {
        q: "Do you help with interview preparation?",
        a: "Yes! We offer: Technical interview practice with AI, Behavioral interview coaching, Company-specific preparation, and Real coding challenge simulations."
      },
      {
        q: "Can I add projects to my portfolio?",
        a: "Definitely! All projects are designed to be portfolio-ready. You'll get guidance on documenting, deploying, and presenting your work professionally."
      },
      {
        q: "Do you offer internship opportunities?",
        a: "Top-performing students get access to internship opportunities with our partner companies across various industries and locations."
      },
      {
        q: "How do you track career progress?",
        a: "Our career dashboard tracks: Skills acquired, Projects completed, Certificate achievements, Interview readiness score, and Job application status."
      }
    ]
  },
  {
    category: "Community & Support",
    icon: Users,
    questions: [
      {
        q: "What community features do you offer?",
        a: "We provide: Global student forums, Project collaboration spaces, Live coding sessions, Mentor office hours, Study groups, and Networking events with industry professionals."
      },
      {
        q: "How do I get help from human mentors?",
        a: "Human mentors are available via: Scheduled 1:1 sessions, Live Q&A sessions, Code review requests, and Priority support channels for premium members."
      },
      {
        q: "What's the response time for support?",
        a: "AI support: Instant, 24/7. Human technical support: Within 24 hours. General inquiries: Within 12 hours. Emergency issues: Within 2 hours."
      },
      {
        q: "Can I collaborate with other students?",
        a: "Yes! You can: Form study groups, Collaborate on projects, Peer review code, Participate in hackathons, and Join specialized interest groups."
      },
      {
        q: "Do you have regional communities?",
        a: "We have dedicated communities for: North America, Europe, Asia-Pacific, Africa, and Latin America with regional mentors and local timezone events."
      },
      {
        q: "How active is the community?",
        a: "Very active! Daily discussions, weekly events, monthly challenges, and quarterly hackathons. Over 500 active discussions daily across platforms."
      },
      {
        q: "Can I become a mentor after graduating?",
        a: "Absolutely! Top graduates can apply to become mentors, helping new students while earning income and building their professional reputation."
      },
      {
        q: "What social platforms do you use?",
        a: "We're active on: Discord (main community), LinkedIn, GitHub, Twitter, and YouTube with regular updates, tutorials, and success stories."
      }
    ]
  },
  {
    category: "Features & Technology",
    icon: Zap,
    questions: [
      {
        q: "What AI technology powers your tutors?",
        a: "We use a combination of: GPT-4 for explanations, Custom ML models for skill assessment, Reinforcement learning for adaptation, and Computer vision for code analysis - all running on secure cloud infrastructure."
      },
      {
        q: "Do you have a mobile app?",
        a: "We offer progressive web apps that work across all devices with app-like experience. Native apps for iOS and Android are in development for 2024 release."
      },
      {
        q: "Can I download course materials?",
        a: "Yes! All lesson materials, code samples, project briefs, and cheat sheets are available for download in PDF, Markdown, and code formats."
      },
      {
        q: "Is there live coding environment?",
        a: "We provide browser-based IDE with: Code editor, Terminal, Debugger, Live preview, and GitHub integration - all pre-configured for each lesson."
      },
      {
        q: "How do you handle different learning styles?",
        a: "Our AI adapts to: Visual learners (diagrams, videos), Auditory learners (explanations), Reading/writing learners (detailed text), Kinesthetic learners (interactive coding)."
      },
      {
        q: "Do you offer voice interaction with AI tutors?",
        a: "Yes! Premium users can talk to AI tutors via voice, perfect for explaining concepts verbally or getting help while coding hands-free."
      },
      {
        q: "Can I integrate with my own tools?",
        a: "We integrate with: GitHub, GitLab, VS Code (via extension), Slack, Notion, and other productivity tools through our API."
      },
      {
        q: "Is there progress tracking and analytics?",
        a: "Comprehensive dashboard shows: Time spent, Skills mastered, Weak areas, Project completion, Streaks, and Comparative analytics with peer group."
      }
    ]
  }
];

// Expanded quick questions
const quickQuestions = [
  "How do I get started?",
  "What's the cost?",
  "Is there a free trial?",
  "Can I switch between tutors?",
  "Do you offer certificates?",
  "What's your refund policy?",
  "Do you have mobile app?",
  "Can I learn at my own pace?",
  "Are there group discounts?",
  "How do I contact support?"
];

// Category icons mapping
const categoryIcons = {
  "General Information": Globe,
  "AI Tutors & Learning": Brain,
  "Learning Paths & Courses": BookOpen,
  "Pricing & Plans": DollarSign,
  "Technical Requirements": Settings,
  "Certificates & Career": GraduationCap,
  "Community & Support": Users,
  "Features & Technology": Zap
};

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "👋 Hi! I'm your Upperclass AI assistant. I can help you with questions about our AI tutors, learning paths, pricing, certificates, and more. How can I assist you today?",
      isBot: true,
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("General Information");
  const [expandedFaqs, setExpandedFaqs] = useState({});
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const { theme } = useTheme();

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current.focus(), 300);
    }
  }, [isOpen]);

  const handleSend = () => {
    if (!inputText.trim()) return;

    // Add user message
    const userMessage = {
      id: messages.length + 1,
      text: inputText,
      isBot: false,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, userMessage]);

    // Show typing indicator
    setIsTyping(true);

    // Process and generate bot response
    setTimeout(() => {
      const botResponse = generateBotResponse(inputText);
      setIsTyping(false);
      setMessages(prev => [...prev, {
        id: prev.length + 2,
        text: botResponse,
        isBot: true,
        timestamp: new Date()
      }]);
    }, 1200);

    setInputText("");
  };

  const generateBotResponse = (query) => {
    const lowerQuery = query.toLowerCase();
    
    // Check for matches in FAQ data
    for (const category of faqData) {
      for (const faq of category.questions) {
        const questionWords = faq.q.toLowerCase().split(' ');
        const queryWords = lowerQuery.split(' ');
        
        // Check for keyword matches
        const hasMatch = questionWords.some(word => 
          queryWords.some(qWord => qWord.length > 3 && word.includes(qWord))
        ) || lowerQuery.includes(faq.q.toLowerCase().split(' ')[0]);
        
        if (hasMatch) {
          return faq.a;
        }
      }
    }

    // Default responses for common questions
    const responses = {
      "start": "🚀 Getting started is easy!\n1. Visit our Courses page\n2. Choose a learning path or AI tutor\n3. Sign up for a 7-day free trial (no credit card)\n4. Start learning immediately!\n\nNeed help choosing? I can recommend a path based on your goals!",
      "cost": "💰 We offer flexible pricing:\n• Basic: $29/month (1 AI tutor)\n• Pro: $49/month (learning paths + 3 tutors)\n• Premium: $99/month (unlimited access + mentorship)\n• Student discount: 40% off\n• Annual plans: Save 20%\n\nAll plans include our 14-day money-back guarantee!",
      "free": "✨ Yes! We offer a 7-day free trial with:\n• Full access to any single AI tutor\n• No credit card required\n• Cancel anytime\n• All features included\n\nStart learning risk-free today!",
      "switch": "🔄 Absolutely! You can:\n• Switch between AI tutors anytime\n• Change learning paths at milestones\n• Your progress is always saved\n• No extra cost for switching\n\nMix and match to create your perfect learning journey!",
      "certificate": "🏆 Yes! You'll receive verifiable certificates for:\n• Each completed AI tutor\n• Learning path completion\n• Project milestones\n• Special achievements\n\nCertificates are recognized by 500+ companies and can be shared on LinkedIn!",
      "help": "🆘 I can help you with:\n1. 🤖 AI tutors & learning\n2. 📚 Learning paths & courses\n3. 💰 Pricing & plans\n4. 🎓 Certificates & career\n5. 👥 Community & support\n6. ⚙️ Technical requirements\n7. 🚀 Getting started\n\nWhat would you like to know more about?",
      "refund": "💸 We offer a 14-day money-back guarantee. If you're not satisfied:\n1. Contact support within 14 days\n2. Explain your concerns\n3. Get full refund, no questions asked\n\nYour satisfaction is our priority!",
      "mobile": "📱 Yes! We have:\n• Fully responsive web platform\n• Progressive web app (PWA)\n• Native apps coming in 2024\n• Learn on any device, anytime\n• Sync progress across devices",
      "pace": "⏱️ Absolutely! Learn at your own pace:\n• No deadlines or schedules\n• AI adapts to your speed\n• Pause and resume anytime\n• Lifetime access to completed content\n• Perfect for busy schedules!",
      "group": "👥 Yes! We offer group discounts:\n• 2-4 people: 15% off\n• 5-9 people: 25% off\n• 10+ people: 40% off\n• Corporate/team plans available\n\nPerfect for study groups or company training!",
      "support": "📞 Contact support:\n• Email: support@upperclass.ai\n• Live chat: Available 9am-9pm EST\n• Response time: Within 24 hours\n• Emergency: Within 2 hours\n• Community forum: 24/7 peer help"
    };

    for (const [key, response] of Object.entries(responses)) {
      if (lowerQuery.includes(key)) {
        return response;
      }
    }

    // Check for category mentions
    const categoryKeywords = {
      "ai": "AI Tutors & Learning",
      "tutor": "AI Tutors & Learning",
      "learn": "Learning Paths & Courses",
      "course": "Learning Paths & Courses",
      "price": "Pricing & Plans",
      "cost": "Pricing & Plans",
      "technical": "Technical Requirements",
      "system": "Technical Requirements",
      "certificate": "Certificates & Career",
      "job": "Certificates & Career",
      "career": "Certificates & Career",
      "community": "Community & Support",
      "support": "Community & Support",
      "feature": "Features & Technology",
      "tech": "Features & Technology"
    };

    for (const [keyword, category] of Object.entries(categoryKeywords)) {
      if (lowerQuery.includes(keyword)) {
        return `That sounds like a question about **${category}**! You might find answers in that FAQ category. Would you like me to show you questions about ${category.toLowerCase()}?`;
      }
    }

    // Fallback responses
    const fallbacks = [
      "I understand you're asking about: \"" + query + "\". This might be covered in our FAQs. Could you rephrase or browse our categories below for more specific help? 📚",
      "That's a great question! While I search for the best answer, would you like to explore our FAQ categories? We cover everything from AI tutors to career support. 🔍",
      "I'm continuously learning about our platform. For detailed assistance with: \"" + query + "\", our support team at support@upperclass.ai can provide expert help. In the meantime, check our FAQs below! 📧",
      "Thanks for your question! To give you the most accurate answer, could you provide more details or check if it's covered in our comprehensive FAQ categories? 🤔",
      "I want to make sure I give you the right information. Could you check if your question matches any of these categories? Or try rephrasing for better results! 💡"
    ];

    return fallbacks[Math.floor(Math.random() * fallbacks.length)];
  };

  const handleQuickQuestion = (question) => {
    setInputText(question);
    setTimeout(() => handleSend(), 100);
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    // Scroll to FAQs
    setTimeout(() => {
      const faqSection = document.querySelector('.faq-section');
      faqSection?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const toggleFaq = (categoryIndex, questionIndex) => {
    const key = `${categoryIndex}-${questionIndex}`;
    setExpandedFaqs(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const bgColor = theme === "dark" 
    ? "bg-gradient-to-br from-slate-900 to-slate-800" 
    : "bg-gradient-to-br from-white to-blue-50";
  
  const textColor = theme === "dark" 
    ? "text-gray-200" 
    : "text-gray-900";

  const borderColor = theme === "dark"
    ? "border-slate-700"
    : "border-blue-200";

  // Find selected category data
  const selectedCategoryData = faqData.find(cat => cat.category === selectedCategory);

  return (
    <>
      {/* Chat Button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full shadow-2xl flex items-center justify-center 
          ${theme === "dark" 
            ? "bg-gradient-to-br from-blue-600 to-blue-700 text-white" 
            : "bg-gradient-to-br from-blue-600 to-blue-700 text-white"
          }`}
        aria-label="Open chat assistant"
      >
        <MessageCircle className="w-7 h-7" />
        {!isOpen && (
          <motion.span 
            className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        )}
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
      <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.95 }}
            transition={{ type: "spring", damping: 25 }}
            className={`fixed bottom-24 right-6 z-50 w-[90vw] max-w-md rounded-3xl shadow-2xl overflow-hidden border ${borderColor} ${bgColor} ${textColor}`}
          >
            {/* Header */}
            <div className={`p-4 border-b ${borderColor} ${theme === "dark" ? "bg-slate-800" : "bg-blue-100"}`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${theme === "dark" ? "bg-gradient-to-br from-blue-500 to-cyan-500" : "bg-gradient-to-br from-blue-600 to-blue-700"}`}>
                    <Bot className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">Upperclass AI Assistant</h3>
                    <div className="flex items-center gap-2">
                      <div className="flex items-center">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                        <span className="text-xs ml-2">Online</span>
                      </div>
                      <span className="text-xs opacity-70">• 24/7 Support</span>
                      <span className="text-xs opacity-70">• 70+ FAQs</span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className={`p-2 rounded-full transition ${theme === "dark" ? "hover:bg-slate-700" : "hover:bg-blue-200"}`}
                  aria-label="Close chat"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Messages Container */}
            <div className="h-96 overflow-y-auto p-4 space-y-4">
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${msg.isBot ? "justify-start" : "justify-end"}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl p-4 ${msg.isBot
                      ? theme === "dark"
                        ? "bg-slate-800/90 backdrop-blur-sm"
                        : "bg-blue-100/90 backdrop-blur-sm"
                      : theme === "dark"
                        ? "bg-gradient-to-r from-blue-600 to-blue-700"
                        : "bg-gradient-to-r from-blue-600 to-blue-700 text-white"
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      {msg.isBot ? (
                        <>
                          <Bot className="w-4 h-4" />
                          <span className="text-sm font-semibold">AI Assistant</span>
                        </>
                      ) : (
                        <>
                          <span className="text-sm font-semibold">You</span>
                        </>
                      )}
                      <span className="text-xs opacity-70">
                        {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                    <p className="text-sm leading-relaxed whitespace-pre-line">{msg.text}</p>
                  </div>
                </motion.div>
              ))}

              {/* Typing Indicator */}
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex justify-start"
                >
                  <div className={`rounded-2xl p-4 ${theme === "dark" ? "bg-slate-800" : "bg-blue-100"}`}>
                    <div className="flex items-center gap-2">
                      <Bot className="w-4 h-4" />
                      <span className="text-sm font-semibold">AI Assistant</span>
                    </div>
                    <div className="flex gap-1 mt-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" />
                      <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: "0.1s" }} />
                      <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }} />
                    </div>
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />

              {/* Quick Questions */}
              {messages.length <= 3 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="mt-6"
                >
                  <p className="text-sm font-semibold mb-3 flex items-center gap-2">
                    <Zap className="w-4 h-4 text-blue-500" />
                    Quick questions you can ask:
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {quickQuestions.map((q, i) => (
                      <motion.button
                        key={i}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleQuickQuestion(q)}
                        className={`text-xs px-3 py-2 rounded-full transition ${theme === "dark"
                          ? "bg-slate-800 hover:bg-slate-700 border border-slate-700"
                          : "bg-blue-100 hover:bg-blue-200 border border-blue-200"
                        }`}
                      >
                        {q}
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* FAQ Categories */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="mt-8 faq-section"
              >
                <div className="flex items-center justify-between mb-4">
                  <p className="text-sm font-semibold flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-blue-500" />
                    Browse FAQ Categories:
                  </p>
                  <span className="text-xs opacity-70">{faqData.length} categories • 70+ questions</span>
                </div>
                
                <div className="grid grid-cols-2 gap-2 mb-6">
                  {faqData.map((cat, idx) => {
                    const Icon = cat.icon;
                    return (
                      <motion.button
                        key={cat.category}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handleCategoryClick(cat.category)}
                        className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs transition ${selectedCategory === cat.category
                          ? theme === "dark"
                            ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg"
                            : "bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg"
                          : theme === "dark"
                            ? "bg-slate-800 hover:bg-slate-700"
                            : "bg-blue-100 hover:bg-blue-200"
                        }`}
                      >
                        <Icon className="w-3 h-3" />
                        <span className="truncate">{cat.category.split(' ')[0]}</span>
                        <span className={`px-1.5 py-0.5 rounded-full text-[10px] ${selectedCategory === cat.category
                          ? "bg-white/20"
                          : theme === "dark" ? "bg-slate-700" : "bg-blue-200"
                        }`}>
                          {cat.questions.length}
                        </span>
                      </motion.button>
                    );
                  })}
                </div>

                {/* FAQ List */}
                {selectedCategoryData && (
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 mb-3">
                      <selectedCategoryData.icon className="w-5 h-5 text-blue-500" />
                      <h4 className="font-semibold text-sm">{selectedCategoryData.category}</h4>
                      <span className="text-xs opacity-70 ml-auto">{selectedCategoryData.questions.length} questions</span>
                    </div>
                    
                    {selectedCategoryData.questions.map((faq, qIdx) => {
                      const categoryIndex = faqData.findIndex(c => c.category === selectedCategory);
                      const key = `${categoryIndex}-${qIdx}`;
                      const isExpanded = expandedFaqs[key];
                      
                      return (
                        <motion.div
                          key={key}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: qIdx * 0.05 }}
                          className={`rounded-xl overflow-hidden ${theme === "dark" ? "bg-slate-800/50" : "bg-blue-50/50"}`}
                        >
                          <button
                            onClick={() => toggleFaq(categoryIndex, qIdx)}
                            className="w-full p-3 text-left flex items-center justify-between hover:bg-opacity-50 transition"
                          >
                            <span className="text-sm font-medium pr-8">{faq.q}</span>
                            {isExpanded ? (
                              <ChevronUp className="w-4 h-4 flex-shrink-0" />
                            ) : (
                              <ChevronDown className="w-4 h-4 flex-shrink-0" />
                            )}
                          </button>
                          <AnimatePresence>
                            {isExpanded && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.2 }}
                              >
                                <div className="px-3 pb-3">
                                  <div className={`text-sm p-3 rounded-lg whitespace-pre-line ${theme === "dark" ? "bg-slate-900/80" : "bg-white/80"}`}>
                                    {faq.a}
                                    <div className="flex gap-2 mt-3">
                                      <button
                                        onClick={() => handleQuickQuestion(faq.q)}
                                        className={`text-xs px-3 py-1.5 rounded-full flex items-center gap-1 transition ${theme === "dark"
                                          ? "bg-blue-600 hover:bg-blue-700"
                                          : "bg-blue-600 hover:bg-blue-700 text-white"
                                        }`}
                                      >
                                        <Send className="w-3 h-3" />
                                        Ask this
                                      </button>
                                      <button
                                        onClick={() => {
                                          navigator.clipboard.writeText(faq.a);
                                          // You could add a toast notification here
                                        }}
                                        className={`text-xs px-3 py-1.5 rounded-full flex items-center gap-1 transition ${theme === "dark"
                                          ? "bg-slate-700 hover:bg-slate-600"
                                          : "bg-blue-200 hover:bg-blue-300"
                                        }`}
                                      >
                                        <span>Copy</span>
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </motion.div>
                      );
                    })}
                  </div>
                )}
              </motion.div>
            </div>

            {/* Input Area */}
            <div className={`p-4 border-t ${borderColor} ${theme === "dark" ? "bg-slate-800" : "bg-blue-100"}`}>
              <div className="flex gap-2">
                <div className="flex-1 relative">
                  <input
                    ref={inputRef}
                    type="text"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Ask about AI tutors, pricing, certificates, support..."
                    className={`w-full px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition ${theme === "dark"
                      ? "bg-slate-900 text-white placeholder-gray-400"
                      : "bg-white text-gray-900 placeholder-gray-500"
                    }`}
                    aria-label="Type your message"
                  />
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-blue-400" />
                  </div>
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleSend}
                  disabled={!inputText.trim()}
                  className={`px-5 rounded-xl flex items-center justify-center transition ${!inputText.trim()
                    ? theme === "dark"
                      ? "bg-slate-700 text-gray-400 cursor-not-allowed"
                      : "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : theme === "dark"
                      ? "bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white"
                      : "bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white"
                  }`}
                  aria-label="Send message"
                >
                  <Send className="w-5 h-5" />
                </motion.button>
              </div>
              <p className="text-xs text-center mt-3 opacity-70 flex items-center justify-center gap-2">
                <Shield className="w-3 h-3" />
                Powered by Upperclass AI • Secure & Private • 70+ FAQs
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Overlay */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />
      )}
    </>
  );
}