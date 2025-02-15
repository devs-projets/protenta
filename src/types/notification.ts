export interface INotification {
  type: "Moniteur" | "SAS" | "Chateau" | "Bipeure" | "Ombriere";
  value: string;
  timestamp: string;
  id: string;
}

export interface INotifications {
  data: INotification[];
  page: number;
  pages: number;
  total: number;
}
