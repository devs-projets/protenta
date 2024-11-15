import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Logs, ChartNetwork } from "lucide-react";
import { useSocket } from "@/context/SocketContext";
import IndividualCapteurLogs from "@/components/view/IndividualCapteurLogs";
import { useParams } from "next/navigation";
import LiveDataCharts from "../capteurs/LiveDataCharts";

const CapteurTab = () => {
  const { sensorData, connect, disconnect } = useSocket();
  const localName = useParams().capteurId as string;

  return (
    <Tabs defaultValue="Journal">
      <TabsList className="flex justify-end w-full sticky top-0 bg-gray-300 z-10 py-6 px-5">
        <TabsTrigger value="Journal">
          <Logs />
          Journal
        </TabsTrigger>
        <TabsTrigger value="CartNetwork">
          <ChartNetwork />
          Graphique
        </TabsTrigger>
      </TabsList>
      <TabsContent value="Journal">
        <IndividualCapteurLogs
          sensorData={sensorData}
          capteurID={localName as string}
        />
      </TabsContent>
      <TabsContent value="CartNetwork">
        <LiveDataCharts />
      </TabsContent>
    </Tabs>
  );
};

export default CapteurTab;
