'use client';

import { useState } from 'react';
import { useUserStore } from '@/store/user';
import LoginDialog from './LoginDialog';

type WithAuthProps = {
  children: React.ReactNode;
  onAuth?: () => void;
};

export default function WithAuth({ children, onAuth }: WithAuthProps) {
  const { userInfo } = useUserStore();
  const [showLoginDialog, setShowLoginDialog] = useState(false);

  const handleClick = (e: React.MouseEvent) => {
    if (!userInfo) {
      e.preventDefault();
      e.stopPropagation();
      setShowLoginDialog(true);
      return;
    }
    onAuth?.();
  };

  return (
    <>
      <div onClick={handleClick}>
        {children}
      </div>
      <LoginDialog
        open={showLoginDialog}
        onOpenChange={setShowLoginDialog}
      />
    </>
  );
}