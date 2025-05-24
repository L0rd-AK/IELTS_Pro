'use client';

import { UserDashboard } from "./user-dashboard"
import { AdminDashboard } from "./admin-dashboard";
import { ProtectedRoute } from "@/components/auth/protected-route";
import { useEffect, useState } from "react";
import { useAuth } from '@/contexts/auth-context';
import { Loader2 } from "lucide-react";

export default function Dashboard() {
  const { user } = useAuth();
  const [isAdmin, setAdmin] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const checkAdminStatus = async () => {
      if (!user?.email) return;

      try {
        setLoading(true);
        const response = await fetch(`http://localhost:5000/users/admin/${user?.email}`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch admin status');
        }

        const data = await response.json();
        console.log(data);
        setAdmin(data?.isAdmin);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    checkAdminStatus();
  }, [user]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen text-red-500">
        {error}
      </div>
    );
  }

  return (
    <ProtectedRoute>
      {isAdmin ? <AdminDashboard /> : <UserDashboard />}
    </ProtectedRoute>
  );
}