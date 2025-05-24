import type { ReactNode } from "react";
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarInset,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Logo } from "@/components/icons/logo";
import { SidebarNav } from "./sidebar-nav";
import { UserAvatar } from "@/components/user-avatar";
import { ThemeToggle } from "@/components/theme-toggle"; 

interface AppLayoutProps {
  children: ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  return (
    <SidebarProvider defaultOpen={true}>
      <Sidebar collapsible="icon" variant="sidebar" side="left">
        <SidebarHeader className="p-4 border-b border-sidebar-border">
          <div className="flex items-center justify-between">
            <Logo />
            {/* This trigger is for mobile, but sidebar logic handles its own trigger on mobile */}
            {/* <div className="md:hidden"> 
              <SidebarTrigger />
            </div> */}
          </div>
        </SidebarHeader>
        <SidebarContent className="p-0">
          <SidebarNav />
        </SidebarContent>
        <SidebarFooter className="p-4 border-t border-sidebar-border">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <UserAvatar name="Teen User" />
              <div className="group-data-[collapsible=icon]:hidden">
                <p className="text-sm font-medium text-sidebar-foreground">Teen User</p>
                <p className="text-xs text-muted-foreground">user@example.com</p>
              </div>
            </div>
            <div className="group-data-[collapsible=icon]:hidden">
             <ThemeToggle />
            </div>
          </div>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset className="flex flex-col">
        <header className="sticky top-0 z-10 flex items-center justify-between h-16 px-4 bg-background/80 backdrop-blur-sm border-b md:px-6">
          <div className="md:hidden"> {/* Show trigger only on mobile */}
            <SidebarTrigger />
          </div>
          <div className="hidden md:block text-lg font-semibold">
             {/* Placeholder for breadcrumbs or page title e.g. "Dashboard" */}
          </div>
          <div className="ml-auto md:hidden"> {/* Theme toggle for mobile header */}
            <ThemeToggle />
          </div>
        </header>
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
