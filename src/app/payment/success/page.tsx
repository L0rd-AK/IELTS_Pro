import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function PaymentSuccessPage() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center space-y-4">
        <h1 className="text-2xl font-bold text-green-600">Payment Successful!</h1>
        <p className="text-gray-600">Your certificate is ready for download.</p>
        <div className="space-x-4">
          <Button asChild>
            <Link href="/dashboard">Back to Dashboard</Link>
          </Button>
          <Button variant="outline">
            <Link href="/certificate/download">Download Certificate</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
