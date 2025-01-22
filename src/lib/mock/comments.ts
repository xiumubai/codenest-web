import { Comment } from "@/types/comment";

export const mockComments: Comment[] = [
  {
    id: "1",
    content: "这篇文章写得非常好，对我帮助很大！特别是关于性能优化的部分，讲解得很清晰。",
    author: {
      id: "user1",
      username: "张三",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=1",
    },
    createdAt: "2024-03-15T10:00:00Z",
    likes: 12,
    replies: [
      {
        id: "1-1",
        content: "同感！性能优化这块确实讲得很透彻",
        author: {
          id: "user2",
          username: "李四",
          avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=2",
        },
        createdAt: "2024-03-15T10:30:00Z",
        likes: 3,
        replyTo: {
          id: "user1",
          username: "张三"
        }
      }
    ]
  },
  {
    id: "2",
    content: "文章中提到的CSS最佳实践很实用，我们团队一直在寻找一个好的CSS架构方案，这些建议给了我很好的启发。",
    author: {
      id: "user3",
      username: "王五",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=3",
    },
    createdAt: "2024-03-15T11:00:00Z",
    likes: 8,
    replies: [
      {
        id: "2-1",
        content: "BEM命名确实是个好方案，我们团队也在用",
        author: {
          id: "user4",
          username: "赵六",
          avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=4",
        },
        createdAt: "2024-03-15T11:15:00Z",
        likes: 2,
        replyTo: {
          id: "user3",
          username: "王五"
        }
      },
      {
        id: "2-2",
        content: "除了BEM，Tailwind也是个不错的选择",
        author: {
          id: "user5",
          username: "钱七",
          avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=5",
        },
        createdAt: "2024-03-15T11:30:00Z",
        likes: 4,
        replyTo: {
          id: "user4",
          username: "赵六"
        }
      }
    ]
  }
]; 