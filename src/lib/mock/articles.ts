import { Article } from "@/types/article";

const tagColors = {
  "Next.js": "bg-black text-white",
  "React": "bg-blue-500 text-white",
  "TypeScript": "bg-blue-600 text-white",
  "Node.js": "bg-green-600 text-white",
  "Nest.js": "bg-red-600 text-white",
  "Docker": "bg-blue-400 text-white",
  "MongoDB": "bg-green-500 text-white",
  "Redis": "bg-red-500 text-white",
  "GraphQL": "bg-pink-500 text-white",
  "Tailwind": "bg-cyan-500 text-white",
} as const;

const tags = Object.entries(tagColors).map(([name, color]) => ({
  id: name.toLowerCase().replace(/\s/g, '-'),
  name,
  color,
}));

// 使用确定性的函数来生成数值
function getNumberFromIndex(index: number, min: number, max: number): number {
  return min + (index % (max - min + 1));
}

// 使用确定性的函数来生成日期
function getDateFromIndex(index: number): string {
  // 使用固定的基准日期：2024-01-01
  const baseTimestamp = new Date('2024-01-01').getTime();
  const dayInMilliseconds = 24 * 60 * 60 * 1000;
  const date = new Date(baseTimestamp - index * dayInMilliseconds);
  return date.toISOString();
}

// 使用确定性的函数来选择标签
function getTagsFromIndex(index: number): typeof tags[number][] {
  const numTags = getNumberFromIndex(index, 1, 3);
  return Array.from(
    { length: numTags },
    (_, i) => tags[(index + i) % tags.length]
  );
}

// 生成头像URL
function generateAvatarUrl(name: string): string {
  // 使用 UI Avatars 服务
  return `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random&color=fff&size=128`;
}

export function generateMockArticles(count: number): Article[] {
  return Array.from({ length: count }, (_, i) => ({
    id: `article-${i + 1}`,
    title: `构建现代化Web应用：${i + 1}个必备技术栈详解`,
    subtitle: "从架构设计到性能优化的最佳实践",
    author: {
      name: `作者${i + 1}`,
      avatar: generateAvatarUrl(`作者${i + 1}`),
    },
    bookmarks: getNumberFromIndex(i, 100, 999),
    likes: getNumberFromIndex(i, 100, 999),
    publishedAt: getDateFromIndex(i),
    coverImage: `https://picsum.photos/seed/${i + 1}/800/400`,
    tags: getTagsFromIndex(i),
  }));
} 