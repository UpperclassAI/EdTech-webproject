import { useState, useRef, useEffect } from "react";
import { 
  FiChevronRight, 
  FiTrash2, 
  FiSend,
  FiMic,
  FiSmile,
  FiPaperclip,
  FiThumbsUp,
  FiThumbsDown,
  FiHelpCircle,
  FiSettings
} from "react-icons/fi";
import { FaRobot, FaUser } from "react-icons/fa";
import { useTheme } from "../context/ThemeContext"; // Adjust path as needed

export default function ChatBot() {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([
    { sender: "ai", text: "Hello! I'm your AI Tutor. How can I assist you with your learning today?" }
  ]);
  const [typing, setTyping] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [helpMode, setHelpMode] = useState(false);
  const [suggestions, setSuggestions] = useState([
    "What courses do I have?",
    "Explain AI concepts",
    "Help with assignment",
    "Set study schedule"
  ]);
  const chatEndRef = useRef(null);
  const { theme } = useTheme();

  // Scroll to bottom whenever chat updates
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat, typing]);

  // Enhanced AI response logic
  const getAIResponse = (userMsg) => {
    const msg = userMsg.toLowerCase();
    
    // Greetings
    if (msg.includes("hello") || msg.includes("hi") || msg.includes("hey")) 
      return "Hello! How can I assist you with your learning journey today? 🤖";
    
    // Courses
    if (msg.includes("course") || msg.includes("class") || msg.includes("subject")) 
      return "You have 3 ongoing courses: \n• AI Introduction (75% complete)\n• Prompt Crafting (40% complete)\n• Machine Learning (20% complete)";
    
    // Tasks/Assignments
    if (msg.includes("task") || msg.includes("assignment") || msg.includes("homework") || msg.includes("upcoming")) 
      return "📅 Upcoming tasks:\n1. AI Introduction Quiz - Tomorrow at 8:00 AM\n2. Prompt Crafting Assignment - Due Friday\n3. Project Proposal - Next Week";
    
    // Schedule
    if (msg.includes("schedule") || msg.includes("time") || msg.includes("when")) 
      return "Your study schedule:\n• Monday: AI Basics (2hrs)\n• Wednesday: Coding Practice (3hrs)\n• Friday: Review Session (1hr)";
    
    // Help
    if (msg.includes("help") || msg.includes("stuck") || msg.includes("problem")) 
      return "I can help! Please describe your issue, or you can:\n• Check the course materials\n• Connect with a mentor\n• Schedule a 1-on-1 session";
    
    // Grades/Progress
    if (msg.includes("grade") || msg.includes("score") || msg.includes("progress") || msg.includes("result")) 
      return "Current progress:\n• AI Introduction: 92/100 (A)\n• Prompt Crafting: 85/100 (B+)\n• Overall: 88% complete";
    
    // Thanks
    if (msg.includes("thanks") || msg.includes("thank you") || msg.includes("appreciate")) 
      return "You're welcome! Keep up the great work! 🎉 Remember, consistency is key to mastering AI!";
    
    // Default responses
    const defaultResponses = [
      "I'm here to help you learn! Could you be more specific?",
      "That's an interesting question. Let me guide you to the right resources.",
      "I recommend reviewing the course materials for that topic.",
      "Would you like me to explain any specific concept in detail?",
      "Consider breaking down the problem into smaller steps.",
      "Let's work through this together! What part are you finding challenging?",
      "Have you checked the examples in your course materials?",
      "Great question! This is a fundamental concept in AI learning."
    ];
    
    return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
  };

  const handleSend = () => {
    if (!message.trim()) return;

    // Add user's message
    setChat([...chat, { sender: "user", text: message }]);
    const userMessage = message;
    setMessage("");

    // Remove used suggestion
    setSuggestions(prev => prev.filter(s => s !== userMessage));

    // Show typing indicator
    setTyping(true);

    // Simulate AI thinking with variable delay
    setTimeout(() => {
      const aiResponse = getAIResponse(userMessage);
      setChat(prev => [...prev, { sender: "ai", text: aiResponse }]);
      setTyping(false);
    }, 800 + Math.random() * 800); // Variable delay for realism
  };

  const handleSuggestionClick = (suggestion) => {
    setMessage(suggestion);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const clearChat = () => {
    if (window.confirm("Clear all chat messages?")) {
      setChat([{ sender: "ai", text: "Chat cleared! How can I help you today?" }]);
      setSuggestions([
        "What courses do I have?",
        "Explain AI concepts",
        "Help with assignment",
        "Set study schedule"
      ]);
    }
  };

  const toggleRecording = () => {
    setIsRecording(!isRecording);
    if (!isRecording) {
      // In a real app, you would integrate with speech recognition API
      setTimeout(() => {
        setIsRecording(false);
        setMessage("I want to learn about neural networks");
      }, 2000);
    }
  };

  const rateResponse = (helpful) => {
    // In a real app, you would send this feedback to your backend
    const lastMessage = chat[chat.length - 1];
    if (lastMessage.sender === "ai") {
      alert(`Thanks for your feedback! Response marked as ${helpful ? 'helpful' : 'not helpful'}.`);
    }
  };

  const toggleHelpMode = () => {
    setHelpMode(!helpMode);
    if (!helpMode) {
      setChat([...chat, { 
        sender: "ai", 
        text: "I've enabled detailed help mode. I'll provide step-by-step explanations and additional resources." 
      }]);
    }
  };

  return (
    <div className={`rounded-xl p-4 flex flex-col  h-full max-h-[500px] border transition-colors duration-300 ${
      theme === "dark" 
        ? "bg-gray-800 border-gray-700" 
        : "bg-white border-blue-100"
    }`}>
      
      {/* Header */}
      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center gap-2">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
            theme === "dark" 
              ? "bg-blue-700 text-blue-300" 
              : "bg-blue-100 text-blue-600"
          }`}>
            <FaRobot />
          </div>
          <div>
            <div className={`font-semibold ${theme === "dark" ? "text-gray-100" : "text-gray-800"}`}>
              AI Tutor Assistant
            </div>
            <div className={`text-xs ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
              Powered by Upperclass AI
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <button 
            onClick={toggleHelpMode}
            className={`p-2 rounded-lg transition-colors duration-300 ${
              theme === "dark" 
                ? `hover:bg-gray-700 ${helpMode ? 'text-green-400' : 'text-gray-400'}` 
                : `hover:bg-blue-50 ${helpMode ? 'text-green-600' : 'text-gray-500'}`
            }`}
            title={helpMode ? "Disable detailed help" : "Enable detailed help"}
          >
            <FiHelpCircle />
          </button>
          
          <button 
            onClick={clearChat}
            className={`p-2 rounded-lg transition-colors duration-300 ${
              theme === "dark" 
                ? "hover:bg-gray-700 text-red-400" 
                : "hover:bg-blue-50 text-red-500"
            }`}
            title="Clear chat"
          >
            <FiTrash2 />
          </button>
        </div>
      </div>

      {/* Suggestions */}
      <div className="flex flex-wrap gap-2 mb-3">
        {suggestions.map((suggestion, index) => (
          <button
            key={index}
            onClick={() => handleSuggestionClick(suggestion)}
            className={`px-3 py-1.5 rounded-full text-xs transition-all duration-300 ${
              theme === "dark"
                ? "bg-gray-700 text-gray-300 hover:bg-gray-600"
                : "bg-blue-50 text-blue-700 hover:bg-blue-100"
            }`}
          >
            {suggestion}
          </button>
        ))}
      </div>

      {/* Chat messages */}
      <div className={`flex-1 mb-3 space-y-3 overflow-y-auto p-2 rounded-lg ${
        theme === "dark" ? "bg-gray-900/50" : "bg-gray-50"
      }`}>
        {chat.map((msg, i) => (
          <div
            key={i}
            className={`flex gap-3 ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
          >
            {msg.sender === "ai" && (
              <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-1 ${
                theme === "dark" 
                  ? "bg-blue-800 text-blue-300" 
                  : "bg-blue-100 text-blue-600"
              }`}>
                <FaRobot size={12} />
              </div>
            )}
            
            <div
              className={`p-3 rounded-2xl max-w-[85%] break-words whitespace-pre-line ${
                msg.sender === "user" 
                  ? theme === "dark"
                    ? "bg-blue-700 text-blue-100 rounded-tr-none"
                    : "bg-blue-600 text-white rounded-tr-none"
                  : theme === "dark"
                    ? "bg-gray-700 text-gray-200 rounded-tl-none"
                    : "bg-gray-200 text-gray-800 rounded-tl-none"
              }`}
            >
              {msg.text}
              
              {/* Feedback buttons for AI responses */}
              {msg.sender === "ai" && i === chat.length - 1 && (
                <div className="flex gap-2 mt-2">
                  <button
                    onClick={() => rateResponse(true)}
                    className={`text-xs px-2 py-1 rounded flex items-center gap-1 transition-colors duration-300 ${
                      theme === "dark"
                        ? "hover:bg-gray-600 text-gray-400"
                        : "hover:bg-gray-300 text-gray-600"
                    }`}
                  >
                    <FiThumbsUp size={12} /> Helpful
                  </button>
                  <button
                    onClick={() => rateResponse(false)}
                    className={`text-xs px-2 py-1 rounded flex items-center gap-1 transition-colors duration-300 ${
                      theme === "dark"
                        ? "hover:bg-gray-600 text-gray-400"
                        : "hover:bg-gray-300 text-gray-600"
                    }`}
                  >
                    <FiThumbsDown size={12} /> Not helpful
                  </button>
                </div>
              )}
            </div>
            
            {msg.sender === "user" && (
              <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-1 ${
                theme === "dark" 
                  ? "bg-gray-700 text-gray-300" 
                  : "bg-gray-300 text-gray-700"
              }`}>
                <FaUser size={12} />
              </div>
            )}
          </div>
        ))}

        {/* Typing indicator */}
        {typing && (
          <div className="flex gap-3">
            <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${
              theme === "dark" 
                ? "bg-blue-800 text-blue-300" 
                : "bg-blue-100 text-blue-600"
            }`}>
              <FaRobot size={12} />
            </div>
            <div className={`p-3 rounded-2xl rounded-tl-none ${
              theme === "dark" 
                ? "bg-gray-700 text-gray-200" 
                : "bg-gray-200 text-gray-800"
            }`}>
              <div className="flex gap-1">
                <div className={`w-2 h-2 rounded-full animate-bounce ${
                  theme === "dark" ? "bg-gray-400" : "bg-gray-500"
                }`} style={{ animationDelay: '0ms' }}></div>
                <div className={`w-2 h-2 rounded-full animate-bounce ${
                  theme === "dark" ? "bg-gray-400" : "bg-gray-500"
                }`} style={{ animationDelay: '150ms' }}></div>
                <div className={`w-2 h-2 rounded-full animate-bounce ${
                  theme === "dark" ? "bg-gray-400" : "bg-gray-500"
                }`} style={{ animationDelay: '300ms' }}></div>
              </div>
            </div>
          </div>
        )}
        <div ref={chatEndRef} />
      </div>

      {/* Input Area */}
      <div className={`rounded-lg p-2 flex items-center gap-2 transition-colors duration-300 ${
        theme === "dark" 
          ? "bg-gray-700" 
          : "bg-gray-100"
      }`}>
        {/* Action Buttons */}
        <div className="flex items-center gap-1">
          <button 
            onClick={toggleRecording}
            className={`p-2 rounded-lg transition-colors duration-300 ${
              theme === "dark"
                ? `hover:bg-gray-600 ${isRecording ? 'text-red-400' : 'text-gray-400'}`
                : `hover:bg-gray-200 ${isRecording ? 'text-red-500' : 'text-gray-500'}`
            }`}
            title={isRecording ? "Stop recording" : "Voice input"}
          >
            <FiMic />
          </button>
          <button 
            className={`p-2 rounded-lg transition-colors duration-300 ${
              theme === "dark" 
                ? "hover:bg-gray-600 text-gray-400" 
                : "hover:bg-gray-200 text-gray-500"
            }`}
            title="Attach file"
          >
            <FiPaperclip />
          </button>
        </div>

        {/* Text Input */}
        <textarea
          className={`flex-1 bg-transparent text-sm outline-none resize-none max-h-24 min-h-[40px] px-2 py-2 ${
            theme === "dark" 
              ? "text-gray-200 placeholder-gray-500" 
              : "text-gray-800 placeholder-gray-500"
          }`}
          placeholder="Type your question or use voice input..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyPress}
          rows="1"
        />

        {/* Right-side Actions */}
        <div className="flex items-center gap-1">
          <button 
            className={`p-2 rounded-lg transition-colors duration-300 ${
              theme === "dark" 
                ? "hover:bg-gray-600 text-gray-400" 
                : "hover:bg-gray-200 text-gray-500"
            }`}
            title="Emoji"
          >
            <FiSmile />
          </button>
          
          <button 
            onClick={handleSend}
            disabled={!message.trim()}
            className={`p-2 rounded-lg transition-all duration-300 ${
              theme === "dark"
                ? message.trim()
                  ? "bg-blue-600 text-white hover:bg-blue-700"
                  : "bg-gray-600 text-gray-500"
                : message.trim()
                  ? "bg-blue-600 text-white hover:bg-blue-700"
                  : "bg-gray-300 text-gray-500"
            }`}
            title="Send message"
          >
            <FiSend />
          </button>
        </div>
      </div>

      {/* Footer Stats */}
      <div className={`flex justify-between items-center mt-2 text-xs pt-2 border-t ${
        theme === "dark" 
          ? "text-gray-500 border-gray-700" 
          : "text-gray-500 border-gray-200"
      }`}>
        <div>
          {helpMode && <span className="text-green-500 font-medium">🔍 Detailed Help Mode Active</span>}
        </div>
        <div className="flex items-center gap-4">
          <span>Messages: {chat.length}</span>
          <span>AI: {chat.filter(m => m.sender === "ai").length}</span>
          <span>You: {chat.filter(m => m.sender === "user").length}</span>
        </div>
      </div>
    </div>
  );
}