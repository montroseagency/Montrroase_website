'use client';

import { useState } from 'react';
import { AuthForm } from '@/components/auth/AuthForm';

export default function RegisterPage() {
  const [isLogin, setIsLogin] = useState(false);

  const handleToggle = () => {
    setIsLogin(!isLogin);
  };

  if (isLogin) {
    // Redirect to login page
    return <AuthForm isLogin={true} onToggle={handleToggle} />;
  }

  return (
    <>
      <AuthForm isLogin={false} onToggle={handleToggle} />
    </>
  );
}
