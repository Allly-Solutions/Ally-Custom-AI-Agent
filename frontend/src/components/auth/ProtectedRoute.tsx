// components/auth/ProtectedRoute.tsx
import { Navigate, Outlet } from "react-router-dom";
import { useSessionContext } from "@supabase/auth-helpers-react";

export default function ProtectedRoute() {
  const { session, isLoading } = useSessionContext();

  if (isLoading) {
    return <div>Loading...</div>; // or a spinner
  }

  if (!session) {
    return <Navigate to="/auth" replace />;
  }

  return <Outlet />;
}
