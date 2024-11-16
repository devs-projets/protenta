"use client";

import ActionnaireTemoin from "@/components/actionnaires/ActionnaireTemoin";
import MoyennesCardList from "@/components/MoyennesCardList";
import { IHourData } from "@/types/hourDara";
import { MoyenneTabs } from "@/components/view/MoyenneTab";
import React, { useEffect, useState } from "react";
import { getStoredSensorData } from "@/lib/fetchData/getMonitorData";

const Experts = () => {
  const [houreData, setHoureData] = useState<IHourData[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getStoredSensorData("hour");
        // console.log(data)
        setHoureData(data || []);
      } catch (error) {
        console.error("Error in fetching data:", error);
        setHoureData([]);
      }
    }
  
    fetchData();
  }, []);

  return (
    <div className="flex flex-1 flex-col gap-4 p-4 pt-0 h-screen">
      <h1 className="text-center text-2xl font-bold">Moyennes</h1>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-6">
        <MoyennesCardList sensorData={houreData} />
      </div>

      <ActionnaireTemoin />

      <div className="flex-1 rounded-xl bg-muted/50 p-5 mb-10">
        <div className="h-full overflow-y-auto">
          <MoyenneTabs sensorData={houreData} />
        </div>
      </div>
    </div>
  );
};

export default Experts;
