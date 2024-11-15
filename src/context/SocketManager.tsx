// components/SocketManager.tsx
'use client';

import { useEffect } from 'react';
import { useSocket } from './SocketContext';
import { usePathname } from 'next/navigation';

export const SocketManager: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isConnected, wantStopSocket, connect, disconnect } = useSocket();
  const pathname = usePathname();

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
  }, [pathname, isConnected, wantStopSocket, connect, disconnect]);

  return <>{children}</>;
};