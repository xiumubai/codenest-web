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
  bookmarks?: number;
  author: {
    id: number;
    username: string;
    avatar: string;
  };
  tag: {
    id: number;
    name: string;
  };
}
