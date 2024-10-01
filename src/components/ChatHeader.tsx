import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  SquarePen,
  MoveLeft,
  EllipsisVertical,
  Users,
  Phone,
  MessageSquareX,
} from "lucide-react";

import GroupImage from "../assets/group-image.svg";
import OptionsModal from "./OptionsModal";

interface ChatHeaderProps {
  from: string;
  to: string;
  tripName: string;
}

export default function ChatHeader({ from, to, tripName }: ChatHeaderProps) {
  const [showOptions, setShowOptions] = useState<boolean>(false);

  function toggleOptions() {
    setShowOptions((prev) => !prev);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="isolate z-50 flex flex-col gap-4 border-b border-b-[#E5E5E0] pb-4 md:gap-6 lg:gap-8"
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
            {showOptions && (
              <OptionsModal className="w-40 max-w-40 h-fit top-full right-0 bg-white shadow-md rounded-lg p-3 z-50">
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
              </OptionsModal>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}
