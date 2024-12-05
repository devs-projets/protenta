import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  Dispatch,
  SetStateAction,
} from "react";
import { io, Socket } from "socket.io-client";

interface SocketContextType {
  socket: Socket | null;
  sensorData: any;
  sensorNotification: any;
  isConnected: boolean;
  wantStopSocket: boolean;
  connect: () => void;
  disconnect: () => void;
  setWantStopSocket: Dispatch<SetStateAction<boolean>>;
}

const base_url = process.env.NEXT_PUBLIC_API_BASE_URL;

const SocketContext = createContext<SocketContextType | undefined>(undefined);

export const SocketProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [sensorData, setSensorData] = useState<any>(null);
  const [sensorNotification, setSensorNotification] = useState<any>(null)
  const [isConnected, setIsConnected] = useState(false);
  const [wantStopSocket, setWantStopSocket] = useState<boolean>(false);

  const connect = useCallback(() => {
    if (!socket) {
      const newSocket = io(base_url);
      setSocket(newSocket);

      newSocket.on("connect", () => setIsConnected(true));
      newSocket.on("disconnect", () => setIsConnected(false));
      newSocket.on("monitorDataOnLive", (data) => {
        setSensorData(data);
        // console.log(data)
      });
      newSocket.on("notifications", (data) => {
        setSensorNotification(data)
        // console.log(data)
      });
    }
  }, [socket]);

  const disconnect = useCallback(() => {
    if (socket) {
      socket.off("monitorDataOnLive");
      socket.disconnect();
      setSocket(null);
      setIsConnected(false);
      setSensorData(null);
      setSensorNotification(null)

      // Vérification supplémentaire après la déconnexion
      setTimeout(() => {
        if (socket && socket.connected) {
          console.warn(
            "Un socket est toujours connecté après la tentative de déconnexion, déconnexion forcée."
          );
          socket.disconnect();
        }
      }, 100);
    }
  }, [socket]);

  useEffect(() => {
    return () => {
      if (socket) {
        socket.off("monitorDataOnLive");
        socket.disconnect();
      }
    };
  }, [socket]);

  return (
    <SocketContext.Provider
      value={{
        socket,
        sensorData,
        sensorNotification,
        isConnected,
        wantStopSocket,
        setWantStopSocket,
        connect,
        disconnect,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => {
  const context = useContext(SocketContext);
  if (context === undefined) {
    throw new Error("useSocket must be used within a SocketProvider");
  }
  return context;
};
