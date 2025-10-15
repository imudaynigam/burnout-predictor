import { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
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
import { Button } from '@/components/ui/button';
import { 
  LayoutDashboard, 
  Users, 
  User, 
  TrendingUp, 
  LogOut,
  Brain
} from 'lucide-react';

const managerItems = [
  { title: 'Team Overview', url: '/dashboard', icon: LayoutDashboard },
  { title: 'Employee Details', url: '/employees', icon: Users },
  { title: 'Insights', url: '/insights', icon: TrendingUp },
];

const employeeItems = [
  { title: 'My Dashboard', url: '/dashboard', icon: User },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const { user, signOut } = useAuth();
  const location = useLocation();
  const currentPath = location.pathname;
  
  // Mock role - in real app, this would come from user metadata
  const userRole = user?.user_metadata?.role || 'employee';
  const isManager = userRole === 'manager';
  const items = isManager ? managerItems : employeeItems;

  const isActive = (path: string) => currentPath === path;
  const isExpanded = items.some((i) => isActive(i.url));
  const getNavCls = ({ isActive }: { isActive: boolean }) =>
    isActive ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium" : "hover:bg-sidebar-accent/50";

  return (
    <Sidebar
      className={state === "collapsed" ? "w-14" : "w-60"}
      collapsible="icon"
    >
      <SidebarContent>
        {/* Header */}
        <div className="p-4 border-b border-sidebar-border">
          <div className="flex items-center gap-2">
            <Brain className="h-6 w-6 text-sidebar-primary" />
            {state !== "collapsed" && (
              <div>
                <h2 className="font-semibold text-sidebar-foreground">Burnout Tracker</h2>
                <p className="text-xs text-sidebar-foreground/60 capitalize">{userRole}</p>
              </div>
            )}
          </div>
        </div>

        {/* Navigation */}
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink to={item.url} end className={getNavCls}>
                      <item.icon className="mr-2 h-4 w-4" />
                      {state !== "collapsed" && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* User Actions */}
        <div className="mt-auto p-4 border-t border-sidebar-border">
          <Button
            variant="ghost"
            size={state === "collapsed" ? "icon" : "default"}
            className="w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent"
            onClick={signOut}
          >
            <LogOut className="h-4 w-4" />
            {state !== "collapsed" && <span className="ml-2">Sign Out</span>}
          </Button>
        </div>
      </SidebarContent>
    </Sidebar>
  );
}