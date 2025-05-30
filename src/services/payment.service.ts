interface PaymentInfo {
  amount: number;
  packageName: string;
  name: string;
  email: string;
  address?: string;
  phone?: string;
}

export const paymentService = {
  createPayment: async (paymentInfo: PaymentInfo) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/create-payment`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(paymentInfo),
    });
    return res.json();
  },

  getPaymentStatus: async (transactionId: string) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/payment/${transactionId}`);
    return res.json();
  },
};
