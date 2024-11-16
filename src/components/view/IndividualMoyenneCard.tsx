"use client";

import { useParams } from "next/navigation";
import React, { useState } from "react";
import Co2Icon from "@/assets/icons/co2.png";
import HumiditeIcon from "@/assets/icons/humidite.png";
import SolHumiditeIcon from "@/assets/icons/solHumidite.png";
import LumiereIcon from "@/assets/icons/lumiere.png";
import PressionAtmoIcon from "@/assets/icons/pressionAtmo.png";
import TemperatureIcon from "@/assets/icons/temperature.png";
// import { moyennes, MoyenneItem } from "@/components/MoyennesCardList";
import Image from "next/image";
import { MoyenneItem } from "../MoyennesCardList";

const IndividualMoyenneCard = () => {
  const [moyennes, setMoyennes] = useState<MoyenneItem[]>([
    { accessParam: "temperature", name: "Température", icon: TemperatureIcon, value: 0.0 },
    { accessParam: "humidite", name: "Humidité", icon: HumiditeIcon, value: 0.0 },
    { accessParam: "lumiere", name: "Lumière", icon: LumiereIcon, value: 0.0 },
    { accessParam: "pressionatm", name: "Pression atmosphérique", icon: PressionAtmoIcon, value: 0.0 },
    { accessParam: "humditesol", name: "Humidite du sol", icon: SolHumiditeIcon, value: 0.0 },
    { accessParam: "co2", name: "CO₂", icon: Co2Icon, value: 0.0 },
  ]);

  if (!moyennes) {
    return null;
  }

  const param = useParams().moyenneId;
  const decodedParam = decodeURIComponent(param as string);
  const item = moyennes.filter((x) => x.accessParam === param)[0];
  return (
    <div>
      <h1 className="text-2xl font-bold text-center my-5">
        Moyenne | {item?.name}
      </h1>
      <div className="grid md:grid-cols-3 gap-5 md:mx-5">
        <div className="text-center rounded-xl bg-muted/50">
          <div className="rounded-full flex justify-center items-center">
            <Image
              src={item?.icon as string}
              width={100}
              height={100}
              alt={item?.name as string}
            />
          </div>
        </div>

        <div className="flex flex-col justify-center">
          <h2 className="font-bold">Info 1</h2>
          <p>Data de l'info 1</p>
        </div>
        <div className="flex flex-col justify-center">
          <h2 className="font-bold">Info 2</h2>
          <p>Data de l'info 2</p>
        </div>
      </div>
    </div>
  );
};

export default IndividualMoyenneCard;
