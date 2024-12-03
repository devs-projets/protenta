"use client";

import CapteurDataCardList from "@/components/capteurs/CapteurDataCardList";
import MoyennesCardList from "@/components/MoyennesCardList";
import CapteurTab from "@/components/capteurs/CapteurTab";
import IndividualCapteurCard from "@/components/capteurs/IndividualCapteurCard";
import { useSocket } from "@/context/SocketContext";
import { useParams } from "next/navigation";
import React, { useEffect } from "react";

const CapteurId = () => {
  const localName = useParams().capteurId as string;
  const { sensorData, disconnect } = useSocket();

  // console.log("From capteur id : ", sensorData)

  useEffect(() => {
    return () => {
      disconnect();
    };
  }, [disconnect]);

  return (
    <div>
      <IndividualCapteurCard sensorData={sensorData} localName={localName} />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-6 px-3">
        <CapteurDataCardList sensorData={sensorData} />
        {/* <MoyennesCardList sensorData={sensorData} capteurID={localName as string} /> */}
      </div>
      <div className="flex-1 overflow-hidden">
        <div className="bg-muted/50 rounded-xl p-5 mb-5">
          <div className="flex flex-col h-full overflow-hidden">
            <div className="flex-1 overflow-y-auto">
              <div className="flex flex-col">
                <CapteurTab />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CapteurId;
