// import { Outlet } from 'react-router-dom';
// import { SidebarProvider } from '@/components/ui/sidebar';
// import { DashboardSidebar } from './DashboardSidebar';
// import { DashboardHeader } from './DashboardHeader';

// export function DashboardLayout() {
//   return (
//     <SidebarProvider>
//       <div className="min-h-screen flex w-full bg-muted/30 p-4">
//         {/* Sidebar */}
//         <DashboardSidebar />

//         {/* Content Box */}
//         <div className="flex flex-col flex-1 ml-4 bg-card border border-border rounded-2xl shadow-sm overflow-hidden">
//           <DashboardHeader />
//           <main className="flex-1 p-6">
//             <Outlet />
//           </main>
//         </div>
//       </div>
//     </SidebarProvider>
//   );
// }



import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { SidebarProvider } from "@/components/ui/sidebar";
import { DashboardSidebar } from "./DashboardSidebar";
import { DashboardHeader } from "./DashboardHeader";
import { supabase } from "../../../supabaseClient"; // adjust path if needed

export function DashboardLayout() {
  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();

      if (error) {
        console.error("Error fetching user:", error.message);
      } else if (user) {
        // console.log("User Info:", {
        //   id: user.id,
        //   email: user.email,
        //   username:
        //     user.user_metadata?.full_name ||
        //     user.user_metadata?.name ||
        //     "(no username)",
        // });
      } else {
        console.log("No user logged in.");
      }
    };

    getUser();
  }, []);

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-muted/30 p-4">
        {/* Sidebar */}
        <DashboardSidebar />

        {/* Content Box */}
        <div className="flex flex-col flex-1 ml-4 bg-card border border-border rounded-2xl shadow-sm overflow-hidden">
          <DashboardHeader />
          <main className="flex-1 p-6">
            <Outlet />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
