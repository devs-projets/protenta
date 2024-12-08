"use client";

import React, { useEffect, useState } from "react";
import MoyenneCard from "./moyennes/MoyenneCard";
import Link from "next/link";
import { defaulMoyenneCardData } from "@/mockData/defaultMoyenneCardData";
import { MoyenneItem } from "@/types/moyenneItem";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

const MoyennesCardList = () => {
  const [moyennes, setMoyennes] = useState<MoyenneItem[]>(
    defaulMoyenneCardData
  );
  const { data: latestData } = useSelector(
    (state: RootState) => state.latestData
  );

  useEffect(() => {
    if (latestData) {
      setMoyennes((prevMoyennes) =>
        prevMoyennes.map((item) => {
          switch (item.name) {
            case "Température":
              return { ...item, value: latestData.MeanTemp };
            case "Humidité":
              return { ...item, value: latestData.MeanHumidity };
            case "Lumière":
              return { ...item, value: latestData.MeanLum };
            case "Pression atm":
              return { ...item, value: latestData.MeanPress };
            case "Humidité sol":
              return { ...item, value: 0 };
            case "CO₂":
              return { ...item, value: latestData.MeanCo2 };
            default:
              return item;
          }
        })
      );
    }
  }, [latestData]);

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
