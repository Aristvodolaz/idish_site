'use client';

import { useEffect } from 'react';
import { useAuthStore } from '@/store/authStore';

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { checkAuth, initialized } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (!initialized) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🇮🇱</div>
          <div className="text-xl text-gray-600">Loading Ulpan AI...</div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
