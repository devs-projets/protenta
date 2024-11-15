"use client";

import MoyennesCardList from "@/components/MoyennesCardList";
import CapteurTab from "@/components/view/CapteurTab";
import IndividualCapteurCard from "@/components/view/IndividualCapteurCard";
import IndividualCapteurLogs from "@/components/view/IndividualCapteurLogs";
import { useSocket } from "@/context/SocketContext";
import { useParams } from "next/navigation";
import React, { useEffect } from "react";

const CapteurId = () => {
  const localName = useParams().capteurId as string;
  const { sensorData, connect, disconnect } = useSocket();

  // console.log("From capteur id : ", sensorData)

  useEffect(() => {
    // connect(); // Connecter lors du montage

    return () => {
      disconnect(); // Déconnecter lors du démontage
    };
  }, []);

  return (
    <div>
      {/* <h1 className="text-4xl text-center font-bold my-5">Capteur {localName}</h1> */}
      <IndividualCapteurCard sensorData={sensorData} localName={localName} />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-6">
        <MoyennesCardList sensorData={sensorData} capteurID={localName as string} />
      </div>
      <div className="flex-1 overflow-hidden">
        <div className="bg-muted/50 rounded-xl p-5 mb-5">
          <div className="flex flex-col h-full overflow-hidden">
            <div className="flex-1 overflow-y-auto">
              <div className="flex flex-col">
                <CapteurTab />
                {/* <IndividualCapteurLogs sensorData={sensorData} capteurID={localName as string} /> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CapteurId;
