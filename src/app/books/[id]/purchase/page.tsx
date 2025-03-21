"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { ArrowLeft, Gift, Users, Star } from "lucide-react"

// 模拟小册数据
const bookData = {
  id: 1,
  title: "React 全栈开发实战",
  description: "从零开始，一步步构建完整的React应用，包含前端界面、后端API和数据库设计。",
  cover: "/placeholder.svg?height=400&width=300",
  author: {
    name: "张三",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  price: 49.9,
  originalPrice: 99.9,
  sections: 24,
  words: "10万+",
  readers: 1250,
  rating: 4.8,
  tags: ["React", "全栈", "实战"],
  updateTime: "2023-06-15",
}

// 支付方式
const paymentMethods = [
  { id: "alipay", name: "支付宝", icon: "/placeholder.svg?height=24&width=24" },
  { id: "wechat", name: "微信支付", icon: "/placeholder.svg?height=24&width=24" },
  { id: "creditcard", name: "信用卡", icon: "/placeholder.svg?height=24&width=24" },
]

export default function PurchasePage({ params }: { params: { id: string } }) {
  const [paymentMethod, setPaymentMethod] = useState("alipay")
  const [couponCode, setCouponCode] = useState("")
  const [isGift, setIsGift] = useState(false)
  const [giftEmail, setGiftEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [agreeTerms, setAgreeTerms] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!agreeTerms) {
      alert("请同意用户协议和隐私政策")
      return
    }

    setIsSubmitting(true)

    // 模拟支付处理
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // 这里应该是实际的支付处理逻辑
    console.log("支付信息:", {
      bookId: params.id,
      paymentMethod,
      couponCode: couponCode || undefined,
      isGift,
      giftEmail: isGift ? giftEmail : undefined,
    })

    // 支付成功后跳转
    window.location.href = `/books/${params.id}/purchase/success`
  }

  return (
    <div className="container mx-auto py-8">
      <div className="mb-6">
        <Link href={`/books/${params.id}`}>
          <Button variant="ghost" size="sm" className="gap-1">
            <ArrowLeft className="h-4 w-4" />
            返回小册详情
          </Button>
        </Link>
      </div>

      <h1 className="text-3xl font-bold mb-8 text-center">购买小册</h1>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
        {/* 左侧小册信息 */}
        <div className="md:col-span-1">
          <Card>
            <CardHeader>
              <h2 className="text-xl font-semibold">订单信息</h2>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-4">
                <div className="relative h-24 w-20 shrink-0">
                  <Image
                    src={bookData.cover || "/placeholder.svg"}
                    alt={bookData.title}
                    fill
                    className="object-cover rounded-md"
                  />
                </div>
                <div>
                  <h3 className="font-medium">{bookData.title}</h3>
                  <div className="text-sm text-muted-foreground mb-1">作者: {bookData.author.name}</div>
                  <div className="flex items-center gap-2 text-sm">
                    <div className="flex items-center">
                      <Star className="h-3 w-3 text-yellow-500 fill-yellow-500" />
                      <span className="ml-0.5">{bookData.rating}</span>
                    </div>
                    <span>·</span>
                    <div className="flex items-center">
                      <Users className="h-3 w-3 text-muted-foreground" />
                      <span className="ml-0.5">{bookData.readers}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t space-y-2">
                <div className="flex justify-between">
                  <span>小册价格</span>
                  <span>¥{bookData.price}</span>
                </div>
                {bookData.originalPrice > bookData.price && (
                  <div className="flex justify-between text-muted-foreground">
                    <span>原价</span>
                    <span className="line-through">¥{bookData.originalPrice}</span>
                  </div>
                )}
                <div className="flex justify-between text-muted-foreground">
                  <span>优惠</span>
                  <span>-¥{(bookData.originalPrice - bookData.price).toFixed(2)}</span>
                </div>
                <div className="pt-2 border-t flex justify-between font-bold">
                  <span>应付金额</span>
                  <span className="text-primary">¥{bookData.price}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 右侧支付表单 */}
        <div className="md:col-span-2">
          <Card>
            <form onSubmit={handleSubmit}>
              <CardHeader>
                <h2 className="text-xl font-semibold">支付方式</h2>
              </CardHeader>
              <CardContent className="space-y-6">
                <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                  {paymentMethods.map((method) => (
                    <div key={method.id} className="flex items-center space-x-2">
                      <RadioGroupItem value={method.id} id={method.id} />
                      <Label htmlFor={method.id} className="flex items-center gap-2 cursor-pointer">
                        <Image src={method.icon || "/placeholder.svg"} alt={method.name} width={24} height={24} />
                        {method.name}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>

                <div className="space-y-2">
                  <Label htmlFor="coupon">优惠码</Label>
                  <div className="flex gap-2">
                    <Input
                      id="coupon"
                      placeholder="如有优惠码请输入"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                    />
                    <Button type="button" variant="outline">
                      应用
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="gift" checked={isGift} onCheckedChange={(checked) => setIsGift(checked as boolean)} />
                    <Label htmlFor="gift" className="flex items-center gap-1 cursor-pointer">
                      <Gift className="h-4 w-4" />
                      作为礼物赠送
                    </Label>
                  </div>

                  {isGift && (
                    <div className="pl-6 space-y-2">
                      <Label htmlFor="giftEmail">收礼人邮箱</Label>
                      <Input
                        id="giftEmail"
                        type="email"
                        placeholder="请输入收礼人邮箱"
                        value={giftEmail}
                        onChange={(e) => setGiftEmail(e.target.value)}
                        required={isGift}
                      />
                      <p className="text-xs text-muted-foreground">收礼人将收到一封包含兑换链接的邮件</p>
                    </div>
                  )}
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="terms"
                    checked={agreeTerms}
                    onCheckedChange={(checked) => setAgreeTerms(checked as boolean)}
                    required
                  />
                  <Label htmlFor="terms" className="text-sm cursor-pointer">
                    我已阅读并同意
                    <Link href="/terms" className="text-primary hover:underline mx-1">
                      用户协议
                    </Link>
                    和
                    <Link href="/privacy" className="text-primary hover:underline ml-1">
                      隐私政策
                    </Link>
                  </Label>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" type="button" onClick={() => window.history.back()}>
                  取消
                </Button>
                <Button
                  type="submit"
                  disabled={isSubmitting || (isGift && !giftEmail) || !agreeTerms}
                  className="bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  {isSubmitting ? "处理中..." : `支付 ¥${bookData.price}`}
                </Button>
              </CardFooter>
            </form>
          </Card>
        </div>
      </div>
    </div>
  )
}

