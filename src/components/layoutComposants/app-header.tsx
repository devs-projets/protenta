import React, { useEffect, useRef, useState } from "react";
import { SidebarTrigger, useSidebar } from "../ui/sidebar";
import { Separator } from "../ui/separator";
import MonitorControl from "./MinotorControl";
import CurrentDate from "./CurrentDate";
import Notifications from "../notifications/Notifications";
import { SerresComboBox } from "../serre/Combobox";
import { CultureComboBox } from "../cultures/Combobox";

const AppHeader = () => {
  const headerRef = useRef<HTMLHeadElement>(null);
  const [headerWidth, setHeaderWidth] = useState<number>(0);
  const [showCombox, setShowCombox] = useState<boolean>(true);
  const {open} = useSidebar();

  useEffect(() => {
    const updateWidth = () => {
      if (headerRef.current) {
        setHeaderWidth(headerRef.current.offsetWidth);
      }
    };

    const resizeObserver = new ResizeObserver(() => updateWidth());
    if (headerRef.current) {
      resizeObserver.observe(headerRef.current);
      updateWidth();
    }

    return () => resizeObserver.disconnect();
  }, []);
  
  useEffect(() => {
    if (headerWidth >= 450 && headerWidth <= 1000 && open) {
        setShowCombox(false);
    } else {
        setShowCombox(true);
    }
  }, [headerWidth])

  return (
    <header
      ref={headerRef}
      className="flex items-center justify-between gap-2 p-4 sticky top-0 bg-white z-100"
    >
      <div className="flex items-center gap-3 overflow-hidden">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 h-4" />
        {showCombox && (
          <>
            <div className="hidden md:flex items-center gap-3">
              <p className="hidden lg:block font-bold">Serre</p>
              <SerresComboBox />
            </div>
            <div className="hidden md:flex items-center gap-3">
              <p className="hidden lg:block font-bold">Culture</p>
              <CultureComboBox />
            </div>
          </>
        )}
      </div>
      <div className="flex items-center space-x-4">
        <MonitorControl />
        <CurrentDate />
        <Notifications />
      </div>
    </header>
  );
};

export default AppHeader;
