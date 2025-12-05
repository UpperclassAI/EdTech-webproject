import { useState } from "react";
import { FiChevronRight } from "react-icons/fi";

export default function ChatBot() {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);

  const handleSend = () => {
    if (!message.trim()) return;

    // Add the user's message to the chat
    setChat([...chat, { sender: "user", text: message }]);
    setMessage("");

    // Here you can add logic for AI response later
    setTimeout(() => {
      setChat(prev => [...prev, { sender: "ai", text: "This is a sample AI response." }]);
    }, 500);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") handleSend();
  };

  return (
    <div className="bg-white rounded-xl p-4 border border-blue-100 flex flex-col">
      <div className="font-semibold mb-2">AI Tutor</div>
      <div className="text-sm text-gray-600 mb-3">How can I help you today?</div>

      {/* Chat messages */}
      <div className="flex-1 mb-3 space-y-2 max-h-48 overflow-y-auto">
        {chat.map((msg, i) => (
          <div
            key={i}
            className={`p-2 rounded ${
              msg.sender === "user" ? "bg-blue-50 text-blue-600 self-end" : "bg-gray-100 text-gray-800"
            }`}
          >
            {msg.text}
          </div>
        ))}
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
