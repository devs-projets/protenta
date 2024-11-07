import { Average } from "@/types/average";

export function simulateAverageData(): Average {
  return {
    MeanTemp: parseFloat((Math.random() * (35 - 15) + 15).toFixed(2)), // Température entre 15°C et 35°C
    MeanHumidity: parseFloat((Math.random() * (100 - 20) + 20).toFixed(2)), // Humidité entre 20% et 100%
    MeanLum: parseFloat((Math.random() * (1000 - 200) + 200).toFixed(2)), // Luminosité entre 200 et 1000 lux
    MeanPress: parseFloat(((Math.random() * (1050 - 950) + 950) / 1000).toFixed(3)), // Pression entre 0.950 Bar et 1.050 Bar
    MeanHumSol: parseFloat((Math.random() * (50 - 10) + 10).toFixed(2)), // Humidité du sol entre 10% et 50%
    MeanCo2: parseFloat((Math.random() * (10 - 5) + 5).toFixed(2)), // CO2 entre 5 et 10 Ohms
  };
}
