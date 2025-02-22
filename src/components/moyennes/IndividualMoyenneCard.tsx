"use client";

import { useParams } from "next/navigation";
import React from "react";
import Image from "next/image";
import { defaulMoyenneCardData } from "@/mockData/defaultMoyenneCardData";
import { ISensorStoredData } from "@/types/storedData";

const IndividualMoyenneCard = ({ data }: { data: ISensorStoredData[] }) => {
  const param = useParams().moyenneId;
  const item = defaulMoyenneCardData.filter((x) => x.accessParam === param)[0];
  const lastAverageData = data[0] || {};
  const currentDate = lastAverageData.timestamp
    ? new Date(lastAverageData.timestamp).toLocaleDateString()
    : "-- / -- / --";
  const currentHeure = lastAverageData.timestamp
    ? new Date(lastAverageData.timestamp).toLocaleTimeString()
    : "-- : -- : --";

  return (
    <div>
      <h1 className="text-2xl font-bold text-center my-5">
        Moyenne | {item?.name}
      </h1>
      <div className="grid md:grid-cols-3 gap-5 md:mx-auto mb-5 max-w-2xl">
        <div className="text-center rounded-xl bg-gray-300 shadow">
          <div className="rounded-full flex justify-center items-center">
            <Image
              src={item?.icon}
              width={100}
              height={100}
              alt={item?.name as string}
            />
          </div>
        </div>

        <div className="flex flex-col justify-center bg-gray-100 px-5 rounded-lg shadow">
          <h2 className="font-bold">Donnée :</h2>
          <p>{item?.name}</p>
        </div>
        <div className="flex flex-col justify-center bg-gray-100 px-5 rounded-lg shadow">
          <h2 className="font-bold">Calculé le :</h2>
          <p>
            {currentDate} à {currentHeure}
          </p>
        </div>
      </div>
    </div>
  );
};

export default IndividualMoyenneCard;
