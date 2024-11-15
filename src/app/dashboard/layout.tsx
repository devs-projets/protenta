"use client";

import { AppSidebar } from "@/components/app-sidebar";
import CurrentDate from "@/components/CurrentDate";
import Notifications from "@/components/notifications/Notifications";
import SocketControl from "@/components/SocketControl";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { SocketProvider } from "@/context/SocketContext";
import { SocketManager } from "@/context/SocketManager";
import { usePathname } from "next/navigation";
import { Toaster } from "@/components/ui/sonner"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SocketProvider>
      <SocketManager>
        <SidebarProvider
          style={
            {
              "--sidebar-width": "19rem",
            } as React.CSSProperties
          }
        >
          <AppSidebar />
          <Toaster />
          <SidebarInset className="h-screen">
            <header className="flex items-center justify-between gap-2 p-4 sticky top-0 bg-white z-10">
              <div className="flex items-center">
                <SidebarTrigger className="-ml-1" />
                <Separator orientation="vertical" className="mr-2 h-4" />
                <Breadcrumb>
                  <BreadcrumbList>
                    <BreadcrumbItem className="hidden md:flex">
                      <BreadcrumbLink href="#">Header</BreadcrumbLink>
                    </BreadcrumbItem>
                  </BreadcrumbList>
                </Breadcrumb>
              </div>
              <div className="flex items-center space-x-4">
                <SocketControl />
                <CurrentDate />
                <Notifications />
              </div>
            </header>
            <div className="flex-1" style={{ maxHeight: "calc(100vh - 4rem)" }}>
              {children}
            </div>
          </SidebarInset>
        </SidebarProvider>
      </SocketManager>
    </SocketProvider>
  );
}
