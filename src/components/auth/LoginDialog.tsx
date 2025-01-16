"use client";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Github, Loader2, Eye, EyeOff } from "lucide-react";
import Image from "next/image";

interface LoginDialogProps {
  onLoginSuccess: (userData: any) => void;
}

export default function LoginDialog({ onLoginSuccess }: LoginDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  // Mock login function
  const handlePasswordLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // 模拟API调用
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const mockUserData = {
        id: 1,
        name: "测试用户",
        email: "test@example.com",
        avatar: "https://api.dicebear.com/7.x/avatars/svg?seed=1",
      };
      
      onLoginSuccess(mockUserData);
      setIsOpen(false);
    } catch (error) {
      console.error("Login failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGithubLogin = async () => {
    setIsLoading(true);
    try {
      // 模拟GitHub登录
      await new Promise(resolve => setTimeout(resolve, 1500));
      const mockUserData = {
        id: 2,
        name: "GitHub User",
        email: "github@example.com",
        avatar: "https://api.dicebear.com/7.x/avatars/svg?seed=2",
      };
      onLoginSuccess(mockUserData);
      setIsOpen(false);
    } catch (error) {
      console.error("GitHub login failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="px-4 py-2 text-sm rounded-full bg-gradient-to-r from-purple-500 to-pink-500 hover:opacity-90 transition">
          登录
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] border-border bg-card">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-600 text-transparent bg-clip-text">
            登录 CodeNest
          </DialogTitle>
        </DialogHeader>
        
        <Tabs defaultValue="password" className="mt-4">
          <TabsList className="grid w-full grid-cols-3 bg-muted">
            <TabsTrigger 
              value="password" 
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-pink-500 data-[state=active]:text-primary-foreground"
            >
              密码登录
            </TabsTrigger>
            <TabsTrigger 
              value="wechat"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-pink-500 data-[state=active]:text-primary-foreground"
            >
              微信
            </TabsTrigger>
            <TabsTrigger 
              value="github"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-pink-500 data-[state=active]:text-primary-foreground"
            >
              GitHub
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="password">
            <form onSubmit={handlePasswordLogin} className="space-y-4 mt-4">
              <div className="space-y-2">
                <Input
                  type="text"
                  placeholder="用户名/手机号"
                  value={formData.username}
                  onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                  required
                  autoComplete="username"
                  className="bg-input border-input focus:border-primary focus:ring-primary/20"
                />
              </div>
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="密码"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  required
                  className="pr-10 bg-input border-input focus:border-primary focus:ring-primary/20"
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-0.5 text-zinc-400 hover:text-zinc-100 focus:outline-none"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
              <Button 
                type="submit" 
                className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:opacity-90 transition"
                disabled={isLoading}
              >
                {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                {isLoading ? "登录中..." : "登录"}
              </Button>
            </form>
          </TabsContent>
          
          <TabsContent value="wechat" className="flex justify-center py-8">
            <div className="text-center">
              <div className="bg-muted p-4 rounded-lg mb-4">
                <Image
                  src="/qrcode-placeholder.png"
                  alt="WeChat QR Code"
                  width={180}
                  height={180}
                  className="rounded"
                />
              </div>
              <p className="text-sm text-muted-foreground">请使用微信扫码登录</p>
            </div>
          </TabsContent>
          
          <TabsContent value="github">
            <div className="py-6">
              <Button
                variant="outline"
                className="w-full border-input bg-input hover:bg-accent hover:text-foreground transition-colors"
                onClick={handleGithubLogin}
                disabled={isLoading}
              >
                {isLoading ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Github className="mr-2 h-4 w-4" />
                )}
                {isLoading ? "登录中..." : "使用 GitHub 账号登录"}
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
} 