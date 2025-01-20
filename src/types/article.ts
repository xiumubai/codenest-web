export interface Article {
  id: number;
  title: string;
  description: string;
  content: string;
  cover: string;
  category: string;
  readingTime: string;
  createdAt: string;
  updatedAt: string;
  views: number;
  likes: number;
  author: {
    id: number;
    name: string;
    avatar: string;
  };
  tags: string[];
} 