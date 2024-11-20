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
import { ISimulateAverageData, simulateAverageData } from "@/mockData/simulateAverageData";
import Spinner from "../Spinner";
import { ISensorStoredData } from "@/types/storedData";

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
  const dates = ["01/10", "02/1!0", "03/10", "04/10", "05/10", "06/10", "07/10"];
  const data: Record<string, Record<string, string>> = {};

  dates.forEach((date) => {
    const simulatedData: ISimulateAverageData = simulateAverageData();
    data[date] = {
      Température: simulatedData.MeanTemp!.toFixed(2),
      Humidité: simulatedData.MeanHumidity!.toFixed(2),
      Lumière: simulatedData.MeanLum!.toFixed(2),
      "Pression atmosphérique": (simulatedData.MeanPress)!.toFixed(3),
      "Humidite du sol": simulatedData.MeanHumSol!.toFixed(2),
      Co2: simulatedData.MeanCo2!.toFixed(2),
    };
  });

  return data;
};

export function TableComponent({sensorData}: {sensorData: ISensorStoredData[]}) {
  const [dataWithDates, setDataWithDates] = useState<Record<string, Record<string, string>> | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const data = generateDataWithDates();
    setDataWithDates(data);
    setLoading(false);
  }, []);
  
  if (loading || dataWithDates === null) {
    return <div className="flex justify-center items-center min-h-52">
      <Spinner />
    </div>;
  }

  const dates = Object.keys(dataWithDates);
  const mainEntries = Object.keys(units);

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


// "use client";

// import React, { useEffect, useState } from "react";
// import {
//   Table,
//   TableBody,
//   TableHeader,
//   TableCell,
//   TableHead,
//   TableRow,
// } from "@/components/ui/table";
// import Spinner from "../Spinner"; // Assurez-vous que ce chemin correspond bien à votre composant Spinner
// import { IHourData } from "@/types/hourDara";

// // Unités de mesure
// const units: Record<string, string> = {
//   Température: "°C",
//   Humidité: "%",
//   Lumière: "lux",
//   "Pression atmosphérique": "Bar",
//   "Humidite du sol": "%",
//   Co2: "ohm",
// };

// // Générer des données avec les 7 derniers enregistrements
// const generateDataWithDates = (sensorData: IHourData[]) => {
//   // Trier les données par date décroissante
//   const sortedData = sensorData.sort(
//     (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
//   );

//   // Prendre les 7 dernières données
//   const recentData = sortedData.slice(0, 7);

//   const data: Record<string, Record<string, string>> = {};

//   recentData.forEach((dataPoint) => {
//     const date = new Date(dataPoint.timestamp).toLocaleDateString();

//     if (!data[date]) {
//       data[date] = {
//         Température: dataPoint.averageTemp.toFixed(2),
//         Humidité: dataPoint.averageHumidity.toFixed(2),
//         Lumière: dataPoint.averageLightA.toFixed(2),
//         "Pression atmosphérique": dataPoint.averagePressure.toFixed(3),
//         "Humidite du sol": dataPoint.averageSol.toFixed(2),
//         Co2: dataPoint.averageIaq.toFixed(2),
//       };
//     }
//   });

//   return data;
// };

// export function TableComponent({
//   sensorData,
// }: {
//   sensorData: IHourData[];
// }) {
//   const [dataWithDates, setDataWithDates] = useState<Record<
//     string,
//     Record<string, string>
//   > | null>(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const data = generateDataWithDates(sensorData);
//     setDataWithDates(data);
//     setLoading(false);
//   }, [sensorData]);

//   if (loading || dataWithDates === null) {
//     return <Spinner />;
//   }

//   const dates = Object.keys(dataWithDates);
//   const mainEntries = Object.keys(units);

//   return (
//     <Table>
//       <TableHeader>
//         <TableRow>
//           <TableHead></TableHead>
//           <TableHead>Unité</TableHead>
//           {dates.map((date) => (
//             <TableHead key={date}>{date}</TableHead>
//           ))}
//         </TableRow>
//       </TableHeader>
//       <TableBody>
//         {mainEntries.map((entry) => (
//           <TableRow key={entry}>
//             <TableCell className="font-medium">{entry}</TableCell>
//             <TableCell className="font-medium">{units[entry]}</TableCell>
//             {dates.map((date) => (
//               <TableCell key={`${date}-${entry}`}>
//                 {dataWithDates[date]?.[entry] || "N/A"}
//               </TableCell>
//             ))}
//           </TableRow>
//         ))}
//       </TableBody>
//     </Table>
//   );
// }
