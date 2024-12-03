"use client"

import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableHeader,
  TableHead,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { SensorLog } from "@/components/capteurs/IndividualCapteurLogs";
import { ISensorAverageData } from "@/types/monitor";

interface IJoural extends ISensorAverageData {
  etat: string;
}

const capteurLogs: IJoural[] = [
  {
    latest: "2024-10-01 14:30:00",
    temperature: 25,
    humidity: 45,
    pressure: 1013,
    light_A: 300,
    etat: "Normal",
  },
  {
    latest: "2024-10-01 14:45:00",
    temperature: 28,
    humidity: 50,
    pressure: 1011,
    light_A: 320,
    etat: "Alerte",
  },
  {
    latest: "2024-10-01 15:00:00",
    temperature: 26,
    humidity: 47,
    pressure: 1012,
    light_A: 310,
    etat: "Normal",
  },
  {
    latest: "2024-10-01 15:15:00",
    temperature: 27,
    humidity: 49,
    pressure: 1010,
    light_A: 315,
    etat: "Attention",
  },
];

// const getRandomState = () => {
//   const states = ["Normal", "Attention", "Alerte"];
//   return states[Math.floor(Math.random() * states.length)];
// };

const getRowColor = (etat: string) => {
  switch (etat) {
    case "Normal":
      return "bg-green-100 text-green-700";
    case "Alerte":
      return "bg-red-100 text-red-700";
    case "Attention":
      return "bg-yellow-100 text-yellow-700";
    default:
      return "";
  }
};

const ActivitiesPage = () => {
  const [logs] = useState<IJoural[]>(capteurLogs);
  const [filterEtat, setFilterEtat] = useState<string | null>(null);

//   useEffect(() => {
//     const newLog = { ...sensorData, etat: getRandomState() };
//     console.log(newLog);
//     if (newLog.localName === capteurID)
//       setLogs((prevLogs) => [newLog, ...prevLogs]);
//   }, [sensorData]);

const filteredLogs = filterEtat
    ? logs.filter((log) => log.etat === filterEtat)
    : logs;
  return (
    <div>
      <h1 className="text-4xl font-bold shadow-lg text-center rounded-lg py-5">
        Journal
      </h1>
      <div className="border rounded-lg overflow-hidden mt-5">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-1/5">Date et Heure</TableHead>
            <TableHead className="w-1/5">Température</TableHead>
            <TableHead className="w-1/5">Humidité</TableHead>
            <TableHead className="w-1/5">Pression Atmosphérique</TableHead>
            <TableHead className="w-1/5">Lumière</TableHead>
            <TableHead className="w-1/5 flex items-center gap-2">
              État{" "}
              <select
                id="etat-filter"
                value={filterEtat || ""}
                onChange={(e) => setFilterEtat(e.target.value || null)}
                className="border border-gray-300 rounded-md px-2 py-1"
              >
                <option value="">Tous</option>
                <option value="Normal">Normal</option>
                <option value="Attention">Attention</option>
                <option value="Alerte">Alerte</option>
              </select>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredLogs.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="text-center text-gray-500">
                Aucune donnée à afficher.
              </TableCell>
            </TableRow>
          ) : (
            filteredLogs.map((log, index) => (
              <AlertDialog key={index}>
                <AlertDialogTrigger asChild>
                  <TableRow className={getRowColor(log.etat)}>
                    <TableCell className="font-medium">{log.latest}</TableCell>
                    <TableCell>{log.temperature}°C</TableCell>
                    <TableCell>{log.humidity}%</TableCell>
                    <TableCell>{log.pressure} hPa</TableCell>
                    <TableCell>{log.light_A} lux</TableCell>
                    <TableCell>{log.etat}</TableCell>
                  </TableRow>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Détails du log</AlertDialogTitle>
                    <AlertDialogDescription>
                      <p>Date et Heure : {log.latest}</p>
                      <p>Température : {log.temperature}°C</p>
                      <p>Humidité : {log.humidity}%</p>
                      <p>Pression Atmosphérique : {log.pressure} hPa</p>
                      <p>Lumière : {log.light_A} lux</p>
                      <p>État : {log.etat}</p>
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Fermer</AlertDialogCancel>
                    <AlertDialogAction>OK</AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            ))
          )}
        </TableBody>
      </Table>
    </div>
    </div>
  );
};

export default ActivitiesPage;
