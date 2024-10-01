import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import ChatHeader from "./components/ChatHeader";
import ChatMessage from "./components/ChatMessage";
import ChatInput from "./components/ChatInput";
import { useChats } from "./hooks/use-chat";
import { useInView } from "react-intersection-observer";
import Spinner from "./components/Loader";

export default function App() {
  const { ref, inView } = useInView();
  const { data, fetchNextPage, isFetchingNextPage, status } = useChats();
  const scrollBottomRef = useRef<HTMLDivElement | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const [prevScrollHeight, setPrevScrollHeight] = useState(0);

  useEffect(function scrollToBottom() {
    scrollBottomRef.current?.scrollIntoView({ behavior: "instant" });
  }, []);

  useEffect(
    function fetchChats() {
      if (inView) {
        const currentScrollHeight =
          scrollContainerRef.current?.scrollHeight || 0;
        setPrevScrollHeight(currentScrollHeight);
        fetchNextPage();
      }
    },
    [inView, fetchNextPage]
  );

  useEffect(
    function maintainScrollPosition() {
      if (scrollContainerRef.current && prevScrollHeight > 0) {
        const newScrollHeight = scrollContainerRef.current.scrollHeight;
        const scrollDiff = newScrollHeight - prevScrollHeight;
        scrollContainerRef.current.scrollTop += scrollDiff - 50;
      }
    },
    [data, prevScrollHeight]
  );

  const handleSendMessage = (message: string) => {
    console.log("Sending message:", message);
  };

  if (status === "pending") {
    return (
      <main className="h-screen flex items-center justify-center">
        <Spinner />
      </main>
    );
  }

  if (status === "error") {
    return <h1>Error</h1>;
  }

  const { from, to, name } = data.pages[0];

  const elements = data?.pages
    .map((page) =>
      page.chats?.map((message) => (
        <div key={message.id}>
          <ChatMessage message={message} />
        </div>
      ))
    )
    .reverse();

  console.log(elements);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="container mx-auto flex flex-col h-screen bg-[#FAF9F4] px-4 py-5"
    >
      <ChatHeader from={from} to={to} tripName={name} />
      <div
        ref={scrollContainerRef}
        className="flex-1 overflow-y-auto flex flex-col gap-5 py-4 pr-3 no-scrollbar isolate"
      >
        <div className="w-full h-1 border border-transparent" ref={ref}></div>
        {isFetchingNextPage && (
          <div className="self-center">
            <Spinner />
          </div>
        )}
        {elements}
        <div ref={scrollBottomRef} className="w-full h-1" />
      </div>
      <ChatInput onSendMessage={handleSendMessage} />
    </motion.div>
  );
}
