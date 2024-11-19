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
import { IHourData } from "@/types/hourDara";
import { StaticImageData } from "next/image";
// import { useSocket } from "@/context/SocketContext";

export interface MoyenneItem {
  accessParam: string;
  name: string;
  icon: JSX.Element | StaticImageData | string;
  value: number | "N/A";
}

const MoyennesCardList = ({
  sensorData
}: {
  sensorData: IHourData[]
}) => {
  const [moyennes, setMoyennes] = useState<MoyenneItem[]>([
    { accessParam: "temperature", name: "Température", icon: TemperatureIcon, value: 0.0 },
    { accessParam: "humidite", name: "Humidité", icon: HumiditeIcon, value: 0.0 },
    { accessParam: "lumiere", name: "Lumière", icon: LumiereIcon, value: 0.0 },
    { accessParam: "Pressionatm", name: "Pression atm", icon: PressionAtmoIcon, value: 0.0 },
    { accessParam: "humditesol", name: "Humidité sol", icon: SolHumiditeIcon, value: 0.0 },
    { accessParam: "co2", name: "CO₂", icon: Co2Icon, value: 0.0 },
  ]);

  // const { socket, sensorData } = useSocket();

  useEffect(() => {
    async function fetchAverages() {
      try {
        // Simulation d'une entrée de l'API
        // const data: Average = simulateAverageData();

        if (sensorData[0]) {
          const last = sensorData[0];
            setMoyennes((prevMoyennes) =>
              prevMoyennes.map((item) => {
                switch (item.name) {
                  case "Température":
                    return { ...item, value: last.averageTemp };
                  case "Humidité":
                    return { ...item, value: last.averageTemp };
                  case "Lumière":
                    return { ...item, value: last.averageLightA };
                  case "Pression atm":
                    return { ...item, value: last.averagePressure };
                  case "Humidité sol":
                    return { ...item, value: last.averageSol };
                  case "CO₂":
                    return { ...item, value: last.averageIaq };
                  default:
                    return item;
                }
              })
            );
        }
      } catch (error) {
        console.error("Erreur lors de la récupération des moyennes", error);
      }
    }

    fetchAverages();
  }, [sensorData]);

  return (
    <>
      {moyennes.map((item, index) => (
        <Link
          key={item.name}
          href={`/dashboard/moyenne/${item.name}`}
          className="shadow-lg rounded-lg border"
        >
          <MoyenneCard key={`moyenne_item_${index}`} item={item} />
        </Link>
      ))}
    </>
  );
};

export default MoyennesCardList;
