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

import {
  Table,
  TableBody,
  TableHeader,
  TableHead,
  TableRow,
  TableCell,
} from "@/components/ui/table";

import { useEffect, useState } from "react";

export type SensorLog = {
  latest: string;
  temperature: number;
  humidity: number;
  sol: number;
  pressure: number;
  light_A: number;
  etat: string;
  localName?: string;
};

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

const IndividualCapteurLogs = ({
  sensorData,
  capteurID,
}: {
  sensorData: SensorLog;
  capteurID: string;
}) => {
  const [logs, setLogs] = useState<SensorLog[]>([]);
  const [filterEtat, setFilterEtat] = useState<string | null>(null);

  useEffect(() => {
    if (!sensorData || sensorData.localName !== capteurID) return;

    const newLog = { ...sensorData, etat: getRandomState() };
    setLogs((prevLogs) => [newLog, ...prevLogs.slice(0, 99)]); // Limite les logs à 100 pour éviter une surcharge
  }, [sensorData, capteurID]);

  const filteredLogs = filterEtat
    ? logs.filter((log) => log.etat === filterEtat)
    : logs;

  return (
    <div className="border rounded-lg overflow-hidden">
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
  );
};

export default IndividualCapteurLogs;
