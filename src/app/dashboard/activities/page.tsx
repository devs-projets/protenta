"use client"

import React, { useEffect, useState } from "react";
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
import { SensorLog } from "@/components/view/IndividualCapteurLogs";

const capteurLogs: SensorLog[] = [
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

const getRandomState = () => {
  const states = ["Normal", "Attention", "Alerte"];
  return states[Math.floor(Math.random() * states.length)];
};

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
  const [logs, setLogs] = useState<SensorLog[]>(capteurLogs);

//   useEffect(() => {
//     const newLog = { ...sensorData, etat: getRandomState() };
//     console.log(newLog);
//     if (newLog.localName === capteurID)
//       setLogs((prevLogs) => [newLog, ...prevLogs]);
//   }, [sensorData]);
  return (
    <div>
      <h1 className="text-4xl font-bold shadow-lg text-center rounded-lg py-5">
        Capteurs
      </h1>
      <div className="border rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="bg-background">Date et Heure</TableHead>
              <TableHead className="bg-background">Température</TableHead>
              <TableHead className="bg-background">Humidité</TableHead>
              <TableHead className="bg-background">
                Pression Atmosphérique
              </TableHead>
              <TableHead className="bg-background">Lumière</TableHead>
              <TableHead className="bg-background">État</TableHead>
            </TableRow>
          </TableHeader>
        </Table>
        <div className="overflow-auto max-h-[calc(100vh-20rem)]">
          <Table>
            <TableBody>
              {logs.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center text-gray-500">
                    Aucune donnée à afficher.
                  </TableCell>
                </TableRow>
              ) : (
                logs.map((log, index) => (
                  <AlertDialog key={index}>
                    <AlertDialogTrigger asChild>
                      <TableRow className={getRowColor(log.etat)}>
                        <TableCell className="font-medium">
                          {log.latest}
                        </TableCell>
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
    </div>
  );
};

export default ActivitiesPage;
