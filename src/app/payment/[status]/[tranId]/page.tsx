'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { paymentService } from '@/services/payment.service';

import { CertificatePreview } from '@/components/certificate/preview';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

import { NoRedirectWrapper } from '@/components/auth/no-redirect-wrapper';

export default function PaymentStatus() {
  const params = useParams();
  const router = useRouter();
  const { toast } = useToast();
  const [paymentStatus, setPaymentStatus] = useState<any>(null);
  const [isDownloading, setIsDownloading] = useState(false);
  const [hasDownloaded, setHasDownloaded] = useState(false);

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
  }, [params.tranId, toast]);
  const downloadCertificate = async () => {
    try {
      setIsDownloading(true);
      
      // First check payment status again to ensure it's still valid
      const currentStatus = await paymentService.getPaymentStatus(params.tranId as string);
      if (currentStatus.status !== 'success') {
        throw new Error('Payment verification failed');
      }      const response = await fetch(`/api/certificate/download?tranId=${params.tranId}`, {
        method: 'GET',
        headers: {
          'Accept': 'application/pdf',
        },
      });
      
      if (!response.ok) {
        const contentType = response.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Failed to download certificate');
        }
        throw new Error(`Failed to download certificate: ${response.status} ${response.statusText}`);
      }
      
      // Get the content type
      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/pdf')) {
        console.error('Invalid content type:', contentType);
        throw new Error('Invalid certificate format received');
      }
      
      // Create blob from response
      const blob = await response.blob();

      // Create download link
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `IELTS-Certificate-${params.tranId}.pdf`;
      document.body.appendChild(a);
      
      // Trigger download
      a.click();
      
      // Cleanup
      setTimeout(() => {
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
      }, 100);

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
