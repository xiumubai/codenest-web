import { ArticleDetail } from "@/components/article/article-detail"
import { CommentList } from "@/components/article/comment/comment-list"

export default function ArticleDetailPage({
  params,
}: {
  params: { id: string }
}) {
  return (
    <div className="container py-8">
      <div className="mx-auto">
        <ArticleDetail articleId={params.id} />
        <CommentList articleId={params.id} />
      </div>
    </div>
  )
}
