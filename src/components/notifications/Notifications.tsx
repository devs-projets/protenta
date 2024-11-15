import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import { BellRing, X } from "lucide-react";
import { toast } from "sonner";
import { Info } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Notifications() {
  const [open, setOpen] = useState(false); // Gère l'état d'ouverture du Drawer
  const [notifications, setNotifications] = useState<string[]>([]); // Gère l'état des notifications

  // Fonction pour déclencher l'ouverture/fermeture du Drawer
  const toggleDrawer = (open: boolean) => () => {
    setOpen(open);
  };

  // Fonction pour simuler l'ajout de notifications toutes les 3 secondes
  useEffect(() => {
    const intervalId = setInterval(() => {
      setNotifications((prevNotifications) => {
        const newNotification = `New notification at ${new Date().toLocaleTimeString()}`;
        const updatedNotifications = [newNotification, ...prevNotifications]; // Ajouter en début de liste

        // Si le drawer est fermé, afficher un toast
        if (!open) {
          toast("New Notification", {
            description: newNotification,
            action: {
              label: (<div><Info className="mr-2" /></div>),
              onClick: () => console.log("Undo"),
            },
          });
        }

        return updatedNotifications;
      });
    }, 3000); // Ajouter une nouvelle notification toutes les 3 secondes

    return () => clearInterval(intervalId); // Nettoyer l'intervalle lors du démontage du composant
  }, [open]); // L'effet dépend de l'état `open`

  // Rendre la liste des notifications dans le Drawer
  const list = (
    <Box sx={{ width: 400 }} role="presentation">
      <div className="relative">
        {/* Header avec sticky */}
        <div className="sticky top-0 z-10 bg-white px-5 py-4 shadow-lg">
          <div className="flex items-center justify-between">
            <h2 className="text-center font-bold text-3xl my-4">Notifications</h2>
            <X
              size={30}
              className="mt-2 cursor-pointer"
              onClick={toggleDrawer(false)}
              onKeyDown={toggleDrawer(false)}
            />
          </div>
        </div>
        <Divider />
        <List className="p-2 overflow-y-auto"> {/* Ajout de la barre de défilement */}
          {notifications.map((notification, index) => (
            <div key={index} className="p-5 my-2 rounded-lg flex items-center gap-5 border shadow-sm">
              <div><BellRing className="text-gray-500" /></div>
              <div>
                <h3 className="font-bold block">Notification</h3>
                <p className="block">{notification}</p>
              </div>
            </div>
          ))}
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

      {/* Le toast sera déclenché automatiquement lorsque de nouvelles notifications arrivent */}
      {/* Il n'est plus nécessaire d'avoir un bouton pour afficher le toast */}
    </div>
  );
}
