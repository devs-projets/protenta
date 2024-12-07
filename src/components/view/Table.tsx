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
import { transformDayData } from "@/lib/transformDatas/moyennesTabs/transformDayData";
import { transformHourData } from "@/lib/transformDatas/moyennesTabs/transformHourData";
import { ChevronLeft, ChevronRight } from "lucide-react";

// Unités de mesure
export const units: Record<string, string> = {
  Température: "°C",
  Humidité: "%",
  Lumière: "lux",
  "Pression atmosphérique": "Bar",
  "Humidite du sol": "%",
  Co2: "ppm",
};

// Constantes pour pagination
const MAX_COLUMNS_HOURS = 8; // Nombre maximum de colonnes pour les heures
const MAX_COLUMNS_DAYS = 7; // Nombre maximum de colonnes pour les jours

export function TableComponent({
  sensorData,
  visualisationPeriode,
}: {
  sensorData: ISensorStoredData[];
  visualisationPeriode: string;
}) {
  const [dataWithDates, setDataWithDates] = useState<Record<
    string,
    Record<string, string>
  > | null>(null);
  const [loading, setLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(0); // Page actuelle

  useEffect(() => {
    const transformedData =
      sensorData &&
      (visualisationPeriode === "Heures"
        ? transformHourData(sensorData)
        : visualisationPeriode === "Jours"
        ? transformDayData(sensorData)
        : null);

    setDataWithDates(transformedData || null);
    setLoading(false);
    setCurrentPage(0); // Réinitialise la page à 0 lors du changement de données
  }, [sensorData, visualisationPeriode]);

  if (loading || dataWithDates === null) {
    return (
      <div className="flex justify-center items-center min-h-52">
        <Spinner />
      </div>
    );
  }

  const dates = Object.keys(dataWithDates);
  const mainEntries = Object.keys(units);

  // Détermine le nombre maximum de colonnes à afficher
  const maxColumns =
    visualisationPeriode === "Heures" ? MAX_COLUMNS_HOURS : MAX_COLUMNS_DAYS;

  // Pagination
  const totalPages = Math.ceil(dates.length / maxColumns);
  const startIndex = currentPage * maxColumns;
  const endIndex = startIndex + maxColumns;
  const paginatedDates = dates.slice(startIndex, endIndex);

  return sensorData && sensorData.length > 0 ? (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead></TableHead>
            <TableHead>Unité</TableHead>
            {paginatedDates.map((date) => (
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
              {paginatedDates.map((date) => (
                <TableCell key={`${date}-${entry}`}>
                  {dataWithDates[date]?.[entry] || "N/A"}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Pagination */}
      <div className="flex justify-end gap-3 items-center mt-4">
        <button
          disabled={currentPage === 0}
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 0))}
          className={`${
            currentPage === 0
              ? "text-gray-400 cursor-not-allowed"
              : "text-primary"
          }`}
        >
          <ChevronLeft />
        </button>

        {/* Indicateur de page */}
        <span className="text-gray-600 font-medium">
          Page {currentPage + 1} sur {totalPages}
        </span>

        <button
          disabled={currentPage === totalPages - 1}
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages - 1))
          }
          className={`${
            currentPage === totalPages - 1
              ? "text-gray-400 cursor-not-allowed"
              : "text-primary"
          }`}
        >
          <ChevronRight />
        </button>
      </div>
    </div>
  ) : (
    // Cas où il n'y a pas de données
    <div className="flex justify-center items-center min-h-52">
      <p className="text-gray-500 text-lg font-medium">
        Aucune donnée disponible
      </p>
    </div>
  );
}
