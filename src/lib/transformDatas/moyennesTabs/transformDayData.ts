import { ISensorStoredData } from "@/types/storedData";

export const transformDayData = (sensorData: ISensorStoredData[]) => {
  const data: Record<string, Record<string, string>> = {};

  sensorData.forEach((entry) => {
    const date = new Date(entry.timestamp).toLocaleDateString("fr-FR", {
      day: "2-digit",
      month: "2-digit",
    });

    if (!data[date]) {
      data[date] = {};
    }

    data[date] = {
      Température: (entry.averageTemp).toFixed(2),
      Humidité: (entry.averageHumidity).toFixed(2),
      Lumière: (entry.averageLightA).toFixed(2),
      "Pression atmosphérique": (entry.averagePressure).toFixed(3),
      "Humidite du sol": entry.averageSol.toFixed(2),
      Co2: entry.averageIaq.toFixed(2),
    };
  });

  return data;
};
