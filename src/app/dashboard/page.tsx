"use client";

import ActionnaireTemoin from "@/components/actionnaires/ActionnaireTemoin";
import MoyennesCardList from "@/components/MoyennesCardList";
import { SensorLog } from "@/components/view/IndividualCapteurLogs";
import { MoyenneTabs } from "@/components/view/MoyenneTab";
import React, { useEffect, useState } from "react";
import { getStoredSensorData } from "@/lib/fetchData/getMonitorData";

const Experts = () => {
  const [fetchedData, setFetchedData] = useState<SensorLog[] | undefined>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getStoredSensorData("minute");
        console.log(data)
        setFetchedData(data || []);
      } catch (error) {
        console.error("Error in fetching data:", error);
        setFetchedData([]);
      }
    }
  
    fetchData();
  }, []);

  console.log(fetchedData)
  

  return (
    <div className="flex flex-1 flex-col gap-4 p-4 pt-0 h-screen">
      <h1 className="text-center text-2xl font-bold">Moyennes</h1>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-6">
        {/* TODO: Fait que l'autre ait son propre MoyennesCardsList */}
        <MoyennesCardList sensorData={undefined} capteurID="N/A" />
      </div>

      <ActionnaireTemoin />

      <div className="flex-1 rounded-xl bg-muted/50 p-5 mb-10">
        <div className="h-full overflow-y-auto">
          <MoyenneTabs />
        </div>
      </div>
    </div>
  );
};

export default Experts;
