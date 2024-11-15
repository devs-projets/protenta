import { SensorLog } from "@/components/view/IndividualCapteurLogs";

export async function getStoredSensorData(period: string) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/monitor?period=${period}`
    );
    if (response.ok) {
      const data: SensorLog[] = await response.json();
      return data;
      console.log("Fetched data:", data);
    } else {
      console.error("Failed to fetch data:", response.statusText);
    }
  } catch (error) {
    console.error("An error occurred while fetching data:", error);
  }
}
