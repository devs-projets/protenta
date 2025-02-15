"use client";

import { AppSidebar } from "@/components/layoutComposants/app-sidebar";
import CurrentDate from "@/components/layoutComposants/CurrentDate";
import Notifications from "@/components/notifications/Notifications";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { SocketProvider } from "@/context/SocketContext";
import { SocketManager } from "@/context/SocketManager";
import SensorDataProvider from "@/context/SensorDataProvider";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { EUserRole } from "@/types/userRole";
import NoActiveCultureAlert from "@/components/NoActiveCultureAlert";
import { SerresComboBox } from "@/components/serre/Combobox";
import { CultureComboBox } from "@/components/cultures/Combobox";
import { useAuth } from "@/context/AuthProvider";
import MonitorControl from "@/components/layoutComposants/MinotorControl";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, access_token, loading: userLoading } = useAuth();
  const {
    activeCulture,
    allCulture,
    loading: serreLoading,
  } = useSelector((state: RootState) => state.serre);
  const router = useRouter();

  useEffect(() => {
    if (!access_token && !userLoading) {
      router.push("/auth");
    }

    if (
      !userLoading &&
      !serreLoading &&
      user &&
      allCulture &&
      user.role === EUserRole.SUDO &&
      allCulture.length === 0
    ) {
      router.push("/culture-config");
    } else if (activeCulture && !activeCulture.initialConfigId) {
      router.push("/dashboard/cultures");
    }
  }, [userLoading, serreLoading]);

  return (
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
            {/* <Toaster /> */}
            <SidebarInset className="h-screen">
              <header className="flex items-center justify-between gap-2 p-4 sticky top-0 bg-white z-100">
                <div className="flex items-center gap-3">
                  <SidebarTrigger className="-ml-1" />
                  <Separator orientation="vertical" className="mr-2 h-4" />
                  <div className="hidden md:flex items-center gap-3">
                    <p className="hidden lg:block font-bold">Serre</p>
                    <SerresComboBox />
                  </div>
                  <div className="hidden md:flex items-center gap-3">
                    <p className="hidden lg:block font-bold">Culture</p>
                    <CultureComboBox />
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <MonitorControl />
                  <CurrentDate />
                  <Notifications />
                </div>
              </header>
              <div
                className="flex-1 overflow-auto"
                style={{ maxHeight: "calc(100vh - 4rem)" }}
              >
                <div className="sticky top-0">
                  <NoActiveCultureAlert />
                </div>
                {children}
              </div>
            </SidebarInset>
          </SidebarProvider>
        </SensorDataProvider>
      </SocketManager>
    </SocketProvider>
  );
}
