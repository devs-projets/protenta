import React, { useState } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Divider from "@mui/material/Divider";
import { BellRing, X } from "lucide-react";
import { useNotifications } from "@/hooks/useNotifications";
import NotificationList from "./NotificationsList";

const Notifications = () => {
  const [open, setOpen] = useState(false);
  const { notifications, loadMore, isLoading, hasMore } = useNotifications();

  const toggleDrawer = (open: boolean) => () => {
    setOpen(open);
  };

  return (
    <div>
      <button
        onClick={toggleDrawer(true)}
        className="flex aspect-square size-8 items-center justify-center rounded-lg bg-primary text-sidebar-primary-foreground"
      >
        <BellRing />
      </button>
      <Drawer anchor="right" open={open} onClose={toggleDrawer(false)}>
        <Box sx={{ width: 400 }} role="presentation">
          <div className="relative">
            <div className="sticky top-0 z-10 bg-white px-5 py-4 shadow-lg">
              <div className="flex items-center justify-between">
                <h2 className="text-center font-bold text-3xl my-4">
                  Notifications
                </h2>
                <X
                  size={30}
                  className="mt-2 cursor-pointer"
                  onClick={toggleDrawer(false)}
                />
              </div>
            </div>
            <Divider />
            <NotificationList
              notifications={notifications}
              loadMore={loadMore}
              isLoading={isLoading}
              hasMore={hasMore}
            />
          </div>
        </Box>
      </Drawer>
    </div>
  );
};

export default Notifications;
