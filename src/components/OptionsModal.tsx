import { motion } from "framer-motion";
import { MessageSquareX, Phone, Users } from "lucide-react";

const dropdownVariants = {
  hidden: {
    opacity: 0,
    scale: 0.9,
    y: -10,
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.15,
      ease: "easeInOut",
    },
  },
};

export default function OptionsModal({ isOpen }) {
  return (
    <motion.div
      className={`w-40 max-w-40 h-fit absolute top-full right-0 bg-white shadow-md rounded-lg p-3 z-50`}
      variants={dropdownVariants}
      initial="hidden"
      animate={isOpen ? "visible" : "hidden"}
      exit="hidden"
    >
      <button className="flex items-center gap-3 text-[#141E0D] py-3.5">
        <Users size={20} />
        <span className="text-sm font-semibold">Members</span>
      </button>
      <button className="flex items-center gap-3 text-[#141E0D] py-3.5">
        <Phone size={20} />
        <span className="text-sm font-semibold">Share Number</span>
      </button>
      <button className="flex items-center gap-3 text-[#141E0D] py-3.5">
        <MessageSquareX size={20} />
        <span className="text-sm font-semibold">Report</span>
      </button>
    </motion.div>
  );
}
