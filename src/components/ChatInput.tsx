import React, { useState } from "react";
import { motion } from "framer-motion";
import { Send, Paperclip, Camera } from "lucide-react";

interface ChatInputProps {
  onSendMessage: (message: string) => void;
}

const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage }) => {
  const [message, setMessage] = useState("");

  const handleSend = () => {
    if (message.trim()) {
      onSendMessage(message);
      setMessage("");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-center space-x-2 p-4 bg-white border-t border-gray-200"
    >
      <Paperclip className="w-6 h-6 text-gray-500" />
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="flex-1 p-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Type a message..."
      />
      <Camera className="w-6 h-6 text-gray-500" />
      <button
        onClick={handleSend}
        className="bg-blue-500 text-white rounded-full p-2"
      >
        <Send className="w-5 h-5" />
      </button>
    </motion.div>
  );
};

export default ChatInput;
