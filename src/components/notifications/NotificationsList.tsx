import React from "react";
import { INotification } from "@/types/notification";
import NotificationItem from "./NotificationsItems";
import Spinner from "../Spinner";

interface NotificationListProps {
  notifications: INotification[];
  loadMore: () => void;
  isLoading: boolean;
  hasMore: boolean;
}

const NotificationList = ({
  notifications,
  loadMore,
  isLoading,
  hasMore,
}: NotificationListProps) => {
  return (
    <div className="p-2 overflow-y-auto">
      {notifications.length > 0 ? (
        notifications.map((notification, index) => (
          <NotificationItem key={index} notification={notification} />
        ))
      ) : (
        <div className="flex justify-center items-center p-5">
          <span>Aucune Notification</span>
        </div>
      )}

      {/* Loader */}
      {isLoading && (
        <div className="text-center p-4 flex justify-center">
          <Spinner />
        </div>
      )}

      {/* Bouton pour charger plus */}
      {!isLoading && notifications.length > 0 && hasMore && (
        <div className="p-4">
          <button
            onClick={loadMore}
            className="px-4 py-2 rounded bg-primary text-white w-full"
          >
            Charger plus
          </button>
        </div>
      )}
    </div>
  );
};

export default NotificationList;

