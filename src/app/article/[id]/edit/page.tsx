'use client';

import { useParams } from 'next/navigation';
import ArticleForm from '@/components/article/ArticleForm';

export default function EditArticlePage() {
  const { id } = useParams();

  return (
    <ArticleForm
      mode="edit"
      articleId={id as string}
    />
  );
}