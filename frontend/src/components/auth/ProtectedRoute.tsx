// components/auth/ProtectedRoute.tsx
import { Navigate, Outlet } from "react-router-dom";
import { useSession, useSessionContext } from "@supabase/auth-helpers-react";

export default function ProtectedRoute() {
  const session = useSession();
  const { isLoading } = useSessionContext();

  // While Supabase is checking session, don't redirect yet
  if (isLoading) {
    return <p>Loading...</p>; // or a spinner component
  }

  if (!session) {
    return <Navigate to="/auth" replace />;
  }

  return <Outlet />;
}
