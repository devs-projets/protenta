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
import Spinner from "../Spinner";
import { ISensorStoredData } from "@/types/storedData";

// Unités de mesure
export const units: Record<string, string> = {
  Température: "°C",
  Humidité: "%",
  Lumière: "lux",
  "Pression atmosphérique": "Bar",
  "Humidite du sol": "%",
  Co2: "ppm",
};

// Transformer les données `sensorData` pour correspondre au format attendu
const transformSensorData = (sensorData: ISensorStoredData[]) => {
  const data: Record<string, Record<string, string>> = {};

  sensorData.forEach((entry) => {
    // Formatage de la date
    const date = new Date(entry.timestamp).toLocaleDateString("fr-FR", {
      day: "2-digit",
      month: "2-digit",
    });

    // Vérifiez si la date existe déjà dans `data`
    if (!data[date]) {
      data[date] = {};
    }

    // Ajouter les valeurs moyennes au format attendu
    data[date] = {
      Température: (entry.averageTemp / 100).toFixed(2), // Conversion en °C
      Humidité: (entry.averageHumidity / 100).toFixed(2),
      Lumière: (entry.averageLightA * 1000).toFixed(2), // Conversion en lux (exemple)
      "Pression atmosphérique": (entry.averagePressure / 1000).toFixed(3), // Conversion en Bar
      "Humidite du sol": entry.averageSol.toFixed(2),
      Co2: entry.averageIaq.toFixed(2),
    };
  });

  return data;
};

export function TableComponent({
  sensorData,
}: {
  sensorData: ISensorStoredData[];
}) {
  const [dataWithDates, setDataWithDates] = useState<Record<
    string,
    Record<string, string>
  > | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (sensorData) {
      const transformedData = transformSensorData(sensorData);
      setDataWithDates(transformedData);
      setLoading(false);
    }
  }, [sensorData]);

  if (loading || dataWithDates === null) {
    return (
      <div className="flex justify-center items-center min-h-52">
        <Spinner />
      </div>
    );
  }

  const dates = Object.keys(dataWithDates);
  const mainEntries = Object.keys(units);

  return sensorData && sensorData.length > 0 ? (
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
            {/* Colonne avec les noms des mesures */}
            <TableCell className="font-medium">{entry}</TableCell>

            {/* Colonne avec les unités de mesure */}
            <TableCell className="font-medium">{units[entry]}</TableCell>

            {/* Colonnes avec les valeurs */}
            {dates.map((date) => (
              <TableCell key={`${date}-${entry}`}>
                {dataWithDates[date]?.[entry] || "N/A"}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  ) : (
    // Cas où il n'y a pas de données
    <div className="flex justify-center items-center min-h-52">
      <p className="text-gray-500 text-lg font-medium">
        Aucune donnée disponible
      </p>
    </div>
  );
}
