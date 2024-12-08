import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import TemperatureLiveChart from "./TemperatureLiveChart";
import RealTimeHumiditéChart from "./HumiditeLiveChart";
import RealTimeChart from "./TemperatureLiveChart";

function generateRandomData(min: number, max: number): number {
  return Math.floor(min + Math.random() * (max - min));
}

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
        {/* <TemperatureLiveChart /> */}
        <RealTimeChart
          label="Temperature"
          unit="°C"
          color="#16A34A"
          minThreshold={15}
          maxThreshold={30}
          generateRandomData={() => generateRandomData(10, 35)}
        />
      </TabsContent>
      <TabsContent value="Humidité" className="m-0">
        <RealTimeChart
          label="Humidité"
          unit="%"
          color="#16A34A"
          minThreshold={40}
          maxThreshold={70}
          generateRandomData={() => generateRandomData(35, 90)}
        />
      </TabsContent>
      <TabsContent value="Lumière" className="m-0">
        <RealTimeChart
          label="Lumière"
          unit="Lux"
          color="#16A34A"
          minThreshold={400}
          maxThreshold={700}
          generateRandomData={() => generateRandomData(350, 950)}
        />
      </TabsContent>
      <TabsContent value="Pression_Atm" className="m-0">
        <RealTimeChart
          label="Pression_Atm"
          unit="Bar"
          color="#16A34A"
          minThreshold={400}
          maxThreshold={700}
          generateRandomData={() => generateRandomData(350, 950)}
        />
      </TabsContent>
      <TabsContent value="Humidité_Sol" className="m-0">
        <RealTimeChart
          label="Humidité_Sol"
          unit="%"
          color="#16A34A"
          minThreshold={40}
          maxThreshold={70}
          generateRandomData={() => generateRandomData(35, 90)}
        />
      </TabsContent>
      <TabsContent value="Co2" className="m-0">
        <RealTimeChart
          label="Co2"
          unit="ppm"
          color="#16A34A"
          minThreshold={300}
          maxThreshold={400}
          generateRandomData={() => generateRandomData(250, 450)}
        />
      </TabsContent>
    </Tabs>
  );
};

export default LiveDataCharts;
