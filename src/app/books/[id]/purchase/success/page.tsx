import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle, BookOpen, Share2 } from "lucide-react"

// 模拟小册数据
const bookData = {
  id: 1,
  title: "React 全栈开发实战",
  cover: "/placeholder.svg?height=400&width=300",
  author: {
    name: "张三",
    avatar: "/placeholder.svg?height=40&width=40",
  },
}

export default function PurchaseSuccessPage({ params }: { params: { id: string } }) {
  return (
    <div className="container mx-auto py-12">
      <div className="max-w-md mx-auto">
        <Card>
          <CardContent className="pt-6 px-6 pb-8 flex flex-col items-center text-center">
            <div className="mb-4 rounded-full bg-green-100 p-3 dark:bg-green-900/20">
              <CheckCircle className="h-8 w-8 text-green-600 dark:text-green-500" />
            </div>

            <h1 className="text-2xl font-bold mb-2">购买成功！</h1>
            <p className="text-muted-foreground mb-6">感谢您购买《{bookData.title}》小册，现在您可以开始阅读了。</p>

            <div className="relative h-40 w-32 mb-6">
              <Image
                src={bookData.cover || "/placeholder.svg"}
                alt={bookData.title}
                fill
                className="object-cover rounded-md shadow-md"
              />
            </div>

            <div className="grid grid-cols-2 gap-4 w-full mb-6">
              <Link href={`/books/${params.id}/read/1`}>
                <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
                  <BookOpen className="mr-2 h-4 w-4" />
                  开始阅读
                </Button>
              </Link>
              <Button variant="outline" className="w-full">
                <Share2 className="mr-2 h-4 w-4" />
                分享
              </Button>
            </div>

            <div className="w-full pt-4 border-t text-sm text-muted-foreground">
              <p>订单号: ORD{Date.now().toString().slice(-8)}</p>
              <p>交易时间: {new Date().toLocaleString()}</p>
            </div>
          </CardContent>
        </Card>

        <div className="mt-6 text-center">
          <Link href="/books">
            <Button variant="ghost">返回小册列表</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
