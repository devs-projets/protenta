"use client";

import { useSocket } from "@/context/SocketContext";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { Power } from "lucide-react";
import { restartMonitor } from "@/lib/postData/restartMonitor";

export default function SocketControl() {
  const {
    sensorNotification,
    isConnected,
    setWantStopSocket,
    connect,
    disconnect,
  } = useSocket();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    console.log("Statut de connexion :", isConnected);
  }, [isConnected]);

  const handleToggleConnection = async () => {
    setIsLoading(true);
    restartMonitor();
    setIsLoading(false);
    // try {
    //   if (isConnected) {
    //     // await disconnect();
    //     setWantStopSocket(true);
    //   } else {
    //     // await connect();
    //     setWantStopSocket(false);
    //   }
    // } catch (error) {
    //   console.error("Erreur lors de la (dé)connexion :", error);
    // } finally {
    //   setIsLoading(false);
    // }
  };

  return (
    <div className="flex items-center space-x-2">
      <span
        className={`inline-block w-3 h-3 rounded-full ${
          isConnected ? "bg-green-500" : "bg-red-500"
        }`}
      ></span>
      <span>{isConnected ? "Connecté" : "Déconnecté"}</span>
      {/* <Button
        className={`${isConnected ? "bg-red-500 hover:bg-red-600" : ""}`}
        onClick={handleToggleConnection}
        disabled={isLoading}
      >
        {isLoading ? "En cours..." : isConnected ? "Déconnecter" : "Connecter"}
      </Button> */}
      <Button
        className={`bg-primary`}
        onClick={handleToggleConnection}
        disabled={isLoading}
      >
        <Power /> Restart
      </Button>
    </div>
  );
}
