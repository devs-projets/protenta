"use client";

import React, { useEffect, useState } from "react";
import Co2Icon from "@/assets/icons/co2.png";
import HumiditeIcon from "@/assets/icons/humidite.png";
import SolHumiditeIcon from "@/assets/icons/solHumidite.png";
import LumiereIcon from "@/assets/icons/lumiere.png";
import PressionAtmoIcon from "@/assets/icons/pressionAtmo.png";
import TemperatureIcon from "@/assets/icons/temperature.png";
import MoyenneCard from "./view/MoyenneCard";
import Link from "next/link";
import { SensorLog } from "./view/IndividualCapteurLogs";
import { StaticImageData } from "next/image";
// import { useSocket } from "@/context/SocketContext";

export interface MoyenneItem {
  name: string;
  icon: JSX.Element | StaticImageData | string;
  value: number | 'N/A';
}


const MoyennesCardList = ({sensorData,  capteurID}:{sensorData: SensorLog | undefined; capteurID: string} ) => {
  const [moyennes, setMoyennes] = useState<MoyenneItem[]>([
    { name: "Température", icon: TemperatureIcon, value: 0.0 },
    { name: "Humidité", icon: HumiditeIcon, value: 0.0 },
    { name: "Lumière", icon: LumiereIcon, value: 0.0 },
    { name: "Pression atm", icon: PressionAtmoIcon, value: 0.0 },
    { name: "Humidité sol", icon: SolHumiditeIcon, value: 0.0 },
    { name: "CO₂", icon: Co2Icon, value: 0.0 },
  ]);

  // const { socket, sensorData } = useSocket();
  // console.log(sensorData);

  useEffect(() => {
    async function fetchAverages() {
      try {
        // Simulation d'une entrée de l'API
        // const data: Average = simulateAverageData();

        if (sensorData && (sensorData?.localName === capteurID)) {// Mappez les données de l'API vers les éléments dans moyennes
        setMoyennes((prevMoyennes) =>
          prevMoyennes.map((item) => {
            switch (item.name) {
              case "Température":
                return { ...item, value: sensorData.temperature };
              case "Humidité":
                return { ...item, value: sensorData.humidity };
              case "Lumière":
                return { ...item, value: sensorData.light_A };
              case "Pression atm":
                return { ...item, value: sensorData.pressure };
              case "Humidité sol":
                return { ...item, value: "N/A" };
              case "Co2":
                return { ...item, value: "N/A" };
              default:
                return item;
            }
          })
        );}
      } catch (error) {
        console.error("Erreur lors de la récupération des moyennes", error);
      }
    }

    fetchAverages();
  }, [sensorData, capteurID]);

  return (
    <>
      {moyennes.map((item, index) => (
        <Link key={item.name} href={`/dashboard/moyenne/${item.name}`} className="shadow-lg rounded-lg border">
          <MoyenneCard key={`moyenne_item_${index}`} item={item} />
        </Link>
      ))}
    </>
  );
};

export default MoyennesCardList;
