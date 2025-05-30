import { NextResponse } from 'next/server';
import PDFDocument from 'pdfkit';
import { paymentService } from '@/services/payment.service';

export async function GET(request: Request) {
  try {
    // Get transaction ID from the URL
    const url = new URL(request.url);
    const tranId = url.searchParams.get('tranId');

    if (!tranId) {
      return NextResponse.json(
        { error: 'Transaction ID is required' },
        { status: 400 }
      );
    }

    // Verify payment status
    const payment = await paymentService.getPaymentStatus(tranId);
    if (!payment || payment.status !== 'success') {
      return NextResponse.json(
        { error: 'Payment verification failed' },
        { status: 402 }
      );
    }

    // Create a new PDF document
    const doc = new PDFDocument({
      size: 'A4',
      layout: 'landscape',
      margin: 50,
      info: {
        Title: 'IELTS Certificate',
        Author: 'IELTS Pro',
        Subject: 'IELTS Achievement Certificate',
      }
    });    // Create array to collect PDF chunks
    const chunks: Buffer[] = [];

    // Add certificate content
    doc.font('Helvetica-Bold')
       .fontSize(36)
       .text('IELTS Certificate of Achievement', {
         align: 'center'
       });

    doc.moveDown(2);
    doc.font('Helvetica')
       .fontSize(16)
       .text('This is to certify that', {
         align: 'center'
       });

    doc.moveDown();
    doc.font('Helvetica-Bold')
       .fontSize(24)
       .text(payment.name || 'Student Name', {
         align: 'center'
       });

    doc.moveDown();
    doc.font('Helvetica')
       .fontSize(16)
       .text('has successfully completed the IELTS preparation course', {
         align: 'center'
       });

    doc.moveDown();
    doc.font('Helvetica-Bold')
       .fontSize(20)
       .text(`Overall Band Score: ${payment.score || '7.0'}`, {
         align: 'center'
       });

    doc.moveDown(2);
    doc.fontSize(12)
       .text(`Certificate ID: ${tranId}`, {
         align: 'center'
       });

    doc.moveDown();
    doc.text(`Issue Date: ${new Date().toLocaleDateString()}`, {
       align: 'center'    });

    // Set up PDF stream handling
    doc.on('data', (chunk) => chunks.push(Buffer.from(chunk)));

    return new Promise((resolve, reject) => {

      // Handle successful PDF generation
      doc.on('end', () => {
        const pdfBuffer = Buffer.concat(chunks);
        resolve(new NextResponse(pdfBuffer, {
          headers: {
            'Content-Type': 'application/pdf',
            'Content-Disposition': `attachment; filename="IELTS-Certificate-${tranId}.pdf"`,
            'Cache-Control': 'no-store'
          }
        }));
      });

      // Handle errors in PDF generation
      doc.on('error', (err) => {
        console.error('PDF generation error:', err);
        reject(new Error('Failed to generate PDF'));
      });

      // End the document to trigger generation
      doc.end();
    }).catch(error => {
      console.error('Certificate generation error:', error);
      return NextResponse.json(
        { error: 'Certificate generation failed' },
        { status: 500 }
      );
    });
  } catch (error) {
    console.error('Certificate request error:', error);
    return NextResponse.json(
      { error: 'Failed to process certificate request' },
      { status: 500 }
    );
  }
}
