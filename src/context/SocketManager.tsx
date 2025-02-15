'use client';

import { useEffect } from 'react';
import { useSocket } from './SocketContext';

export const SocketManager: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isConnected, wantStopSocket, connect, disconnect } = useSocket();

  useEffect(() => {
    if (!isConnected && !wantStopSocket) {
      connect();
    } else if (isConnected && wantStopSocket) {
      disconnect();
    }

    return () => {
      if (isConnected) {
        disconnect();
      }
    };
  // }, [pathname, isConnected, wantStopSocket, connect, disconnect]);
  }, [connect, disconnect]);

  return <>{children}</>;
};