"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { ArrowLeft, AlertCircle, CheckCircle, Clock, Users, Star } from "lucide-react"

// 模拟课程数据
const getCourseData = (id) => {
  return {
    id: parseInt(id),
    title: "React 实战进阶",
    description: "学习 React 高级特性与性能优化技巧",
    cover: "/placeholder.svg?height=400&width=300",
    instructor: {
      name: "李明",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    price: 199,
    originalPrice: 299,
    totalHours: 24,
    totalLessons: 48,
    level: "中级",
    students: 1325,
    rating: 4.7,
    tags: ["React", "前端", "性能优化"],
    updatedAt: "2023-10-15",
  };
};

// 支付方式
const paymentMethods = [
  { id: "alipay", name: "支付宝", icon: "/placeholder.svg?height=24&width=24" },
  { id: "wechat", name: "微信支付", icon: "/placeholder.svg?height=24&width=24" },
  { id: "unionpay", name: "银联支付", icon: "/placeholder.svg?height=24&width=24" },
  { id: "creditcard", name: "信用卡", icon: "/placeholder.svg?height=24&width=24" },
];

// 优惠券数据
const coupons = [
  { code: "NEW10", discount: 10, type: "percent", minPurchase: 100 },
  { code: "SAVE20", discount: 20, type: "amount", minPurchase: 150 },
];

export default function CoursePurchasePage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const courseData = getCourseData(params.id);
  
  const [paymentMethod, setPaymentMethod] = useState("alipay");
  const [couponCode, setCouponCode] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [couponError, setCouponError] = useState("");
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [cardNumber, setCardNumber] = useState("");
  const [cardholderName, setCardholderName] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  
  // 处理优惠码应用
  const handleApplyCoupon = () => {
    // 重置错误和已应用优惠
    setCouponError("");
    setAppliedCoupon(null);
    
    if (!couponCode.trim()) {
      setCouponError("请输入优惠码");
      return;
    }
    
    // 查找匹配的优惠券
    const foundCoupon = coupons.find(
      (coupon) => coupon.code.toLowerCase() === couponCode.toLowerCase()
    );
    
    if (!foundCoupon) {
      setCouponError("无效的优惠码");
      return;
    }
    
    // 检查最小购买金额
    if (courseData.price < foundCoupon.minPurchase) {
      setCouponError(`此优惠码需要最低消费¥${foundCoupon.minPurchase}`);
      return;
    }
    
    // 应用优惠券
    setAppliedCoupon(foundCoupon);
  };
  
  // 计算最终价格
  const calculateFinalPrice = () => {
    if (!appliedCoupon) return courseData.price;
    
    if (appliedCoupon.type === "percent") {
      // 百分比折扣
      return courseData.price * (1 - appliedCoupon.discount / 100);
    } else {
      // 固定金额折扣
      return Math.max(0, courseData.price - appliedCoupon.discount);
    }
  };
  
  const finalPrice = calculateFinalPrice();
  
  // 处理支付表单提交
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!agreeTerms) {
      alert("请同意用户协议和隐私政策");
      return;
    }
    
    setIsSubmitting(true);
    
    // 模拟支付处理
    try {
      // 这里应该是实际的支付处理逻辑
      console.log("支付信息:", {
        courseId: params.id,
        paymentMethod,
        couponCode: appliedCoupon?.code || undefined,
        finalPrice,
        cardInfo: paymentMethod === "creditcard" ? {
          cardNumber,
          cardholderName,
          expiryDate,
          // 实际开发中不要在前端日志中记录敏感信息
          cvv: "***"
        } : undefined
      });
      
      // 模拟网络请求延迟
      await new Promise((resolve) => setTimeout(resolve, 2000));
      
      // 支付成功后跳转
      router.push(`/courses/${params.id}/purchase/success`);
    } catch (error) {
      console.error("支付失败:", error);
      setIsSubmitting(false);
      alert("支付处理失败，请重试");
    }
  };
  
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-6">
        <Link href={`/courses/${params.id}`}>
          <Button variant="ghost" size="sm" className="gap-1">
            <ArrowLeft className="h-4 w-4" />
            返回课程详情
          </Button>
        </Link>
      </div>

      <h1 className="text-3xl font-bold mb-8 text-center">购买课程</h1>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
        {/* 左侧课程信息 */}
        <div className="md:col-span-1">
          <Card>
            <CardHeader>
              <h2 className="text-xl font-semibold">订单信息</h2>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-4">
                <div className="relative h-24 w-20 shrink-0">
                  <Image
                    src={courseData.cover || "/placeholder.svg"}
                    alt={courseData.title}
                    fill
                    className="object-cover rounded-md"
                  />
                </div>
                <div>
                  <h3 className="font-medium">{courseData.title}</h3>
                  <div className="text-sm text-muted-foreground mb-1">讲师: {courseData.instructor.name}</div>
                  <div className="flex flex-wrap items-center gap-2 text-sm">
                    <div className="flex items-center">
                      <Star className="h-3 w-3 text-yellow-500 fill-yellow-500" />
                      <span className="ml-0.5">{courseData.rating}</span>
                    </div>
                    <span>·</span>
                    <div className="flex items-center">
                      <Users className="h-3 w-3 text-muted-foreground" />
                      <span className="ml-0.5">{courseData.students}人学习</span>
                    </div>
                    <span>·</span>
                    <div className="flex items-center">
                      <Clock className="h-3 w-3 text-muted-foreground" />
                      <span className="ml-0.5">{courseData.totalHours}小时</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t space-y-2">
                <div className="flex justify-between">
                  <span>课程价格</span>
                  <span>¥{courseData.price.toFixed(2)}</span>
                </div>
                {courseData.originalPrice > courseData.price && (
                  <div className="flex justify-between text-muted-foreground">
                    <span>原价</span>
                    <span className="line-through">¥{courseData.originalPrice.toFixed(2)}</span>
                  </div>
                )}
                
                {appliedCoupon && (
                  <div className="flex justify-between text-green-600">
                    <span>优惠券折扣</span>
                    <span>
                      {appliedCoupon.type === "percent" 
                        ? `-${appliedCoupon.discount}%` 
                        : `-¥${appliedCoupon.discount.toFixed(2)}`}
                    </span>
                  </div>
                )}
                
                <div className="pt-2 border-t flex justify-between font-bold">
                  <span>应付金额</span>
                  <span className="text-primary">¥{finalPrice.toFixed(2)}</span>
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
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {paymentMethods.map((method) => (
                      <div key={method.id} className="flex items-center space-x-2 border rounded-md p-3 cursor-pointer hover:border-primary" onClick={() => setPaymentMethod(method.id)}>
                        <RadioGroupItem value={method.id} id={method.id} />
                        <Label htmlFor={method.id} className="flex items-center gap-2 cursor-pointer flex-1">
                          <Image src={method.icon || "/placeholder.svg"} alt={method.name} width={24} height={24} />
                          {method.name}
                        </Label>
                      </div>
                    ))}
                  </div>
                </RadioGroup>

                {/* 信用卡信息 */}
                {paymentMethod === "creditcard" && (
                  <div className="space-y-4 border rounded-md p-4">
                    <h3 className="font-medium">信用卡信息</h3>
                    <div className="space-y-3">
                      <div>
                        <Label htmlFor="cardNumber">卡号</Label>
                        <Input
                          id="cardNumber"
                          placeholder="1234 5678 9012 3456"
                          value={cardNumber}
                          onChange={(e) => setCardNumber(e.target.value)}
                          required={paymentMethod === "creditcard"}
                        />
                      </div>
                      <div>
                        <Label htmlFor="cardholderName">持卡人姓名</Label>
                        <Input
                          id="cardholderName"
                          placeholder="张三"
                          value={cardholderName}
                          onChange={(e) => setCardholderName(e.target.value)}
                          required={paymentMethod === "creditcard"}
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="expiryDate">有效期 (MM/YY)</Label>
                          <Input
                            id="expiryDate"
                            placeholder="01/26"
                            value={expiryDate}
                            onChange={(e) => setExpiryDate(e.target.value)}
                            required={paymentMethod === "creditcard"}
                          />
                        </div>
                        <div>
                          <Label htmlFor="cvv">安全码</Label>
                          <Input
                            id="cvv"
                            placeholder="123"
                            type="password"
                            value={cvv}
                            onChange={(e) => setCvv(e.target.value)}
                            required={paymentMethod === "creditcard"}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="coupon">优惠码</Label>
                  <div className="flex gap-2">
                    <Input
                      id="coupon"
                      placeholder="如有优惠码请输入"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                    />
                    <Button 
                      type="button" 
                      variant="outline"
                      onClick={handleApplyCoupon}
                      disabled={isSubmitting}
                    >
                      应用
                    </Button>
                  </div>
                  
                  {couponError && (
                    <Alert variant="destructive" className="mt-2">
                      <AlertCircle className="h-4 w-4" />
                      <AlertDescription>{couponError}</AlertDescription>
                    </Alert>
                  )}
                  
                  {appliedCoupon && (
                    <Alert className="mt-2 bg-green-50 text-green-700 border-green-200">
                      <CheckCircle className="h-4 w-4" />
                      <AlertDescription>
                        优惠码"{appliedCoupon.code}"已应用
                        {appliedCoupon.type === "percent" 
                          ? `，节省${appliedCoupon.discount}%` 
                          : `，节省¥${appliedCoupon.discount.toFixed(2)}`}
                      </AlertDescription>
                    </Alert>
                  )}
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="terms"
                    checked={agreeTerms}
                    onCheckedChange={(checked) => setAgreeTerms(checked === true)}
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
                <Button variant="outline" type="button" onClick={() => router.back()}>
                  取消
                </Button>
                <Button
                  type="submit"
                  disabled={isSubmitting || !agreeTerms}
                  className="bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  {isSubmitting ? "处理中..." : `支付 ¥${finalPrice.toFixed(2)}`}
                </Button>
              </CardFooter>
            </form>
          </Card>
        </div>
      </div>
    </div>
  )
} 