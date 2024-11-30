import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import { BellRing, X } from "lucide-react";
import { toast } from "sonner";
import {
  Info,
  SquareActivity,
  FlaskConical,
  Spline,
  DoorOpen,
  Volume2,
} from "lucide-react";
import { useSocket } from "@/context/SocketContext";
import { INotification } from "@/types/notification";
import { getNotifications } from "@/lib/fetchData/getNotifications";

export default function Notifications() {
  const [open, setOpen] = useState(false);
  const [notifications, setNotifications] = useState<INotification[]>([]);

  const { sensorNotification } = useSocket();

  // Fonction pour déclencher l'ouverture/fermeture du Drawer
  const toggleDrawer = (open: boolean) => () => {
    setOpen(open);
  };

  // Fonction pour simuler l'ajout de notifications toutes les 3 secondes
  useEffect(() => {
    // const fetchNotif = async () => {
    //   try {
    //     const data = await getNotifications(2, 50);
    //     console.log(data);
    //   } catch (error) {
    //     console.error("An error occurred while fetching sensor data:", error);
    //   }
    // };
    // fetchNotif();
    if (sensorNotification) {
      setNotifications((prevNotifications) => {
        const newNotification = sensorNotification;

        // Vérifie si une notification du même type existe déjà
        const existingNotification = prevNotifications.find(
          (notification) => notification.type === newNotification.type
        );

        // Conditions pour ajouter la notification
        const shouldAddNotification =
          !existingNotification ||
          existingNotification.value !== newNotification.value;

        if (shouldAddNotification) {
          const updatedNotifications = [
            newNotification,
            ...prevNotifications.filter(
              (notification) => notification.type !== newNotification.type // Supprime les anciennes du même type
            ),
          ];

          // Si le drawer est fermé, afficher un toast
          if (!open) {
            toast(`${newNotification.type}`, {
              description: newNotification.value,
              action: {
                label: (
                  <div>
                    {newNotification.type === "Moniteur" && (
                      <SquareActivity className="mr-2" />
                    )}
                    {newNotification.type === "SAS" && (
                      <DoorOpen className="mr-2" />
                    )}
                    {newNotification.type === "Chateau" && (
                      <FlaskConical className="mr-2" />
                    )}
                    {newNotification.type === "Bipeure" && (
                      <Volume2 className="mr-2" />
                    )}
                    {newNotification.type === "Ombriere" && (
                      <Spline className="mr-2" />
                    )}
                  </div>
                ),
                onClick: () => console.log("Undo"),
              },
            });
          }

          return updatedNotifications;
        }

        // Si aucune condition n'est remplie, retourne l'état précédent
        return prevNotifications;
      });
    }
  }, [open, sensorNotification]);

  const list = (
    <Box sx={{ width: 400 }} role="presentation">
      <div className="relative">
        {/* Header sticky */}
        <div className="sticky top-0 z-10 bg-white px-5 py-4 shadow-lg">
          <div className="flex items-center justify-between">
            <h2 className="text-center font-bold text-3xl my-4">
              Notifications
            </h2>
            <X
              size={30}
              className="mt-2 cursor-pointer"
              onClick={toggleDrawer(false)}
              onKeyDown={toggleDrawer(false)}
            />
          </div>
        </div>
        <Divider />
        <List className="p-2 overflow-y-auto">
          {notifications.length > 0 ? (
            notifications.map((notification, index) => (
              <div
                key={index}
                className="p-5 my-2 rounded-lg flex items-center gap-5 border shadow-sm"
              >
                <div>
                  {notification.type === "Moniteur" && (
                    <SquareActivity className="mr-2" />
                  )}
                  {notification.type === "SAS" && <DoorOpen className="mr-2" />}
                  {notification.type === "Chateau" && (
                    <FlaskConical className="mr-2" />
                  )}
                  {notification.type === "Bipeure" && (
                    <Volume2 className="mr-2" />
                  )}
                  {notification.type === "Ombriere" && (
                    <Spline className="mr-2" />
                  )}
                </div>
                <div>
                  <h3 className="font-bold block">{notification.type}</h3>
                  <p className="block">{notification.value}</p>
                </div>
              </div>
            ))
          ) : (
            <div className="flex justify-center items-center p-5">
              <span>Aucune Notification</span>
            </div>
          )}
        </List>
      </div>
    </Box>
  );

  return (
    <div>
      <button
        onClick={toggleDrawer(true)}
        className="flex aspect-square size-8 items-center justify-center rounded-lg bg-primary text-sidebar-primary-foreground"
      >
        <BellRing />
      </button>
      <Drawer anchor="right" open={open}>
        {list}
      </Drawer>
    </div>
  );
}
