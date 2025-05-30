interface PaymentInfo {
  amount: number;
  packageName: string;
  name: string;
  email: string;
  address?: string;
  phone?: string;
}

export const paymentService = {  createPayment: async (paymentInfo: PaymentInfo) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/create-payment`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(paymentInfo),
    });
    
    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.message || 'Payment initialization failed');
    }
    
    const data = await res.json();
    if (!data.url) {
      throw new Error('No payment URL received from the server');
    }
    
    return data;
  },  getPaymentStatus: async (transactionId: string) => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/payment/${transactionId}`);
      if (!res.ok) {
        throw new Error('Failed to get payment status');
      }
      const data = await res.json();
      
      // Ensure we have valid payment data
      if (!data || !data.status) {
        throw new Error('Invalid payment data received');
      }
      
      return {
        ...data,
        status: data.status,
        transactionId: data.transactionId || transactionId,
        name: data.name || 'Student',
        score: data.score || '7.0',
        amount: data.amount || 0,
      };
    } catch (error) {
      console.error('Error fetching payment status:', error);
      throw error;
    }
  },

  updatePaymentStatus: async (transactionId: string, status: 'success' | 'failed') => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/payment/${transactionId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ status }),
    });
    if (!res.ok) {
      throw new Error('Failed to update payment status');
    }
    return res.json();
  }
};
