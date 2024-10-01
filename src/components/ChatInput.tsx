import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Camera,
  FileText,
  Paperclip,
  SendHorizonal,
  Video,
} from "lucide-react";
import OptionsModal from "./OptionsModal";

interface ChatInputProps {
  onSendMessage: (message: string) => void;
}

export default function ChatInput({ onSendMessage }: ChatInputProps) {
  const [message, setMessage] = useState("");
  const [showAttachmentOptions, setShowAttachmentOptions] = useState(false);

  function toggleShowAttachmentOptions() {
    setShowAttachmentOptions((prev) => !prev);
  }

  const handleSend = (e) => {
    e.preventDefault();
    if (message.trim()) {
      onSendMessage(message);
      setMessage("");
    }
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative bg-white rounded-lg shadow-sm"
      onSubmit={handleSend}
    >
      <textarea
        rows={1}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="w-[80%] px-3 py-4 bg-white rounded-lg outline-none resize-none no-scrollbar h-fit"
        placeholder="Reply to @Rohit Yadav"
      />
      <div className="absolute top-0 bottom-0 right-3 m-auto flex gap-4 items-center">
        <div className="relative">
          <button type="button" onClick={toggleShowAttachmentOptions}>
            <Paperclip className="w-6 h-6 text-[#141E0D]" />
          </button>
          <AnimatePresence>
            {showAttachmentOptions && (
              <OptionsModal className="max-w-32 bg-[#008000] p-3 rounded-full flex justify-center items-center gap-4 text-white -top-16 -left-11 z-50">
                <button>
                  <Camera size={20} />
                </button>
                <button>
                  <Video size={20} />
                </button>
                <button>
                  <FileText size={20} />
                </button>
              </OptionsModal>
            )}
          </AnimatePresence>
        </div>

        <button>
          <SendHorizonal className="w-6 h-6 text-[#141E0D]" />
        </button>
      </div>
    </motion.form>
  );
}
