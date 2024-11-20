import { ISensorStoredData } from "@/types/storedData";

export async function getStoredSensorData(
  period: string
): Promise<ISensorStoredData[] | undefined> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/monitor?period=${period}`
    );
    if (response.ok) {
      const data: ISensorStoredData[] = await response.json();
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
