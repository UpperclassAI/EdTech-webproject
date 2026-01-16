"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mic,
  MicOff,
  Play,
  Pause,
  Brain,
  MessageCircle,
  Send,
  Download,
  Share2,
  Clock,
  Trophy,
  Sparkles,
  Zap,
  BookOpen,
  Target,
  ChevronDown,
  Star,
  Award,
  Flame,
  TargetIcon,
  BrainCircuit,
  Bot,
  GraduationCap,
} from "lucide-react";
import { useTheme } from "../context/ThemeContext";

/* ================= HELPERS & CONSTANTS ================= */
const QUIZ_INTERVAL = 30 * 60; // 30 minutes (seconds)
const XP_PER_LESSON = 100;
const XP_PER_ACHIEVEMENT = 250;

// AI Tutors available
const AI_TUTORS = [
  { 
    id: "gpt4", 
    name: "GPT-4o", 
    icon: "⚡", 
    description: "Detailed explanations & reasoning",
    color: "from-blue-500 to-cyan-500",
    specialty: "Complex concepts"
  },
  { 
    id: "claude", 
    name: "Claude 3", 
    icon: "📚", 
    description: "Thoughtful analysis & writing",
    color: "from-blue-500 to-blue-500",
    specialty: "Theory & philosophy"
  },
  { 
    id: "gemini", 
    name: "Gemini", 
    icon: "🔍", 
    description: "Quick insights & connections",
    color: "from-green-500 to-emerald-500",
    specialty: "Practical applications"
  },
  { 
    id: "specialist", 
    name: "AI Specialist", 
    icon: "🎯", 
    description: "Lesson-specific expertise",
    color: "from-orange-500 to-red-500",
    specialty: "Technical details"
  }
];

// Lesson content
const LESSON_CONTENT = {
  "What is Artificial Intelligence": {
    summary: "Introduction to AI fundamentals",
    duration: "15 min",
    difficulty: "Beginner",
    keyPoints: ["Definition", "History", "Applications"]
  },
  "How AI Works (Basics)": {
    summary: "Understanding neural networks",
    duration: "25 min",
    difficulty: "Intermediate",
    keyPoints: ["Neurons", "Training", "Inference"]
  }
};

