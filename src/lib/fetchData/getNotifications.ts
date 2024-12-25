import { INotifications } from "@/types/notification";

export async function getNotifications(
  access_token: string,
  page: number,
  limit: number
): Promise<INotifications | undefined> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/notifications?page=${page}&limit=${limit}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${access_token.replace(/"/g, '')}`,
        },
      }
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
