export interface ChatMessage {
  id: string;
  sender: {
    user_id: string;
    image: string;
    is_kyc_verified: boolean;
    self: boolean;
  };
  message: string;
  time: string;
}

export interface ChatRoom {
  id: string;
  from: string;
  to: string;
  lastMessage: string;
  timestamp: string;
}
