"use client";

import { useSocket } from "@/context/SocketContext";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { Power } from "lucide-react";
import { restartMonitor } from "@/lib/postData/restartMonitor";
import { toast } from "sonner";
import { useAuth } from "@/context/AuthProvider";

export default function MonitorControl() {
  const {
    isConnected,
  } = useSocket();
  const [isLoading, setIsLoading] = useState(false);
  const { access_token } = useAuth();

  useEffect(() => {
    console.log("Statut de connexion :", isConnected);
  }, [isConnected]);

  const handleToggleConnection = async () => {
    if (!access_token) {
      console.error("Access token is null");
      return;
    }

    setIsLoading(true);
    toast.promise(restartMonitor(access_token), {
      loading: "Redémarré en cours...",
      success: "Redémarré",
      error: "Une erreur s'est produite, veuillez réessayer !",
    });
    restartMonitor(access_token);
    setIsLoading(false);
  };

  return (
    <div className="flex items-center space-x-2">
      <span
        className={`inline-block w-3 h-3 rounded-full ${
          isConnected ? "bg-green-500" : "bg-red-500"
        }`}
      ></span>
      <span>{isConnected ? "Connecté" : "Déconnecté"}</span>
      <Button
        className={`bg-primary`}
        onClick={handleToggleConnection}
        disabled={isLoading}
      >
        <Power /> <span className="hidden xxs:block">Restart</span>
      </Button>
    </div>
  );
}
