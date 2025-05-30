import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const data = await request.formData();
    const tranId = data.get('tran_id');

    if (!tranId) {
      throw new Error('Transaction ID not found');
    }

    // Redirect to failed page with transaction ID
    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_APP_URL}/payment/failed/${tranId}`);
  } catch (error) {
    console.error('Payment failed error:', error);
    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_APP_URL}/payment/failed`);
  }
}
