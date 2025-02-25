"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UserInfoForm } from "@/components/profile/UserInfoForm";
import { PhoneBindForm } from "@/components/profile/PhoneBindForm";
import { PasswordForm } from "@/components/profile/PasswordForm";

export default function SettingsPage() {
  return (
    <div className="container mx-auto py-6">
      <Card>
        <CardHeader>
          <CardTitle>个人设置</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="info" className="w-full flex"> 
            <TabsList className="flex flex-col h-full space-y-2 mr-6">
              <TabsTrigger value="info">基本信息</TabsTrigger>
              <TabsTrigger value="phone">手机绑定</TabsTrigger>
              <TabsTrigger value="password">密码设置</TabsTrigger>
            </TabsList>
            <div className="flex-1">
              <TabsContent value="info">
                <UserInfoForm />
              </TabsContent>
              <TabsContent value="phone">
                <PhoneBindForm />
              </TabsContent>
              <TabsContent value="password">
                <PasswordForm />
              </TabsContent>
            </div>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}