import { useState, useRef, useEffect } from "react";
import { FiChevronRight, FiTrash2 } from "react-icons/fi";

export default function ChatBot() {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
  const [typing, setTyping] = useState(false);
  const chatEndRef = useRef(null);

  // Scroll to bottom whenever chat updates
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat, typing]);

  // AI response logic
  const getAIResponse = (userMsg) => {
    const msg = userMsg.toLowerCase();
    if (msg.includes("hello") || msg.includes("hi")) return "Hello! How can I assist you today?";
    if (msg.includes("course")) return "You have 3 ongoing courses: AI Introduction, Prompt Crafting, Machine Learning.";
    if (msg.includes("task") || msg.includes("upcoming")) return "You have an AI Introduction session tomorrow at 8:00 AM.";
    if (msg.includes("thanks") || msg.includes("thank you")) return "You're welcome! 😊";
    return "I'm here to help! Can you please clarify?";
  };

  const handleSend = () => {
    if (!message.trim()) return;

    // Add user's message
    setChat([...chat, { sender: "user", text: message }]);
    const userMessage = message;
    setMessage("");

    // Show typing indicator
    setTyping(true);

    setTimeout(() => {
      const aiResponse = getAIResponse(userMessage);
      setChat(prev => [...prev, { sender: "ai", text: aiResponse }]);
      setTyping(false);
    }, 800 + Math.random() * 500); // Random delay for realism
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") handleSend();
  };

  const clearChat = () => {
    setChat([]);
  };

  return (
    <div className="bg-white rounded-xl p-4 border border-blue-100 flex flex-col h-full max-h-[400px]">
      {/* Header */}
      <div className="flex justify-between items-center mb-2">
        <div className="font-semibold">AI Tutor</div>
        <button onClick={clearChat} className="text-red-400 hover:text-red-600 transition">
          <FiTrash2 />
        </button>
      </div>
      <div className="text-sm text-gray-600 mb-3">How can I help you today?</div>

      {/* Chat messages */}
      <div className="flex-1 mb-3 space-y-2 overflow-y-auto">
        {chat.map((msg, i) => (
          <div
            key={i}
            className={`p-2 rounded-lg max-w-[80%] break-words ${
              msg.sender === "user" 
                ? "bg-blue-50 text-blue-600 self-end" 
                : "bg-gray-100 text-gray-800 self-start"
            }`}
          >
            {msg.text}
          </div>
        ))}

        {/* Typing indicator */}
        {typing && (
          <div className="p-2 rounded-lg max-w-[60%] bg-gray-200 text-gray-600 self-start animate-pulse">
            AI is typing...
          </div>
        )}
        <div ref={chatEndRef} />
      </div>

      {/* Input */}
      <div className="bg-gray-50 rounded-lg p-2 flex items-center gap-2">
        <input
          className="flex-1 bg-transparent text-sm outline-none"
          placeholder="Type a message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyPress}
        />
        <button className="text-blue-600" onClick={handleSend}>
          <FiChevronRight />
        </button>
      </div>
    </div>
  );
}
