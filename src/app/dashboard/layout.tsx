"use client";

import { AppSidebar } from "@/components/layoutComposants/app-sidebar";
import CurrentDate from "@/components/layoutComposants/CurrentDate";
import Notifications from "@/components/notifications/Notifications";
import SocketControl from "@/components/layoutComposants/SocketControl";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { SocketProvider } from "@/context/SocketContext";
import { SocketManager } from "@/context/SocketManager";
import { Toaster } from "@/components/ui/sonner";
import SensorDataProvider from "@/context/SensorDataProvider";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { EUserRole } from "@/types/userRole";
import { ICulture } from "@/types/culture";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [activeCulture, setActiveCulture] = useState<ICulture | null>(null);
  const {
    user,
    loading: userLoading,
    access_token,
  } = useSelector((state: RootState) => state.auth);
  const router = useRouter();

  useEffect(() => {
    if (!access_token) {
      router.push("/login");
    }

    const thisSerreAactiveCulture = user?.allSerre[0].allCulture.filter(
      (c) => !c.productionIsEnded
    )[0];

    if (thisSerreAactiveCulture) setActiveCulture(thisSerreAactiveCulture);

    if (
      !userLoading &&
      user &&
      user.role === EUserRole.SUDO &&
      user.allSerre &&
      user.allSerre.length > 0 &&
      user.allSerre[0].allCulture &&
      user.allSerre[0].allCulture.length === 0
    ) {
      router.push("/culture-config");
    } else if (
      thisSerreAactiveCulture &&
      !thisSerreAactiveCulture?.initialConfigId
    ) {
      router.push("/dashboard/cultures");
    }
  }, [userLoading]);

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
            <Toaster />
            <SidebarInset className="h-screen">
              <header className="flex items-center justify-between gap-2 p-4 sticky top-0 bg-white z-100">
                <div className="flex items-center">
                  <SidebarTrigger className="-ml-1" />
                  <Separator orientation="vertical" className="mr-2 h-4" />
                  <div>
                    <p>
                      Serre : {user?.allSerre[0].name} | Culture :{" "}
                      {activeCulture?.name}
                    </p>
                  </div>
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
  );
}
