import { INotifications } from "@/types/notification";

export async function getNotifications(
  page: number,
  limit: number
): Promise<INotifications | undefined> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/notifications?page=${page}&limit=${limit}`
    );
    if (response.ok) {
      const data: INotifications = await response.json();
      return data;
    } else {
      console.error("Failed to fetch data:", response.statusText);
      return undefined;
    }
  } catch (error) {
    console.error("An error occurred while fetching data:", error);
    return undefined;
  }
}
