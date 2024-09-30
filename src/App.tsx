// src/App.tsx
import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import ChatHeader from "./components/ChatHeader";
import ChatMessage from "./components/ChatMessage";
import ChatInput from "./components/ChatInput";
import { useChats } from "./hooks/use-chat";
import { useInView } from "react-intersection-observer";

const App: React.FC = () => {
  const { ref, inView } = useInView();
  const { data, fetchNextPage, isFetchingNextPage, status } = useChats();
  // const scrollBottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(
    function fetchChats() {
      if (inView) fetchNextPage();
    },
    [inView, fetchNextPage]
  );

  const handleSendMessage = (message: string) => {
    // Implement sending message logic here
    console.log("Sending message:", message);
  };

  if (status === "pending") {
    return <h1>Loading!!</h1>;
  }

  if (status === "error") {
    return <h1>Error</h1>;
  }

  const { from, to, name } = data.pages[0];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="container mx-auto flex flex-col h-screen bg-[#FAF9F4] px-4 py-5"
    >
      <ChatHeader from={from} to={to} tripName={name} />
      <div className="flex-1 overflow-y-auto flex flex-col gap-5 py-4 pr-3">
        {data?.pages.map((page, pageIndex) =>
          page.chats?.map((message, messageIndex) => (
            <div key={message.id}>
              <ChatMessage message={message} />
            </div>
          ))
        )}

        <div className="w-full h-1 border border-transparent" ref={ref}></div>
      </div>

      <ChatInput onSendMessage={handleSendMessage} />
    </motion.div>
  );
};

export default App;
