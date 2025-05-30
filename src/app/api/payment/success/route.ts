import { NextResponse } from 'next/server';
import { paymentService } from '@/services/payment.service';

export async function POST(request: Request) {
  try {
    const data = await request.formData();
    const tranId = data.get('tran_id');

    if (!tranId) {
      throw new Error('Transaction ID not found');
    }

    // Update payment status in your database
    await paymentService.updatePaymentStatus(tranId.toString(), 'success');
      // Redirect to the success page with the transaction ID
    return NextResponse.redirect(
      `${process.env.NEXT_PUBLIC_APP_URL}/payment/success/${tranId}`,
      { status: 303 } // Using 303 for "See Other" redirect after POST
    );
  } catch (error) {
    console.error('Payment success error:', error);
    return NextResponse.json({ 
      success: false, 
      error: 'Payment processing failed' 
    }, { status: 500 });
  }
}
