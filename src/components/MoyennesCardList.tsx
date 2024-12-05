"use client";

import React, { useEffect, useState } from "react";
import MoyenneCard from "./moyennes/MoyenneCard";
import Link from "next/link";
import { ISensorStoredData } from "@/types/storedData";
import { defaulMoyenneCardData } from "@/mockData/defaultMoyenneCardData";
import { MoyenneItem } from "@/types/moyenneItem";
import { useSocket } from "@/context/SocketContext";


const MoyennesCardList = () => {
  const [moyennes, setMoyennes] = useState<MoyenneItem[]>(
    defaulMoyenneCardData
  );
  const {sensorData} = useSocket();

  useEffect(() => {
    if (sensorData) {
      setMoyennes((prevMoyennes) =>
        prevMoyennes.map((item) => {
          switch (item.name) {
            case "Température":
              return { ...item, value: sensorData.MeanTemp };
            case "Humidité":
              return { ...item, value: sensorData.MeanHumidity };
            case "Lumière":
              return { ...item, value: sensorData.MeanLum };
            case "Pression atm":
              return { ...item, value: sensorData.MeanPress };
            case "Humidité sol":
              return { ...item, value: sensorData.averageSol };
            case "CO₂":
              return { ...item, value: sensorData.MeanCo2};
            default:
              return item;
          }
        })
      );
    }
  }, [sensorData]);

  return (
    <>
      {moyennes.map((item, index) => (
        <Link
          key={item.name}
          href={`/dashboard/moyenne/${item.accessParam}`}
          className="shadow-lg rounded-lg border"
        >
          <MoyenneCard key={`moyenne_item_${index}`} item={item} />
        </Link>
      ))}
    </>
  );
};

export default MoyennesCardList;
