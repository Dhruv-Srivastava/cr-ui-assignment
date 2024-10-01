import { motion } from "framer-motion";

import { ChatMessage as ChatMessageType } from "../types/chat";
import Avatar from "./Avatar";
import { cn } from "../utils/cn";

interface ChatMessageProps {
  message: ChatMessageType;
}

export default function ChatMessage({ message }: ChatMessageProps) {
  const { sender } = message;
  const { image, is_kyc_verified, self } = sender;
  return (
    <motion.div
      className={cn("flex items-start gap-4 lg:gap-7", self && "justify-end")}
    >
      {!self && <Avatar image={image} isVerified={is_kyc_verified} />}
      <span
        className={cn(
          "shadow-[0_4px_8px_rgba(0,0,0,0.08)] max-w-[70%] rounded-xl p-3 g-white text-[#606060]",
          self && "bg-[#1C63D5] text-white rounded-br-none",
          !self && "rounded-tl-none"
        )}
      >
        {message.message}
      </span>
    </motion.div>
  );
}
