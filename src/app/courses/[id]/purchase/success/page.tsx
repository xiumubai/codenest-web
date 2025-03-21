 "use client"

import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, ArrowRight, Clipboard, Check } from "lucide-react"

// 模拟课程数据
const getCourseData = (id) => {
  return {
    id: parseInt(id),
    title: "React 实战进阶",
    description: "学习 React 高级特性与性能优化技巧",
    cover: "/placeholder.svg?height=400&width=300",
    price: 199,
  };
};

export default function PurchaseSuccessPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [courseData, setCourseData] = useState(null);
  const [orderNumber, setOrderNumber] = useState("");
  const [copied, setCopied] = useState(false);
  
  // 生成随机订单号
  useEffect(() => {
    const randomOrderNumber = `ORD${Date.now().toString().slice(-8)}${Math.floor(Math.random() * 1000)}`;
    setOrderNumber(randomOrderNumber);
    setCourseData(getCourseData(params.id));
    
    // 实际项目中应该从服务器获取订单信息和课程数据
  }, [params.id]);
  
  // 复制订单号
  const handleCopyOrderNumber = () => {
    navigator.clipboard.writeText(orderNumber).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };
  
  // 开始学习课程
  const handleStartLearning = () => {
    router.push(`/courses/${params.id}/learn`);
  };
  
  // 查看所有课程
  const handleViewCourses = () => {
    router.push(`/my-courses`);
  };
  
  if (!courseData) {
    return (
      <div className="container mx-auto py-24 px-4 text-center">
        <p>加载中...</p>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto py-12 px-4">
      <div className="max-w-2xl mx-auto text-center mb-8">
        <div className="inline-flex items-center justify-center bg-green-100 text-green-700 rounded-full w-20 h-20 mb-6">
          <CheckCircle className="h-10 w-10" />
        </div>
        <h1 className="text-3xl font-bold mb-2">购买成功！</h1>
        <p className="text-lg text-muted-foreground">
          感谢您购买课程，您可以立即开始学习。
        </p>
      </div>
      
      <Card className="max-w-2xl mx-auto mb-8">
        <CardHeader>
          <CardTitle>订单信息</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground">订单编号</span>
            <div className="flex items-center gap-2">
              <span className="font-medium">{orderNumber}</span>
              <Button 
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={handleCopyOrderNumber}
                title="复制订单号"
              >
                {copied ? <Check className="h-4 w-4 text-green-500" /> : <Clipboard className="h-4 w-4" />}
              </Button>
            </div>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">订单日期</span>
            <span className="font-medium">{new Date().toLocaleDateString()}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">支付方式</span>
            <span className="font-medium">支付宝</span>
          </div>
          <div className="border-t border-border my-4"></div>
          <div className="flex items-start gap-4">
            <div className="relative h-16 w-12 shrink-0">
              <Image
                src={courseData.cover || "/placeholder.svg"}
                alt={courseData.title}
                fill
                className="object-cover rounded-md"
              />
            </div>
            <div className="flex-1">
              <h3 className="font-medium">{courseData.title}</h3>
              <p className="text-sm text-muted-foreground">{courseData.description}</p>
            </div>
            <div className="text-right">
              <span className="font-bold">¥{courseData.price}</span>
            </div>
          </div>
          <div className="border-t border-border my-4"></div>
          <div className="flex justify-between font-bold">
            <span>总计</span>
            <span>¥{courseData.price}</span>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-4 sm:flex-row bg-muted/50 rounded-b-lg">
          <Button 
            variant="default" 
            className="w-full"
            onClick={handleStartLearning}
          >
            开始学习
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
          <Button 
            variant="outline" 
            className="w-full"
            onClick={handleViewCourses}
          >
            查看我的课程
          </Button>
        </CardFooter>
      </Card>
      
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="text-center">
          <h2 className="text-xl font-semibold mb-2">下一步</h2>
          <p className="text-muted-foreground">以下是一些建议，帮助您充分利用这门课程：</p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Card>
            <CardContent className="pt-6">
              <h3 className="font-semibold mb-2">设置学习计划</h3>
              <p className="text-sm text-muted-foreground">
                根据您的时间安排，制定每周学习计划，确保持续进步。
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <h3 className="font-semibold mb-2">加入学习社区</h3>
              <p className="text-sm text-muted-foreground">
                与其他学员一起讨论课程内容，分享学习心得。
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <h3 className="font-semibold mb-2">完成课程练习</h3>
              <p className="text-sm text-muted-foreground">
                每个章节的练习都是巩固知识的重要方式，请认真完成。
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <h3 className="font-semibold mb-2">获取学习证书</h3>
              <p className="text-sm text-muted-foreground">
                完成全部课程后，可以获得课程证书，添加到您的简历中。
              </p>
            </CardContent>
          </Card>
        </div>
        
        <div className="text-center mt-8">
          <p className="text-sm text-muted-foreground mb-4">
            如有任何问题，请随时 
            <Link href="/support" className="text-primary hover:underline">
              联系我们
            </Link>
          </p>
          <Button 
            variant="link"
            onClick={() => router.push("/")}
          >
            返回首页
          </Button>
        </div>
      </div>
    </div>
  )
} 
