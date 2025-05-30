import { NextResponse } from 'next/server';
import { paymentService } from '@/services/payment.service';

export async function POST(request: Request) {
  try {
    const payment = await request.json();
    const { url } = await paymentService.createPayment(payment);
    return NextResponse.json({ url });
  } catch (error) {
    console.error('Payment initialization error:', error);
    return NextResponse.json(
      { error: 'Payment initialization failed' },
      { status: 500 }
    );
  }
}
