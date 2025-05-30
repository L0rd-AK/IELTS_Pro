'use client';

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useEffect } from "react";
import { useParams } from "next/navigation";

export default function PaymentSuccessPage() {
  const params = useParams();
  const tranId = params?.tranId;

  useEffect(() => {
    // Automatically trigger certificate download
    const downloadCertificate = async () => {
      try {
        if (!tranId) throw new Error('No transaction ID found');
        
        const response = await fetch(`/api/certificate/download?tranId=${tranId}`);
        if (!response.ok) {
          throw new Error('Failed to download certificate');
        }
        
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'ielts-certificate.pdf';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
      } catch (error) {
        console.error('Certificate download failed:', error);
      }
    };

    // Start download after a short delay to ensure payment is processed
    const timeoutId = setTimeout(downloadCertificate, 2000);
    return () => clearTimeout(timeoutId);
  }, [tranId]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center space-y-4">
        <h1 className="text-2xl font-bold text-green-600">Payment Successful!</h1>
        <p className="text-gray-600">Your certificate is being downloaded automatically.</p>
        <div className="space-x-4">
          <Button asChild>
            <Link href="/dashboard">Back to Dashboard</Link>
          </Button>
          <Button 
            variant="outline" 
            onClick={() => window.location.href = `/api/certificate/download?tranId=${tranId}`}
          >
            Download Again
          </Button>
        </div>
      </div>
    </div>
  );
}
