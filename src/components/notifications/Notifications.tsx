import React, { useEffect, useRef, useState } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Divider from "@mui/material/Divider";
import {
  BellRing,
  DoorOpen,
  FlaskConical,
  Spline,
  SquareActivity,
  Volume2,
  X,
} from "lucide-react";
import { useNotifications } from "@/hooks/useNotifications";
import NotificationList from "./NotificationsList";
import { useSocket } from "@/context/SocketContext";
import { toast } from "sonner";
import useSound from "use-sound";

import alertSoundFile from "@/assets/audio/alertSound.mp3";

const Notifications = () => {
  const [open, setOpen] = useState(false);
  const { notifications, loadMore, isLoading, hasMore, reset } = useNotifications(open);
  const { sensorNotification, sensorData } = useSocket();

  const notificationQueue = useRef<Array<any>>([]);
  const [isDisplaying, setIsDisplaying] = useState(false);
  const [play] = useSound(alertSoundFile);

  useEffect(() => {
    if (sensorNotification && !open) {
      notificationQueue.current.push(sensorNotification);
      if (!isDisplaying) {
        displayNextNotification();
      }
    }
  }, [sensorNotification, sensorData, open]);

  useEffect(() => {
    if (open) {
      notificationQueue.current = [];
      setIsDisplaying(false);
      reset();
    } else {
      if (notificationQueue.current.length > 0 && !isDisplaying) {
        displayNextNotification();
      }
    }
  }, [open]);

  const displayNextNotification = () => {
    if (notificationQueue.current.length === 0) {
      setIsDisplaying(false);
      return;
    }

    setIsDisplaying(true);
    const nextNotification = notificationQueue.current.shift();

    if (nextNotification) {
      toast(nextNotification.type, {
        description: nextNotification.value,
        action: {
          label: (
            <div>
              {nextNotification.type === "Moniteur" && (
                <SquareActivity className="mr-2" />
              )}
              {nextNotification.type === "SAS" && <DoorOpen className="mr-2" />}
              {nextNotification.type === "Chateau" && (
                <FlaskConical className="mr-2" />
              )}
              {nextNotification.type === "Bipeure" && (
                <Volume2 className="mr-2" />
              )}
              {nextNotification.type === "Ombriere" && (
                <Spline className="mr-2" />
              )}
              {nextNotification.type}
            </div>
          ),
          onClick: () => console.log("Action clicked"),
        },
      });

      play();
    }

    setTimeout(() => {
      displayNextNotification();
    }, 2000);
  };

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
