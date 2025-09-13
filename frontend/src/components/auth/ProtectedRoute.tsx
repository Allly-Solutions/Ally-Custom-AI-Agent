// components/auth/ProtectedRoute.tsx
import { Navigate, Outlet } from "react-router-dom";
import { useSession } from "@supabase/auth-helpers-react";

export default function ProtectedRoute() {
  const session = useSession();

  if (!session) {
    // Redirect unauthenticated users to auth page
    return <Navigate to="/auth" replace />;
  }

  return <Outlet />;
}
