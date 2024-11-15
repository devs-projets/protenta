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

// Unités de mesure
const units: Record<string, string> = {
  Température: "°C",
  Humidité: "%",
  Lumière: "lux",
  "Pression atmosphérique": "Bar",
  "Humidite du sol": "%",
  Co2: "ohm",
};

// Générer des données pour une semaine à partir de `simulateAverageData`
const generateDataWithDates = () => {
  const dates = ["01/10", "02/10", "03/10", "04/10", "05/10", "06/10", "07/10"];
  const data: Record<string, Record<string, string>> = {};

  dates.forEach((date) => {
    const simulatedData: Average = simulateAverageData();
    data[date] = {
      Température: simulatedData.MeanTemp.toFixed(2),
      Humidité: simulatedData.MeanHumidity.toFixed(2),
      Lumière: simulatedData.MeanLum.toFixed(2),
      "Pression atmosphérique": (simulatedData.MeanPress).toFixed(3), // Converti en Bar
      "Humidite du sol": simulatedData.MeanHumSol.toFixed(2),
      Co2: simulatedData.MeanCo2.toFixed(2), // Valeur en ohm
    };
  });

  return data;
};

export function TableComponent() {
  // Initialiser dataWithDates à null
  const [dataWithDates, setDataWithDates] = useState<Record<string, Record<string, string>> | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const data = generateDataWithDates();
    setDataWithDates(data);
    setLoading(false);
  }, []); // Les données ne sont générées qu'une seule fois après le premier rendu

  // Vérifiez si dataWithDates est null
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
  );
}
