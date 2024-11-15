import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import TemperatureLiveChart from "./TemperatureLiveChart";

const LiveDataCharts = () => {
  return (
    <Tabs defaultValue="Temperature">
      <TabsList className="flex justify-end w-full sticky top-0 bg-gray-300 z-10 py-6 px-5 rounded-bl-none rounded-br-none">
        <TabsTrigger value="Temperature">Temperature</TabsTrigger>
        <TabsTrigger value="Humidité">Humidité</TabsTrigger>
        <TabsTrigger value="Lumière">Lumière</TabsTrigger>
        <TabsTrigger value="Pression_Atm">Pression Atm</TabsTrigger>
        <TabsTrigger value="Humidité_Sol">Humidité sol</TabsTrigger>
        <TabsTrigger value="Co2">CO₂</TabsTrigger>
      </TabsList>
      <TabsContent value="Temperature" className="bg-[#D1D5DB] m-0 pb-5 px-5">
        <TemperatureLiveChart />
      </TabsContent>
      <TabsContent value="Humidité" className="bg-red-300 m-0">
        Humidité
      </TabsContent>
      <TabsContent value="Lumière" className="bg-red-300 m-0">
        Lumière
      </TabsContent>
      <TabsContent value="Pression_Atm" className="bg-red-300 m-0">
        PressionAtm
      </TabsContent>
      <TabsContent value="Humidité_Sol" className="bg-red-300 m-0">
        Humidité Sol
      </TabsContent>
      <TabsContent value="Co2" className="bg-red-300 m-0">
        CO₂
      </TabsContent>
    </Tabs>
  );
};

export default LiveDataCharts;
