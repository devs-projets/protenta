"use client";

import { AppSidebar } from "@/components/app-sidebar";
import CurrentDate from "@/components/CurrentDate";
import Notifications from "@/components/notifications/Notifications";
import SocketControl from "@/components/SocketControl";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { SocketProvider } from "@/context/SocketContext";
import { SocketManager } from "@/context/SocketManager";
import { Toaster } from "@/components/ui/sonner";
import { Provider } from "react-redux";
import store from "@/store/store";
import SensorDataProvider from "@/context/SensorDataProvider";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Provider store={store}>
      <SocketProvider>
        <SocketManager>
          <SensorDataProvider>
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
                <header className="flex items-center justify-between gap-2 p-4 sticky top-0 bg-white z-100">
                  <div className="flex items-center">
                    <SidebarTrigger className="-ml-1" />
                    <Separator orientation="vertical" className="mr-2 h-4" />
                  </div>
                  <div className="flex items-center space-x-4">
                    <SocketControl />
                    <CurrentDate />
                    <Notifications />
                  </div>
                </header>
                <div
                  className="flex-1"
                  style={{ maxHeight: "calc(100vh - 4rem)" }}
                >
                  {children}
                </div>
              </SidebarInset>
            </SidebarProvider>
          </SensorDataProvider>
        </SocketManager>
      </SocketProvider>
    </Provider>
  );
}
