'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { paymentService } from '@/services/payment.service';

import { CertificatePreview } from '@/components/certificate/preview';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/auth-context';
import { NoRedirectWrapper } from '@/components/auth/no-redirect-wrapper';

export default function PaymentStatus() {
  const params = useParams();
  const router = useRouter();
  const { toast } = useToast();
  const [paymentStatus, setPaymentStatus] = useState<any>(null);
  const [isDownloading, setIsDownloading] = useState(false);
  const [hasDownloaded, setHasDownloaded] = useState(false);
   const { user } = useAuth();
  // Effect for fetching payment status
  useEffect(() => {
    const checkStatus = async () => {
      if (params.tranId) {
        try {
          const status = await paymentService.getPaymentStatus(params.tranId as string);
          setPaymentStatus(status);
          if (status.status === 'success') {
            toast({
              title: "Payment Successful",
              description: "Your payment has been processed successfully. Please download your certificate.",
            });
          }
        } catch (error) {
          console.error('Error fetching payment status:', error);
          toast({
            variant: "destructive",
            title: "Error",
            description: "Failed to fetch payment status",
          });
        }
      }
    };
    checkStatus();
  }, [params.tranId, toast]);  const downloadCertificate = async () => {
    try {
      setIsDownloading(true);
      
      // Create PDF document using jsPDF
      const { jsPDF } = await import('jspdf');
      const doc = new jsPDF({
        orientation: 'landscape',
        unit: 'mm',
        format: 'a4'
      });      // Set font size and add content
      doc.setFontSize(36);
      doc.text('IELTS Certificate of Achievement', 148.5, 30, { align: 'center' });

      doc.setFontSize(16);
      doc.text('This is to certify that', 148.5, 50, { align: 'center' });

      doc.setFontSize(24);
      doc.text(user?.displayName || 'Student Name', 148.5, 70, { align: 'center' });

      doc.setFontSize(16);
      doc.text('has successfully completed the IELTS preparation course', 148.5, 90, { align: 'center' });

      doc.setFontSize(20);
      doc.text(`Overall Band Score: ${paymentStatus.score || '7.0'}`, 148.5, 110, { align: 'center' });

      doc.setFontSize(12);
      doc.text(`Certificate ID: DEMO-${Date.now()}`, 148.5, 140, { align: 'center' });
      doc.text(`Issue Date: ${new Date().toLocaleDateString()}`, 148.5, 150, { align: 'center' });      // Save the PDF
      doc.save('IELTS-Certificate.pdf');

      setHasDownloaded(true);
      toast({
        title: "Success",
        description: "Certificate downloaded successfully. You can now proceed to the dashboard.",
      });
    } catch (error) {
      console.error('Download error:', error);
      toast({
        variant: "destructive",
        title: "Download Failed",
        description: error instanceof Error ? error.message : "Failed to download certificate. Please try again.",
      });
    } finally {
      setIsDownloading(false);
    }
  };

  if (!paymentStatus) {
    return (
      <NoRedirectWrapper>
        <div className="container mx-auto p-4">
          <div className="max-w-4xl mx-auto text-center">
            <p>Loading payment status...</p>
          </div>
        </div>
      </NoRedirectWrapper>
    );
  }

  return (
    <NoRedirectWrapper>
      <div className="container mx-auto p-4">
        <div className="max-w-4xl mx-auto space-y-8">
          <Card className="p-6">
            <h1 className={`text-2xl font-bold mb-4 ${
              paymentStatus.status === 'success' ? 'text-green-600' : 'text-red-600'
            }`}>
              Payment {paymentStatus.status === 'success' ? 'Successful' : 'Failed'}
            </h1>
            <div className="space-y-2">
              <p><span className="font-semibold">Transaction ID:</span> {paymentStatus.transactionId}</p>
              <p><span className="font-semibold">Amount:</span> {paymentStatus.amount} BDT</p>
              <p><span className="font-semibold">Status:</span> {paymentStatus.status}</p>
            </div>
          </Card>

          {paymentStatus.status === 'success' && (
            <>
              <div className="text-center">
                <h2 className="text-xl font-semibold mb-4">Your IELTS Certificate</h2>
                <p className="text-gray-600 mb-6">
                  Here's a preview of your certificate. Please download it before proceeding to the dashboard.
                </p>
              </div>
              
              <div className="bg-white p-4 rounded-lg shadow-lg">
                <CertificatePreview 
                  name={paymentStatus.name || 'Student Name'} 
                  overallScore={paymentStatus.score || '7.0'} 
                />
              </div>

              <div className="flex flex-col items-center gap-4">
                <Button
                  size="lg"
                  onClick={downloadCertificate}
                  disabled={isDownloading}
                  className="gap-2"
                >
                  <Download size={20} />
                  {isDownloading ? 'Downloading...' : 'Download Certificate'}
                </Button>

                {hasDownloaded && (
                  <Button
                    variant="secondary"
                    onClick={() => router.push('/dashboard')}
                  >
                    Proceed to Dashboard
                  </Button>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </NoRedirectWrapper>
  );
}
