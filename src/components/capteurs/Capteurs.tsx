"use client";

import React from "react";
import CardCapteur from "./CardCapteur";
import Link from "next/link";
import { useSocket } from "@/context/SocketContext";
import { defaultSensorData } from "@/mockData/defaultMonitor";
import { ISensorData } from "@/types/monitor";

export interface CapteurItem {
  id: string;
  name: string;
  temperature: number | undefined;
  humidite: number | undefined;
  sol: number | undefined;
  pressAtm: number | undefined;
  air: undefined; // TODO : Correct type
  lumiere: number | undefined;
  acc: undefined; // TODO : Correct type
  gyro: undefined; // TODO : Correct type
}

const Capteurs = () => {
  const { sensorData } = useSocket();

  const capteurs: ISensorData[] = Array.from({ length: 15 }, (_, index) => ({
    ...defaultSensorData,
    id: `I${index + 1}`,
    name: `Capteur ${index + 1}`,
  }));

  return (
    <div className="flex justify-center items-center gap-5 flex-wrap overflow-auto">
      {capteurs.map((item, index) => (
        <Link
          key={`Capteur${item.id}`}
          href={`/dashboard/capteur/${item.id}`}
          className="rounded-lg"
        >
          <CardCapteur
            item={item}
            capteurIndex={index + 1}
            sensorData={sensorData}
          />
        </Link>
      ))}
    </div>
  );
};

export default Capteurs;
