import { useState, useEffect, useCallback } from "react";
import { getNotifications } from "@/lib/fetchData/getNotifications";
import { INotification } from "@/types/notification";
import { useSocket } from "@/context/SocketContext";

export const useNotifications = () => {
  const [notifications, setNotifications] = useState<INotification[]>([]);
  const [page, setPage] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const { sensorNotification } = useSocket();
  console.log(notifications)

  const fetchNotifications = useCallback(async (pageToFetch: number) => {
    if (isLoading || !hasMore) return;
    setIsLoading(true);

    try {
      const response = await getNotifications(pageToFetch, 10);
      if (response?.data) {
        setNotifications((prevNotifications) => {
          if (pageToFetch === 0) {
            return response.data;
          }
          return [...prevNotifications, ...response.data];
        });
        setHasMore(response.data.length === 10);
      }
    } catch (error) {
      console.error(
        "Erreur lors de la récupération des notifications :",
        error
      );
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchNotifications(0);
  }, []);

  useEffect(() => {
    if (page > 0) {
      fetchNotifications(page);
    }
  }, [page]);

  // Ecouter les notifications en temps réel
  useEffect(() => {
    if (sensorNotification) {
      setNotifications((prevNotifications) => {
        const shouldAddNotification =
          !prevNotifications.find(
            (notification) => notification.type === sensorNotification.type
          ) ||
          prevNotifications.some(
            (notification) => notification.value !== sensorNotification.value
          );

        if (shouldAddNotification) {
          return [sensorNotification, ...prevNotifications];
        }

        return prevNotifications;
      });
    }
  }, [sensorNotification]);

  const loadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  return { notifications, loadMore, isLoading, hasMore };
};

