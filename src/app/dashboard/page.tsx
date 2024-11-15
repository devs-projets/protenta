"use client"

import MoyennesCardList from "@/components/MoyennesCardList";
import { SensorLog } from "@/components/view/IndividualCapteurLogs";
import { MoyenneTabs } from "@/components/view/MoyenneTab";
import React, { useEffect, useState } from "react";

const Experts = () => {
  const [fetchedData, setFetchedData] = useState<SensorLog[]>()

  async function getStoredSensorData(period: string) {
    // try {
    //   // const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/monitor?period=${period}`);
    //   // const response = await fetch(`http://192.168.1.199:3000/monitor?period=minute`);
    //   // const response = await fetch(`http://192.168.1.199:3000/monitor?period=hour`);
    //   const response = await fetch(`http://192.168.1.199:3000/monitor?period=day`);
    //   if (response.ok) {
    //     const data: SensorLog[] = await response.json();
    //     setFetchedData(data);
    //     console.log("Fetched data:", data);
    //   } else {
    //     console.error("Failed to fetch data:", response.statusText);
    //   }
    // } catch (error) {
    //   console.error("An error occurred while fetching data:", error);
    // }
  }

  useEffect(() => {
    // http://192.168.1.199:3000/monitor?period=minute
    getStoredSensorData('munite')
  },[])

  return (
    <div className="flex flex-1 flex-col gap-4 p-4 pt-0 h-screen">
      <h1 className="text-center text-2xl font-bold">Moyennes</h1>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-6">
        {/* TODO: Fait que l'autre ait son propre MoyennesCardsList */}
        <MoyennesCardList sensorData={undefined} capteurID="N/A" />
      </div>
      <div className="border py-2 rounded-lg shadow-lg">
        <h1 className="text-center text-2xl font-bold mb-5">Actionnaires</h1>
        <div className="flex justify-center items-center gap-5 flex-wrap">
            <div className="bg-slate-200 shadow-lg rounded-lg flex flex-col justify-center items-center py-2 px-4">
              <h2>S1</h2>
              <p>Description</p>
              <div>
                <div className="h-10 w-10 bg-green-500 rounded-full mt-2"></div>
              </div>
            </div>
        </div>
      </div>
      <div className="flex-1 rounded-xl bg-muted/50 p-5 mb-10">
        <div className="h-full overflow-y-auto">
          <MoyenneTabs />
        </div>
      </div>
    </div>
  );
};

export default Experts;
