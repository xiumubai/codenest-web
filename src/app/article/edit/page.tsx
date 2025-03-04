'use client';

import { useSearchParams } from "next/navigation";

import ArticleForm from '@/components/article/ArticleForm';

export default function EditArticlePage() {
  const searchParams = useSearchParams();
  const articleId = searchParams.get('id');

  return (
    <ArticleForm
      mode="edit"
      articleId={articleId as string}
    />
  );
}