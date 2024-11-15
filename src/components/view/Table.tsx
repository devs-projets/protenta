"use client";

import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableHeader,
  TableCell,
  TableHead,
  TableRow,
} from "@/components/ui/table";
import { simulateAverageData } from "@/mockData/simulateAverageData";
import Spinner from "../Spinner"; // Assurez-vous que ce chemin correspond bien à votre composant Spinner
import { Average } from "@/types/average";
import { IHourData } from "@/types/hourDara";

// Unités de mesure
const units: Record<string, string> = {
  Température: "°C",
  Humidité: "%",
  Lumière: "lux",
  "Pression atmosphérique": "Bar",
  "Humidite du sol": "%",
  Co2: "ohm",
};

const generateDataWithDates = (sensorData: { timestamp: string, averageTemp: number, averageHumidity: number, averagePressure: number, averageLightA: number, averageSol: number }[]) => {
  const data: Record<string, Record<string, string>> = {};

  sensorData.forEach((dataPoint) => {
    const date = new Date(dataPoint.timestamp).toLocaleDateString(); // Extraire la date au format "dd/mm"
    
    if (!data[date]) {
      data[date] = {
        Température: dataPoint.averageTemp.toFixed(2),
        Humidité: dataPoint.averageHumidity.toFixed(2),
        Lumière: dataPoint.averageLightA.toFixed(2),
        "Pression atmosphérique": dataPoint.averagePressure.toFixed(3),
        "Humidite du sol": dataPoint.averageSol.toFixed(2),
        Co2: "N/A", // Placeholder, ajoute des données réelles si nécessaire
      };
    } else {
      // Si les données existent déjà pour cette date, on peut les ajouter
      data[date].Température = dataPoint.averageTemp.toFixed(2);
      data[date].Humidité = dataPoint.averageHumidity.toFixed(2);
      data[date].Lumière = dataPoint.averageLightA.toFixed(2);
      data[date]["Pression atmosphérique"] = dataPoint.averagePressure.toFixed(3);
      data[date]["Humidite du sol"] = dataPoint.averageSol.toFixed(2);
      // Ajouter Co2 ou d'autres valeurs si nécessaire
    }
  });

  return data;
};

export function TableComponent({ sensorData }: { sensorData: { timestamp: string, averageTemp: number, averageHumidity: number, averagePressure: number, averageLightA: number, averageSol: number }[] }) {
  const [dataWithDates, setDataWithDates] = useState<Record<string, Record<string, string>> | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const data = generateDataWithDates(sensorData);
    setDataWithDates(data);
    setLoading(false);
  }, [sensorData]); // Réexécuter si `sensorData` change

  if (loading || dataWithDates === null) {
    return <Spinner />; // Afficher le spinner pendant le chargement
  }

  const dates = Object.keys(dataWithDates); // Liste des dates
  const mainEntries = Object.keys(units); // Liste des entrées principales (Température, Humidité, etc.)

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead></TableHead>
          <TableHead>Unité</TableHead>
          {dates.map((date) => (
            <TableHead key={date}>{date}</TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {mainEntries.map((entry) => (
          <TableRow key={entry}>
            <TableCell className="font-medium">{entry}</TableCell>
            <TableCell className="font-medium">{units[entry]}</TableCell>
            {dates.map((date) => (
              <TableCell key={`${date}-${entry}`}>
                {dataWithDates[date]?.[entry] || "N/A"}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
