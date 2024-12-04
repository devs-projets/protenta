"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { ISensorStoredData } from "@/types/storedData";
import { MoyenneItem } from "@/types/moyenneItem";
import { defaulMoyenneCardData } from "@/mockData/defaultMoyenneCardData";

const CapteurDataCardList = ({ sensorData }: { sensorData: ISensorStoredData[] }) => {
  const [moyennes, setMoyennes] = useState<MoyenneItem[]>(defaulMoyenneCardData);

  // const { socket, sensorData } = useSocket();

  useEffect(() => {
    async function fetchAverages() {
      try {
        // Simulation d'une entrée de l'API
        // const data: Average = simulateAverageData();

        if (sensorData[0]) {
          const last = sensorData[0];
          // console.log("=> ", last);
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
        <div key={item.name} className="shadow-lg rounded-lg border">
          <article className="text-center rounded-xl bg-muted/50">
            <h2 className="">{item.name}</h2>
            <div className="rounded-full flex justify-center items-center">
              <Image
                src={item.icon as string}
                width={50}
                height={50}
                alt={item.name}
              />
            </div>
            <p>
              {item.value === 0 ? "0.0" : item.value.toString().slice(0, 5)}
            </p>
          </article>
        </div>
      ))}
    </>
  );
};

export default CapteurDataCardList;
