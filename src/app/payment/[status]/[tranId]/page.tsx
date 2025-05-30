'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { paymentService } from '@/services/payment.service';

export default function PaymentStatus() {
  const params = useParams();
  const [paymentStatus, setPaymentStatus] = useState<any>(null);

  useEffect(() => {
    const checkStatus = async () => {
      if (params.tranId) {
        const status = await paymentService.getPaymentStatus(params.tranId as string);
        setPaymentStatus(status);
      }
    };
    checkStatus();
  }, [params.tranId]);

  if (!paymentStatus) return <div>Loading...</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">
        Payment {paymentStatus.status === 'success' ? 'Successful' : 'Failed'}
      </h1>
      <div>
        <p>Transaction ID: {paymentStatus.transactionId}</p>
        <p>Amount: {paymentStatus.amount}</p>
        <p>Status: {paymentStatus.status}</p>
      </div>
    </div>
  );
}
