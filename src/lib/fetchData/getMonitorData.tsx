import { ISensorStoredData } from "@/types/storedData";

export async function getStoredSensorData(
   period: string
): Promise<ISensorStoredData[]> {
   try {
       const response = await fetch(
           `${process.env.NEXT_PUBLIC_API_BASE_URL}/monitor?period=${period}`
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
