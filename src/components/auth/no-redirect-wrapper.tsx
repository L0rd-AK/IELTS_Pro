import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/auth-context';

interface NoRedirectWrapperProps {
  children: React.ReactNode;
}

export function NoRedirectWrapper({ children }: NoRedirectWrapperProps) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [shouldShow, setShouldShow] = useState(false);

  const currentPath = typeof window !== 'undefined' ? window.location.pathname : '';
  const isPaymentPage =
    currentPath.includes('/payment/success/') || currentPath.includes('/payment/failed/');

  useEffect(() => {
    // Show content immediately for payment pages
    if (isPaymentPage) {
      setShouldShow(true);
      return;
    }

    // For other pages, check auth
    if (!loading) {
      if (user) {
        setShouldShow(true);
      } else {
        router.push('/login');
      }
    }
  }, [loading, user, router, isPaymentPage]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  // Show content if shouldShow is true
  return shouldShow ? <>{children}</> : null;
}
