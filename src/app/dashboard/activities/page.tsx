"use client";

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

interface IJoural {
  latest: string;
  message: string;
  auteur: string;
  etat: string;
}

const capteurLogs: IJoural[] = [
  {
    latest: "2024-10-01 14:30:00",
    message: "Température stable",
    auteur: "Capteur 1",
    etat: "Normal",
  },
  {
    latest: "2024-10-01 14:45:00",
    message: "Alerte : Température élevée",
    auteur: "Capteur 2",
    etat: "Alerte",
  },
  {
    latest: "2024-10-01 15:00:00",
    message: "Température normale",
    auteur: "Capteur 1",
    etat: "Normal",
  },
  {
    latest: "2024-10-01 15:15:00",
    message: "Attention : Humidité faible",
    auteur: "Capteur 3",
    etat: "Attention",
  },
];

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

  const filteredLogs = filterEtat
    ? logs.filter((log) => log.etat === filterEtat)
    : logs;

  return (
    <div className="p-4">
      <h1 className="text-4xl font-bold shadow-lg text-center rounded-lg py-5">
        Journal
      </h1>
      <div className="border rounded-lg overflow-hidden mt-5 overflow-x-auto">
        <Table className="min-w-full">
          <TableHeader>
            <TableRow>
              <TableHead>Date et Heure</TableHead>
              <TableHead>Message</TableHead>
              <TableHead className="hidden md:table-cell">Auteur</TableHead>
              <TableHead className="hidden md:table-cell">Agent</TableHead>
              <TableHead>
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
                <TableCell colSpan={5} className="text-center text-gray-500">
                  Aucune donnée à afficher.
                </TableCell>
              </TableRow>
            ) : (
              filteredLogs.map((log, index) => (
                <AlertDialog key={index}>
                  <AlertDialogTrigger asChild>
                    <TableRow className={getRowColor(log.etat)}>
                      <TableCell>[{log.latest}]</TableCell>
                      <TableCell>{log.message}</TableCell>
                      <TableCell className="hidden md:table-cell">
                        {log.auteur}
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        Wourichouf
                      </TableCell>
                      <TableCell>{log.etat}</TableCell>
                    </TableRow>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Détails du log</AlertDialogTitle>
                      <AlertDialogDescription>
                        <p>Date et Heure : {log.latest}</p>
                        <p>Message : {log.message}</p>
                        <p>Auteur : {log.auteur}</p>
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
