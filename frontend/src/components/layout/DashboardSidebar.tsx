import { BarChart3, Users, MessageSquare, Settings, Home } from 'lucide-react';
import { NavLink, useLocation } from 'react-router-dom';
import Ally from '../../../public/Ally.png'
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
} from '@/components/ui/sidebar';

const menuItems = [
  { title: 'Dashboard', url: '/', icon: Home },
  // { title: 'Leads', url: '/leads', icon: Users },
  // { title: 'Analytics', url: '/analytics', icon: BarChart3 },
  // { title: 'Conversations', url: '/conversations', icon: MessageSquare },
  // { title: 'Settings', url: '/settings', icon: Settings },
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
        <div className="p-4 border-b border-border">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2">
              <img src={Ally} alt="ally-logo" className="w-8 h-8 object-contain" />
              {!isCollapsed && (
                <div>
                  <h2 className="text-sm font-semibold">Ally Solutions</h2>
                  <p className="text-xs text-muted-foreground">Ally Agent Analytics</p>
                </div>
              )}
            </div>


          </div>
        </div>

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