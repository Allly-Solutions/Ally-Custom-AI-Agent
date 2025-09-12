// DashboardSidebar.tsx
import { BarChart3, Users, MessageSquare, Settings, Home } from 'lucide-react';
import { NavLink, useLocation } from 'react-router-dom';
import Ally from '../../../public/Ally.png';
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
} from '@/components/ui/sidebar';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'; // ✅ using shadcn/ui Select

const menuItems = [
  { title: 'Dashboard', url: '/', icon: Home },
];

export function DashboardSidebar() {
  const { state } = useSidebar();
  const location = useLocation();

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  const isCollapsed = state === 'collapsed';

  return (
    <Sidebar className={isCollapsed ? 'w-14' : 'w-64'} collapsible="icon">
      <SidebarContent>
        {/* Logo + Collapse Button Row */}
        <div className="p-4 border-b border-border flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img src={Ally} alt="ally-logo" className="w-8 h-8 object-contain" />
            {!isCollapsed && (
              <div>
                <h2 className="text-sm font-semibold">Ally Solutions</h2>
                <p className="text-xs text-muted-foreground">Ally Agent Analytics</p>
              </div>
            )}
          </div>
          <SidebarTrigger />
        </div>

        {/* ✅ Dropdown right below logo */}
        {!isCollapsed && (
          <div className="p-4 border-b border-border">
            <Select defaultValue="uchiha-vivek">
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Workspace" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="uchiha-vivek">uchiha-vivek</SelectItem>
                <SelectItem value="ally-admin">ally-admin</SelectItem>
                <SelectItem value="marketing">marketing</SelectItem>
              </SelectContent>
            </Select>
          </div>
        )}

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
                        ? 'bg-accent text-accent-foreground font-medium'
                        : 'hover:bg-accent/50'
                    }
                  >
                    <NavLink to={item.url} end={item.url === '/'}>
                      <item.icon className="h-4 w-4" />
                      {!isCollapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
