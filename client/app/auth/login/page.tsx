'use client';

import { useState } from 'react';
import { AuthForm } from '@/components/auth/AuthForm';
import Link from 'next/link';

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);

  const handleToggle = () => {
    setIsLogin(!isLogin);
  };

  if (!isLogin) {
    // Redirect to register page
    return <AuthForm isLogin={false} onToggle={handleToggle} />;
  }

  return (
    <>
      <AuthForm isLogin={true} onToggle={handleToggle} />
    </>
  );
}
