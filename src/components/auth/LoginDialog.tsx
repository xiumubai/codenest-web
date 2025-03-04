'use client';

import { useRouter } from 'next/navigation';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { LogIn } from 'lucide-react';

interface LoginDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title?: string;
  description?: string;
}

export default function LoginDialog({
  open,
  onOpenChange,
  title = '需要登录',
  description = '登录后即可使用完整功能',
}: LoginDialogProps) {
  const router = useRouter();
  
  const handleLogin = () => {
    const fullUrl = window.location.href.split(window.location.origin)[1];
    const returnUrl = encodeURIComponent(fullUrl);
    router.push(`/auth/login?returnUrl=${returnUrl}`);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <div className="flex justify-end">
          <Button
            onClick={handleLogin}
            className="gap-2"
          >
            <LogIn className="w-4 h-4" />
            去登录
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
