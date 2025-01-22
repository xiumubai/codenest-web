export interface User {
  id: string;
  username: string;
  avatar: string;
}

export interface Comment {
  id: string;
  content: string;
  author: {
    id: string;
    username: string;
    avatar: string;
  };
  createdAt: string;
  likes: number;
  isLiked?: boolean;
  replies?: Comment[];
  replyTo?: {
    id: string;
    username: string;
  };
} 