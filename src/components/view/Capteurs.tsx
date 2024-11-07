'use client';

import React, { useEffect } from "react";
import CardCapteur from "@/components/view/CardCapteur";
import Link from "next/link";
import { useSocket } from "@/context/SocketContext";

export interface CapteurItem {
  id: string;
  name: string;
  temperature: number | undefined;
  humidite: number | undefined;
  humSol: number | undefined;
  pressAtm: number | undefined;
  air: undefined; // TODO : Correct type
  lumiere: number | undefined;
  acc: undefined; // TODO : Correct type
  gyro: undefined; // TODO : Correct type
}

const Capteurs = () => {
  const { sensorData, connect, disconnect } = useSocket();

  console.log("From capteur : ", sensorData)

  useEffect(() => {
    // connect(); // Connecter lors du montage

    return () => {
      disconnect(); // Déconnecter lors du démontage
    };
  }, []);

  const capteurs: CapteurItem[] = Array.from({ length: 15 }, (_, index) => ({
    id: `I${index + 1}`,
    name: `Capteur ${index + 1}`,
    temperature: undefined,
    humidite: undefined,
    humSol: undefined,
    pressAtm: undefined,
    air: undefined,
    lumiere: undefined,
    acc: undefined,
    gyro: undefined,
  }));

  return (
    <div className="flex justify-center items-center gap-5 flex-wrap overflow-auto">
      {capteurs.map((item, index) => (
        <Link
          key={`Capteur${item.id}`}
          href={`/dashboard/capteur/${item.id}`}
          className="rounded-lg"
        >
          <CardCapteur item={item} capteurIndex={index + 1} sensorData={sensorData} />
        </Link>
      ))}
    </div>
  );
};

export default Capteurs;
