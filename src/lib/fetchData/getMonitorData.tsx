import { ISensorStoredData } from "@/types/storedData";

export async function getStoredSensorData(
  period: string,
  access_token: string,
  serreId: string,
  cultureId: string
): Promise<ISensorStoredData[]> {
  try {
    console.log(serreId);
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/monitor/aggregation-data/${serreId}/cultures/${cultureId}?period=${period}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${access_token.replace(/"/g, "")}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error("An error occurred while fetching data:", error);
    throw error;
  }
}
