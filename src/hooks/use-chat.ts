// src/hooks/useChats.ts
import { useInfiniteQuery } from "@tanstack/react-query";
import { ChatMessage } from "../types/chat";

const fetchChats = async (page: number): Promise<ChatMessage[]> => {
  // This is a mock API call. Replace with your actual API endpoint.
  const response = await fetch(
    `https://qa.corider.in/assignment/chat?page=${page}`
  );
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

export const useChats = () => {
  return useInfiniteQuery({
    queryKey: ["chats"],
    initialPageParam: 0,
    queryFn: ({ pageParam = 0 }) => fetchChats(pageParam),
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.length === 0 ? undefined : allPages.length;
    },
  });
};
