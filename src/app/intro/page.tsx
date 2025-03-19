"use client";

import { ArrowRight, Code2, BookOpen, Users, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
  const features = [
    {
      icon: <Code2 className="w-6 h-6" />,
      title: "技术文章",
      description: "分享前沿技术动态，深入解析开发难题，助你把握技术脉搏",
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "问答社区",
      description: "汇聚开发者智慧，解答技术难题，促进知识分享与交流",
    },
    {
      icon: <BookOpen className="w-6 h-6" />,
      title: "学习指南",
      description: "系统化的学习路线，助你突破技术瓶颈，实现技术进阶",
    },
  ];

  return (
    <div className="min-h-full container mx-auto">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="flex-1 space-y-8">
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
                CodeNest
                <span className="text-primary">.</span>
                <br />
                你的技术成长伙伴
              </h1>
              <p className="text-xl text-muted-foreground">
                在这里，与开发者一起学习、分享、成长。
                探索编程世界的无限可能。
              </p>
              <div className="flex gap-4">
                <Link href="/articles">
                  <Button
                    size="lg"
                    className="gap-2"
                  >
                    开始探索
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
                <Link href="/community">
                  <Button size="lg" variant="outline">
                    加入社区
                  </Button>
                </Link>
              </div>
            </div>
            <div className="flex-1 relative">
              <div className="relative w-full aspect-square">
                <Image
                  src="/hero.png"
                  alt="Hero Image"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">
              为什么选择 CodeNest
            </h2>
            <p className="text-muted-foreground">
              打造优质的技术学习平台，助力开发者成长
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="p-6 rounded-lg bg-background shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="w-12 h-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="bg-primary text-primary-foreground rounded-2xl p-12 relative overflow-hidden">
            <div className="relative z-10 text-center max-w-2xl mx-auto">
              <Sparkles className="w-12 h-12 mx-auto mb-6" />
              <h2 className="text-3xl font-bold mb-4">
                准备好开始你的技术之旅了吗？
              </h2>
              <p className="mb-8 text-primary-foreground/80">
                加入我们，与千万开发者一起，书写你的技术人生。
              </p>
              <Link href="/auth/login">
                <Button
                  size="lg"
                  variant="secondary"
                  className="gap-2"
                >
                  立即开始
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
