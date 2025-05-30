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
        body: JSON.stringify({ amount }),
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Payment initialization failed');
      }
      
      if (data.url) {
        window.location.href = data.url;
      } else {
        throw new Error('Invalid payment URL');
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
