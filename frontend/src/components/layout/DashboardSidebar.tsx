import { useEffect, useState } from "react";
import { Home, LogOut, Star, User,ChevronsUpDown } from "lucide-react";
import { ChevronUp, ChevronDown } from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";
import Ally from "../../../public/Ally.png";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
  SidebarTrigger,
} from "@/components/ui/sidebar";


import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

import { FiLock } from "react-icons/fi";
import { supabase } from "../../../supabaseClient"; // adjust path if needed

const menuItems = [{ title: "Dashboard", url: "/", icon: Home }];

export function DashboardSidebar() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { state } = useSidebar();
  const location = useLocation();
  const [userEmail, setUserEmail] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user) {
        setUserEmail(user.email ?? null);
      }
    };
    fetchUser();
  }, []);

  const isActive = (path: string) => {
    if (path === "/") return location.pathname === "/";
    return location.pathname.startsWith(path);
  };

  const isCollapsed = state === "collapsed";

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.href = "/auth"; // redirect to login
  };

  return (
    <Sidebar className={isCollapsed ? "w-14" : "w-64"} collapsible="icon">
      <SidebarContent>
        {/* Logo + Collapse Button Row */}
        <div className="p-4 border-b border-border flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img src={Ally} alt="ally-logo" className="w-8 h-8 object-contain" />
            {!isCollapsed && (
              <div>
                <h2 className="text-sm font-semibold">Ally Solutions</h2>
                <p className="text-xs text-muted-foreground">
                  Ally Agent Analytics
                </p>
              </div>
            )}
          </div>
          <SidebarTrigger />
        </div>

        {/* Workspace Select */}
        {!isCollapsed && (
          <div className="p-4 border-b border-border">
            <Select defaultValue="uchiha-vivek">
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Workspace" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="uchiha-vivek" disabled>
                  <div className="flex items-center gap-2 opacity-50 cursor-not-allowed">
                    <span>AllyChat</span>
                    <FiLock className="text-muted-foreground" />
                  </div>
                </SelectItem>
                <SelectItem value="ally-admin" disabled>
                  <div className="flex items-center gap-2 opacity-50 cursor-not-allowed">
                    <span>AllyVoice</span>
                    <FiLock className="text-muted-foreground" />
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        )}

        {/* Navigation */}
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    className={
                      isActive(item.url)
                        ? "bg-accent text-accent-foreground font-medium"
                        : "hover:bg-accent/50"
                    }
                  >
                    <NavLink to={item.url} end={item.url === "/"}>
                      <item.icon className="h-4 w-4" />
                      {!isCollapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* ✅ User dropdown at bottom, opens upwards */}
        {!isCollapsed && (
  <div className="mt-auto p-4 border-t border-border">
    <DropdownMenu onOpenChange={setOpen => setDropdownOpen(setOpen)}>
      <DropdownMenuTrigger className="w-full flex items-center justify-between px-2 py-2 rounded-md border border-border hover:bg-accent/50 text-sm">
        <div className="flex items-center gap-2 truncate">
          <User className="h-4 w-4 text-muted-foreground" />
          <span className="truncate">{userEmail ?? "Not signed in"}</span>
        </div>
        {dropdownOpen ? (
          <ChevronsUpDown className="h-4 w-4 text-muted-foreground" />
        ) : (
          <ChevronsUpDown className="h-4 w-4 text-muted-foreground" />
        )}
      </DropdownMenuTrigger>

      <DropdownMenuContent
        side="top" // 👈 opens upwards
        align="start"
        className="w-[var(--radix-dropdown-menu-trigger-width)]"
      >
        <DropdownMenuItem className="flex items-center gap-2">
          <User className="h-4 w-4" />
          Profile
        </DropdownMenuItem>
        <DropdownMenuItem className="flex items-center gap-2">
          <Star className="h-4 w-4" />
          Upgrade Plan
        </DropdownMenuItem>
        <DropdownMenuItem
          className="flex items-center gap-2 text-red-600"
          onClick={handleLogout}
        >
          <LogOut className="h-4 w-4" />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  </div>
)}
      </SidebarContent>
    </Sidebar>
  );
}
