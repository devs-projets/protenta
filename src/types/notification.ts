export interface INotification {
  type: string;
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
