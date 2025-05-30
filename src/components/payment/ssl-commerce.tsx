'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';

interface PaymentProps {
  amount: number;
  onSuccess?: () => void;
  onError?: (error: string) => void;
}

export function SSLCommercePayment({ amount, onError }: PaymentProps) {
  const [loading, setLoading] = useState(false);
  const handlePayment = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/payment/init', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount,
          packageName: 'IELTS Test Package',
          name: 'User', // TODO: Get from auth context
          email: 'user@example.com', // TODO: Get from auth context
        }),
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Payment initialization failed');
      }
      
      // Validate the gateway URL
      if (data.url && data.url.startsWith('https://sandbox.sslcommerz.com/')) {
        window.location.href = data.url;
      } else {
        console.error('Invalid URL received:', data.url);
        throw new Error('Invalid payment gateway URL received');
      }
    } catch (error) {
      console.error('Payment error:', error);
      toast({
        variant: "destructive",
        title: "Payment Error",
        description: error instanceof Error ? error.message : 'Payment initialization failed',
      });
      onError?.(error instanceof Error ? error.message : 'Payment initialization failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button onClick={handlePayment} disabled={loading}>
      {loading ? 'Processing...' : 'Pay Now'}
    </Button>
  );
}
