import { motion } from "framer-motion";
import { cn } from "../utils/cn";

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

export default function OptionsModal({ children, className }) {
  return (
    <motion.div
      className={cn("absolute", className)}
      variants={dropdownVariants}
      initial="hidden"
      animate="visible"
      exit="hidden"
    >
      {children}
    </motion.div>
  );
}