export default function AllLessonsPage() {
  const { theme } = useTheme();

  /* ================= STATE ================= */
  const [micOn, setMicOn] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeTab, setActiveTab] = useState("content");
  const [activeLesson, setActiveLesson] = useState("How AI Works (Basics)");
  const [selectedTutor, setSelectedTutor] = useState(AI_TUTORS[0]);
  
  const [chatMessage, setChatMessage] = useState("");
  const [chatMessages, setChatMessages] = useState([
    { 
      id: 1, 
      user: "AI Tutor", 
      message: `Hello! I'm ${AI_TUTORS[0].name}, ready to help you learn about ${activeLesson}. Ask me anything!`,
      tutor: AI_TUTORS[0].name,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    },
  ]);
  
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("");
  
  const [timeSpent, setTimeSpent] = useState(0);
  const [quizTimer, setQuizTimer] = useState(QUIZ_INTERVAL);
  const [quizUnlocked, setQuizUnlocked] = useState(false);
  const [completedLessons, setCompletedLessons] = useState(["What is Artificial Intelligence"]);
  
  // Enhanced gamification state
  const [userXP, setUserXP] = useState(350);
  const [userLevel, setUserLevel] = useState(2);
  const [streak, setStreak] = useState(3);
  const [showTutorSelector, setShowTutorSelector] = useState(false);
  const [isGeneratingQuiz, setIsGeneratingQuiz] = useState(false);
  
  const chatRef = useRef(null);

  /* ================= EFFECTS ================= */
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeSpent((t) => t + 1);
      setQuizTimer((t) => {
        if (t <= 1) {
          setQuizUnlocked(true);
          return QUIZ_INTERVAL;
        }
        return t - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    chatRef.current?.scrollTo({ top: chatRef.current.scrollHeight, behavior: "smooth" });
  }, [chatMessages]);

  /* ================= DATA ================= */
  const lessons = [
    "What is Artificial Intelligence",
    "History of AI",
    "Types of AI (Narrow vs General)",
    "How AI Works (Basics)",
    "Key AI Concepts",
    "Real-World Applications",
    "Benefits & Limitations",
    "AI vs Machine Learning vs Deep Learning",
  ];

  // Enhanced achievements with XP rewards
  const achievements = [
    { 
      title: "First Lesson", 
      description: "Complete your first AI lesson",
      icon: "🎯",
      unlocked: completedLessons.length >= 1,
      xpReward: 100,
      unlockedDate: completedLessons.length >= 1 ? "2024-01-15" : null
    },
    { 
      title: "Consistent Learner", 
      description: "Spend 30+ minutes learning",
      icon: "🔥",
      unlocked: timeSpent > 1800,
      xpReward: 250,
      unlockedDate: timeSpent > 1800 ? "2024-01-15" : null
    },
    { 
      title: "Quiz Master", 
      description: "Complete 5 quizzes",
      icon: "🏆",
      unlocked: false,
      xpReward: 500
    },
    { 
      title: "AI Conversationalist", 
      description: "Ask 10+ questions to AI tutors",
      icon: "💬",
      unlocked: chatMessages.filter(m => m.user === "You").length >= 10,
      xpReward: 200
    },
    { 
      title: "Note Taker", 
      description: "Save 5+ personal notes",
      icon: "📝",
      unlocked: notes.length >= 5,
      xpReward: 150
    },
  ];

  // XP to level calculation
  const xpToNextLevel = userLevel * 1000;
  const progress = Math.round((completedLessons.length / lessons.length) * 100);
  
  const bg = theme === "dark" ? "bg-slate-900 text-gray-200" : "bg-gradient-to-br from-blue-50 to-indigo-50 text-gray-900";
  const panel = theme === "dark" ? "bg-slate-800 border-slate-700" : "bg-white border-gray-200";

  /* ================= HANDLERS ================= */
  const switchTutor = (tutor) => {
    setSelectedTutor(tutor);
    setShowTutorSelector(false);
    
    // Add system message about tutor switch
    setChatMessages(prev => [...prev, {
      id: Date.now(),
      user: "System",
      message: `Switched to ${tutor.name} - ${tutor.description}`,
      tutor: "System",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }]);
  };

  const sendMessage = () => {
    if (!chatMessage.trim()) return;

    // User message
    const userMsg = {
      id: Date.now(),
      user: "You",
      message: chatMessage,
      tutor: selectedTutor.name,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setChatMessages((prev) => [...prev, userMsg]);
    setChatMessage("");

    // AI response with tutor-specific personality
    setTimeout(() => {
      const responses = {
        gpt4: `As GPT-4o, I'll explain this in detail: "${chatMessage}" relates to ${activeLesson} because...`,
        claude: `From Claude 3's perspective, let's think deeply about "${chatMessage}". The key insight is...`,
        gemini: `Quick insight from Gemini: "${chatMessage}" connects to ${activeLesson} through...`,
        specialist: `As an AI specialist on ${activeLesson}, the technical answer to "${chatMessage}" is...`
      };

      setChatMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          user: "AI Tutor",
          message: responses[selectedTutor.id] || `Great question! As ${selectedTutor.name}, I'd say: "${chatMessage}" is important because...`,
          tutor: selectedTutor.name,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        },
      ]);
      
      // Award XP for asking questions
      if (chatMessages.filter(m => m.user === "You").length % 5 === 0) {
        setUserXP(prev => prev + 50);
      }
    }, 700);
  };

  const addNote = () => {
    if (!newNote.trim()) return;
    setNotes((prev) => [...prev, {
      id: Date.now(),
      text: newNote,
      lesson: activeLesson,
      timestamp: new Date().toLocaleString(),
      tags: [activeLesson.split(" ")[0]]
    }]);
    setNewNote("");
    setUserXP(prev => prev + 25); // XP for taking notes
  };

  const downloadNotes = () => {
    if (!notes.length) return;
    const noteText = notes.map(n => 
      `[${n.timestamp}] ${n.lesson}\n${n.text}\nTags: ${n.tags.join(", ")}\n${"=".repeat(50)}`
    ).join("\n\n");
    
    const blob = new Blob([noteText], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${activeLesson}-notes.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const shareLesson = async () => {
    if (navigator.share) {
      await navigator.share({
        title: `${activeLesson} - UpperclassAI`,
        text: `I just learned about ${activeLesson}! Join me in this AI-powered learning experience. 🚀`,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("Lesson link copied to clipboard! 📋");
    }
  };

  const completeLesson = (lesson) => {
    if (!completedLessons.includes(lesson)) {
      setCompletedLessons((prev) => [...prev, lesson]);
      setUserXP(prev => prev + XP_PER_LESSON);
      
      // Level up check
      if (userXP + XP_PER_LESSON >= xpToNextLevel) {
        setUserLevel(prev => prev + 1);
        setChatMessages(prev => [...prev, {
          id: Date.now(),
          user: "System",
          message: `🎉 Level Up! You're now Level ${userLevel + 1}`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }]);
      }
    }
    setActiveLesson(lesson);
    setIsPlaying(true);
  };

  const generateQuiz = () => {
    setIsGeneratingQuiz(true);
    setTimeout(() => {
      setQuizUnlocked(true);
      setIsGeneratingQuiz(false);
      setUserXP(prev => prev + 75);
    }, 1500);
  };

  /* ================= UI ================= */
  return (
    <section className={`${bg} min-h-screen p-4 md:p-6 transition-colors duration-300`}>
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* 🎮 TOP STATS BAR */}
        <div className={`${panel} rounded-2xl p-4 border shadow-sm`}>
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Trophy className="text-yellow-500" size={20} />
                <div>
                  <div className="text-sm opacity-70">Level {userLevel}</div>
                  <div className="text-xs">XP: {userXP}/{xpToNextLevel}</div>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <Flame className="text-orange-500" size={20} />
                <div>
                  <div className="text-sm opacity-70">{streak} day streak</div>
                  <div className="text-xs">Keep learning!</div>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <BrainCircuit className="text-blue-500" size={20} />
                <div>
                  <div className="text-sm opacity-70">{completedLessons.length}/{lessons.length}</div>
                  <div className="text-xs">Lessons completed</div>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="text-sm px-3 py-1 bg-gradient-to-r from-blue-500 to-blue-500 text-white rounded-full flex items-center gap-2">
                <Sparkles size={14} />
                {achievements.filter(a => a.unlocked).length} Achievements
              </div>
            </div>
          </div>
        </div>

        {/* 🎥 AI TUTOR SECTION */}
        <div className={`${panel} rounded-2xl p-4 md:p-6 border shadow-sm`}>
          <div className={`h-[280px] md:h-[320px] rounded-xl bg-gradient-to-br ${selectedTutor.color} p-5 flex flex-col justify-between text-white relative overflow-hidden`}>
            {/* Tutor selector dropdown */}
            <div className="absolute top-4 right-4 z-10">
              <button 
                onClick={() => setShowTutorSelector(!showTutorSelector)}
                className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-xl flex items-center gap-2 hover:bg-white/30 transition-all"
              >
                <span className="text-lg">{selectedTutor.icon}</span>
                <span className="font-medium">{selectedTutor.name}</span>
                <ChevronDown size={16} />
              </button>
              
              <AnimatePresence>
                {showTutorSelector && (
                  <motion.div 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute top-full right-0 mt-2 w-64 bg-white dark:bg-slate-800 rounded-xl shadow-2xl border dark:border-slate-700 overflow-hidden"
                  >
                    {AI_TUTORS.map(tutor => (
                      <button
                        key={tutor.id}
                        onClick={() => switchTutor(tutor)}
                        className={`w-full p-4 text-left hover:bg-gray-100 dark:hover:bg-slate-700 flex items-center gap-3 transition-all ${
                          selectedTutor.id === tutor.id ? 'bg-blue-50 dark:bg-slate-700' : ''
                        }`}
                      >
                        <span className="text-2xl">{tutor.icon}</span>
                        <div>
                          <div className="font-semibold text-gray-900 dark:text-white">{tutor.name}</div>
                          <div className="text-sm text-gray-600 dark:text-gray-300">{tutor.description}</div>
                        </div>
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            
            {/* Tutor info */}
            <div className="flex gap-4 items-start">
              <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                <div className="text-3xl">{selectedTutor.icon}</div>
              </div>
              <div>
                <h3 className="text-xl md:text-2xl font-bold">{selectedTutor.name}</h3>
                <p className="text-sm md:text-base opacity-90">{selectedTutor.specialty} • {activeLesson}</p>
                <div className="flex items-center gap-2 mt-2">
                  <div className="px-2 py-1 bg-white/20 rounded-full text-xs">
                    Real-time AI
                  </div>
                  <div className="px-2 py-1 bg-white/20 rounded-full text-xs">
                    Adaptive Learning
                  </div>
                </div>
              </div>
            </div>
            
            {/* Controls */}
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="text-sm px-3 py-1 bg-white/20 rounded-full">
                  <span className="opacity-80">Specialty:</span> {selectedTutor.specialty}
                </div>
              </div>
              
              <div className="flex gap-3">
                <button 
                  onClick={() => setIsPlaying(!isPlaying)} 
                  className="p-3 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 hover:scale-105 transition-all"
                >
                  {isPlaying ? <Pause size={20} /> : <Play size={20} />}
                </button>
                <button 
                  onClick={() => setMicOn(!micOn)} 
                  className={`p-3 backdrop-blur-sm rounded-full hover:scale-105 transition-all ${
                    micOn ? 'bg-white/20 hover:bg-white/30' : 'bg-red-500/80 hover:bg-red-500'
                  }`}
                >
                  {micOn ? <Mic size={20} /> : <MicOff size={20} />}
                </button>
                <button 
                  onClick={shareLesson} 
                  className="p-3 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 hover:scale-105 transition-all"
                >
                  <Share2 size={20} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* 📊 PROGRESS & ACHIEVEMENTS */}
        <div className="grid md:grid-cols-3 gap-6">
          <div className={`${panel} rounded-2xl p-5 border col-span-2`}>
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold flex items-center gap-2">
                <TargetIcon size={18} /> Learning Progress
              </h3>
              <div className="text-sm opacity-70 flex items-center gap-2">
                <Clock size={14} /> {Math.floor(timeSpent / 60)}m {timeSpent % 60}s
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm">Course Completion</span>
                  <span className="text-sm font-semibold">{progress}%</span>
                </div>
                <div className="h-3 bg-gray-200 dark:bg-slate-700 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    className="h-full bg-gradient-to-r from-red-500/30 to-blue-500 transition-all duration-1000"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 bg-gradient-to-br from-blue-500/10 to-blue-500/5 rounded-xl">
                  <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                    {completedLessons.length}
                  </div>
                  <div className="text-sm opacity-70">Lessons Completed</div>
                </div>
                <div className="p-3 bg-gradient-to-br from-blue-500/10 to-red-blue/5 rounded-xl">
                  <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                    {notes.length}
                  </div>
                  <div className="text-sm opacity-70">Notes Taken</div>
                </div>
              </div>
            </div>
          </div>
          
          <div className={`${panel} rounded-2xl p-5 border`}>
            <h3 className="font-semibold flex items-center gap-2 mb-4">
              <Award size={18} /> Recent Achievements
            </h3>
            <div className="space-y-3">
              {achievements.filter(a => a.unlocked).slice(0, 3).map((achievement, index) => (
                <div key={index} className="flex items-center gap-3 p-2 rounded-lg bg-gradient-to-r from-green-500/10 to-emerald-500/5">
                  <div className="text-2xl">{achievement.icon}</div>
                  <div>
                    <div className="font-medium text-sm">{achievement.title}</div>
                    <div className="text-xs opacity-70">{achievement.description}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 🧭 MAIN CONTENT GRID */}
        <div className="grid lg:grid-cols-[2fr_1fr] gap-6">
          {/* LEFT CONTENT PANEL */}
          <div className={`${panel} rounded-2xl border overflow-hidden`}>
            <div className="flex border-b dark:border-slate-700">
              {["content", "notes", "quiz"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-6 py-3 text-sm font-medium transition-all relative ${
                    activeTab === tab
                      ? "text-blue-600 dark:text-blue-400"
                      : "text-gray-500 hover:text-gray-700 dark:text-gray-400"
                  }`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  {activeTab === tab && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 dark:bg-blue-400"
                    />
                  )}
                </button>
              ))}
            </div>

            <div className="p-6">
              <AnimatePresence mode="wait">
                {/* CONTENT TAB */}
                {activeTab === "content" && (
                  <motion.div
                    key="content"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="space-y-3"
                  >
                    <h3 className="font-semibold text-lg mb-4">AI Fundamentals Course</h3>
                    {lessons.map((lesson) => {
                      const isCompleted = completedLessons.includes(lesson);
                      const isActive = lesson === activeLesson;
                      
                      return (
                        <motion.div
                          key={lesson}
                          whileHover={{ scale: 1.02 }}
                          onClick={() => completeLesson(lesson)}
                          className={`p-4 rounded-xl cursor-pointer border transition-all flex justify-between items-center ${
                            isActive
                              ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg"
                              : isCompleted
                              ? "bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800"
                              : "hover:bg-gray-50 dark:hover:bg-slate-700/50 border-gray-200 dark:border-slate-700"
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                              isCompleted ? "bg-green-100 dark:bg-green-800" :
                              isActive ? "bg-white/20" : "bg-gray-100 dark:bg-slate-700"
                            }`}>
                              {isCompleted ? (
                                <span className="text-green-600 dark:text-green-400">✓</span>
                              ) : (
                                <BookOpen size={14} className={isActive ? "text-white" : "text-gray-500"} />
                              )}
                            </div>
                            <div>
                              <div className="font-medium">{lesson}</div>
                              {LESSON_CONTENT[lesson] && (
                                <div className="text-xs opacity-70 mt-1">
                                  {LESSON_CONTENT[lesson].summary} • {LESSON_CONTENT[lesson].duration}
                                </div>
                              )}
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            {isCompleted && (
                              <div className="text-xs px-2 py-1 bg-green-100 dark:bg-green-800 rounded-full">
                                +{XP_PER_LESSON} XP
                              </div>
                            )}
                            <Play size={16} className={isActive ? "text-white" : "text-gray-400"} />
                          </div>
                        </motion.div>
                      );
                    })}
                  </motion.div>
                )}

                {/* NOTES TAB */}
                {activeTab === "notes" && (
                  <motion.div
                    key="notes"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="space-y-4"
                  >
                    <div className="flex gap-2 mb-4">
                      <input
                        value={newNote}
                        onChange={(e) => setNewNote(e.target.value)}
                        placeholder={`Take notes on ${activeLesson}...`}
                        className="flex-1 px-4 py-3 rounded-xl border dark:border-slate-700 bg-transparent focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        onKeyDown={(e) => e.key === "Enter" && addNote()}
                      />
                      <button
                        onClick={addNote}
                        className="px-4 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all"
                      >
                        Add Note
                      </button>
                      <button
                        onClick={downloadNotes}
                        className="px-4 py-3 bg-gray-100 dark:bg-slate-700 rounded-xl hover:bg-gray-200 dark:hover:bg-slate-600 transition-all"
                        title="Download all notes"
                      >
                        <Download size={20} />
                      </button>
                    </div>

                    {notes.length > 0 ? (
                      <div className="space-y-3">
                        {notes.map((note, index) => (
                          <motion.div
                            key={note.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="p-4 rounded-xl border dark:border-slate-700 bg-gradient-to-r from-gray-50 to-white dark:from-slate-800 dark:to-slate-900"
                          >
                            <div className="flex justify-between items-start mb-2">
                              <div className="font-medium text-sm opacity-70">{note.lesson}</div>
                              <div className="text-xs opacity-50">{note.timestamp}</div>
                            </div>
                            <p className="text-gray-700 dark:text-gray-300">{note.text}</p>
                            <div className="flex gap-2 mt-3">
                              {note.tags.map((tag, i) => (
                                <span key={i} className="px-2 py-1 text-xs bg-blue-100 dark:bg-blue-900/30 rounded-full">
                                  {tag}
                                </span>
                              ))}
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                        <BookOpen size={48} className="mx-auto mb-3 opacity-30" />
                        <p>No notes yet. Start taking notes to remember key concepts!</p>
                        <p className="text-sm mt-2">Each note earns you 25 XP</p>
                      </div>
                    )}
                  </motion.div>
                )}

                {/* QUIZ TAB */}
                {activeTab === "quiz" && (
                  <motion.div
                    key="quiz"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="space-y-6"
                  >
                    <div className="text-center">
                      <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-r from-blue-500 to-blue-500 flex items-center justify-center">
                        <Brain size={32} className="text-white" />
                      </div>
                      <h3 className="text-xl font-semibold mb-2">AI-Generated Quiz</h3>
                      <p className="text-gray-600 dark:text-gray-400 mb-6">
                        Test your knowledge with personalized questions
                      </p>
                    </div>

                    {quizUnlocked ? (
                      <motion.div
                        initial={{ scale: 0.9 }}
                        animate={{ scale: 1 }}
                        className="space-y-4"
                      >
                        <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl border border-green-200 dark:border-green-800">
                          <div className="flex items-center gap-3 text-green-700 dark:text-green-400 mb-2">
                            <Sparkles size={20} />
                            <span className="font-semibold">Quiz Unlocked! 🎉</span>
                          </div>
                          <p className="text-sm">Answer these AI-generated questions to earn XP:</p>
                        </div>

                        {/* Sample quiz questions */}
                        <div className="space-y-4">
                          {[
                            { question: "What is the main difference between Narrow AI and General AI?", options: ["A", "B", "C", "D"] },
                            { question: "Which neural network layer is responsible for feature extraction?", options: ["A", "B", "C", "D"] },
                          ].map((q, i) => (
                            <div key={i} className="p-4 rounded-xl border dark:border-slate-700">
                              <div className="font-medium mb-3">{i + 1}. {q.question}</div>
                              <div className="grid grid-cols-2 gap-2">
                                {q.options.map((opt, j) => (
                                  <button
                                    key={j}
                                    className="p-3 text-left rounded-lg border dark:border-slate-700 hover:bg-gray-50 dark:hover:bg-slate-700/50 transition-all"
                                  >
                                    {opt}. Option {j + 1}
                                  </button>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>

                        <button className="w-full py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl font-semibold hover:from-blue-600 hover:to-blue-700 transition-all">
                          Submit Quiz (+150 XP)
                        </button>
                      </motion.div>
                    ) : (
                      <div className="text-center p-8">
                        <div className="w-24 h-24 mx-auto mb-6 relative">
                          <div className="absolute inset-0 border-4 border-gray-200 dark:border-slate-700 rounded-full"></div>
                          <div 
                            className="absolute inset-0 border-4 border-blue-500 rounded-full"
                            style={{ clipPath: `inset(0 ${100 - (quizTimer / QUIZ_INTERVAL) * 100}% 0 0)` }}
                          ></div>
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="text-center">
                              <div className="text-2xl font-bold">
                                {Math.floor(quizTimer / 60)}:{(quizTimer % 60).toString().padStart(2, "0")}
                              </div>
                              <div className="text-xs opacity-70">Next quiz</div>
                            </div>
                          </div>
                        </div>
                        
                        <p className="text-gray-600 dark:text-gray-400 mb-6">
                          Complete more lessons or ask questions to unlock quizzes faster
                        </p>
                        
                        <button
                          onClick={generateQuiz}
                          disabled={isGeneratingQuiz}
                          className={`px-6 py-3 rounded-xl font-semibold transition-all ${
                            isGeneratingQuiz
                              ? "bg-gray-100 dark:bg-slate-700 text-gray-400"
                              : "bg-gradient-to-r from-blue-500 to-blue-500 text-white hover:from-blue-600 hover:to-blue-600"
                          }`}
                        >
                          {isGeneratingQuiz ? (
                            <span className="flex items-center gap-2">
                              <Sparkles className="animate-pulse" /> Generating Quiz...
                            </span>
                          ) : (
                            "Generate Quiz Now (75 XP)"
                          )}
                        </button>
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* RIGHT CHAT PANEL */}
          <div className={`${panel} rounded-2xl border flex flex-col h-[600px]`}>
            <div className="p-4 border-b dark:border-slate-700 font-semibold flex justify-between items-center">
              <div className="flex items-center gap-2">
                <MessageCircle size={20} />
                <span>AI Tutor Chat</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <div className="px-2 py-1 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full text-xs">
                  {selectedTutor.icon} {selectedTutor.name}
                </div>
              </div>
            </div>

            <div 
              ref={chatRef} 
              className="flex-1 overflow-y-auto p-4 space-y-4"
            >
              {chatMessages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`p-3 rounded-2xl max-w-[85%] ${
                    msg.user === "You" 
                      ? "ml-auto bg-gradient-to-r from-blue-500 to-blue-600 text-white" 
                      : msg.user === "System"
                      ? "mx-auto bg-gray-100 dark:bg-slate-700 text-center text-sm"
                      : "bg-gradient-to-r from-gray-100 to-gray-50 dark:from-slate-700 dark:to-slate-800"
                  }`}
                >
                  <div className="flex justify-between items-center mb-1">
                    <div className="text-xs font-medium opacity-80">
                      {msg.user} {msg.tutor && msg.user !== "You" && `• ${msg.tutor}`}
                    </div>
                    <div className="text-xs opacity-60">{msg.timestamp}</div>
                  </div>
                  <div>{msg.message}</div>
                </motion.div>
              ))}
            </div>

            <div className="p-3 border-t dark:border-slate-700">
              <div className="flex gap-2">
                <input
                  value={chatMessage}
                  onChange={(e) => setChatMessage(e.target.value)}
                  placeholder={`Ask ${selectedTutor.name} about ${activeLesson}...`}
                  className="flex-1 px-4 py-3 rounded-xl border dark:border-slate-700 bg-transparent focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                />
                <button
                  onClick={sendMessage}
                  className="px-4 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all"
                >
                  <Send size={20} />
                </button>
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400 mt-2 text-center">
                Each question helps unlock quizzes faster • Ask 5 questions = +50 XP
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}