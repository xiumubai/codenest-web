export interface Article {
  id: string;
  title: string;
  subtitle: string;
  author: {
    name: string;
    avatar: string;
  };
  likes: number;
  publishedAt: string;
  coverImage: string;
  tags: Array<{
    id: string;
    name: string;
    color: string;
  }>;
} 