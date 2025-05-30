import { useState } from 'react';
import { paymentService } from '@/services/payment.service';

export const usePayment = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const processPayment = async (paymentInfo: Parameters<typeof paymentService.createPayment>[0]) => {
    try {
      setLoading(true);
      setError(null);
      const response = await paymentService.createPayment(paymentInfo);
      if (response.url) {
        window.location.href = response.url;
      }
    } catch (err) {
      setError('Payment processing failed');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return { processPayment, loading, error };
};
