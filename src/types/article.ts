
// 定义 Article 类型
export interface Article {
  id: number;
  title: string;
  content: string;
  description: string;
  cover: string;
  isDraft: boolean;
  publishedAt: string | null;
  createdAt: string;
  updatedAt: string;
  viewCount: number;
  likeCount: number;
  commentCount: number;
  authorId: number;
  tagId: number;
  author: {
    id: number;
    username: string;
    avatar: string;
  };
  tag: {
    id: number;
    name: string;
    createdAt: string;
    updatedAt: string;
  };
  liked: boolean;
}