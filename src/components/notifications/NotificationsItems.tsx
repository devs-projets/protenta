import React from "react";
import {
  SquareActivity,
  DoorOpen,
  FlaskConical,
  Volume2,
  Spline,
} from "lucide-react";
import { INotification } from "@/types/notification";

const NotificationItem = ({
  notification,
}: {
  notification: INotification;
}) => {
  const getIcon = () => {
    switch (notification.type) {
      case "Moniteur":
        return <SquareActivity className="mr-2" />;
      case "SAS":
        return <DoorOpen className="mr-2" />;
      case "Chateau":
        return <FlaskConical className="mr-2" />;
      case "Bipeure":
        return <Volume2 className="mr-2" />;
      case "Ombriere":
        return <Spline className="mr-2" />;
      default:
        return null;
    }
  };

  const notifDate = `${new Date(notification.timestamp).toLocaleDateString(
    "fr-FR",
    {
      day: "2-digit",
      month: "short",
    }
  )} à ${new Date(notification.timestamp).toLocaleTimeString("fr-FR", {
    hour: "2-digit",
    minute: "2-digit",
  })}`;

  return (
    <div className="p-5 my-2 rounded-lg flex items-center gap-5 border shadow-sm">
      <div>{getIcon()}</div>
      <div className="flex-1">
        <h3 className="font-bold flex justify-between w-full">
          <span className="block">{notification.type}</span>{" "}
          <span className="block">{notifDate}</span>
        </h3>
        <p className="block">{notification.value}</p>
      </div>
    </div>
  );
};

export default NotificationItem;
