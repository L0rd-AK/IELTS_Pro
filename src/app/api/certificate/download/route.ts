import { NextResponse } from 'next/server';
import { headers } from 'next/headers';

export async function GET(request: Request) {
  try {
    const headersList = headers();
    // Verify payment status before allowing download
    // This should be replaced with your actual payment verification logic
    const isPaid = true; // Replace with actual verification

    if (!isPaid) {
      return NextResponse.json(
        { error: 'Payment required' },
        { status: 402 }
      );
    }

    // Generate or fetch certificate
    // This is where you'd implement your certificate generation logic
    const certificateBuffer = Buffer.from('Certificate content');

    return new NextResponse(certificateBuffer, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename="ielts-certificate.pdf"',
      },
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Certificate generation failed' },
      { status: 500 }
    );
  }
}
