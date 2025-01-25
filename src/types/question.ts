export interface Tag {
  id: string;
  name: string;
  color?: string;
}

export interface Question {
  id: string;
  title: string;
  author: {
    id: string;
    name: string;
    avatar: string;
  };
  createdAt: string;
  tags: Tag[];
  answersCount: number;
  likesCount: number;
  isLiked?: boolean;
}

export interface QuestionForm {
  title: string;
  description: string;
  expectation: string;
  tags: Tag[];
} 