"use client";

import React, { useEffect, useState } from "react";
import MoyenneCard from "./view/MoyenneCard";
import Link from "next/link";
import { ISensorStoredData } from "@/types/storedData";
import { defaulMoyenneCardData } from "@/mockData/defaultMoyenneCardData";
import { MoyenneItem } from "@/types/moyenneItem";


const MoyennesCardList = ({
  sensorData,
}: {
  sensorData: ISensorStoredData[];
}) => {
  const [moyennes, setMoyennes] = useState<MoyenneItem[]>(
    defaulMoyenneCardData
  );

  useEffect(() => {
    if (sensorData[0]) {
      const last = sensorData[0];
      setMoyennes((prevMoyennes) =>
        prevMoyennes.map((item) => {
          switch (item.name) {
            case "Température":
              return { ...item, value: last.averageTemp };
            case "Humidité":
              return { ...item, value: last.averageHumidity };
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
