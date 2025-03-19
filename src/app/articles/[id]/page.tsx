import { ArticleDetail } from "@/components/article/article-detail"
import { CommentSection } from "@/components/article/comment-section"
import { RelatedArticles } from "@/components/article/related-articles"
import { AuthorCard } from "@/components/article/author-card"

export default function ArticleDetailPage({
  params,
}: {
  params: { id: string }
}) {
  return (
    <div className="container py-8">
      <div className="mx-auto max-w-4xl">
        <ArticleDetail id={params.id} />

        <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3">
          <div className="md:col-span-2">
            <CommentSection articleId={params.id} />
          </div>
          <div className="space-y-8">
            <AuthorCard />
            <div className="rounded-lg border p-6">
              <h3 className="mb-4 text-lg font-semibold">相关文章</h3>
              <RelatedArticles currentArticleId={params.id} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

