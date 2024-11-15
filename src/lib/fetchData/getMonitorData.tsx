import { IHourData } from "@/types/hourDara";

export async function getStoredSensorData(period: string): Promise<IHourData[] | undefined> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/monitor?period=${period}`
    );
    if (response.ok) {
      const data: IHourData[] = await response.json();
      return data; // Retourne les données correctement
    } else {
      console.error("Failed to fetch data:", response.statusText);
      return undefined; // Retour explicite en cas d'erreur
    }
  } catch (error) {
    console.error("An error occurred while fetching data:", error);
    return undefined; // Retour explicite en cas d'exception
  }
}

