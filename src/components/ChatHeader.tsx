import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { SquarePen, MoveLeft, EllipsisVertical } from "lucide-react";

import GroupImage from "../assets/group-image.svg";
import OptionsModal from "./OptionsModal";

interface ChatHeaderProps {
  from: string;
  to: string;
  tripName: string;
}

const ChatHeader: React.FC<ChatHeaderProps> = ({ from, to, tripName }) => {
  const [showOptions, setShowOptions] = useState<boolean>(false);

  function toggleOptions() {
    setShowOptions((prev) => !prev);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col gap-4 border-b border-b-[#E5E5E0] pb-4"
    >
      <div className="flex items-center gap-2.5 text-[#141E0D]">
        <MoveLeft className="w-6 h-6" />
        <span className="flex-1 text-2xl font-bold">{tripName}</span>
        <SquarePen className="w-6 h-6" />
      </div>
      <div className="flex items-center gap-4">
        <img src={GroupImage} className="w-12 h-12" />
        <div className="flex-1 text-base text-[#606060] font-medium">
          <p className="leading-none">
            From{" "}
            <span className="text-[#141E0D] text-lg font-bold">{from}</span>
          </p>
          <p className="leading-none -mt-1.5">
            To <span className="text-[#141E0D] text-lg font-bold">{to}</span>
          </p>
        </div>
        <div className="relative">
          <button onClick={toggleOptions}>
            <EllipsisVertical />
          </button>
          <AnimatePresence>
            {showOptions && <OptionsModal isOpen={showOptions} />}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
};

export default ChatHeader;
