import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import RealTimeChart from "./TemperatureLiveChart";

function generateRandomData(min: number, max: number): number {
  return Math.floor(min + Math.random() * (max - min));
}

const metrics = [
  {
    key: "Temperature",
    title: "Graphe de Température",
    unit: "°C",
    graphDomain: [0, 40],
  },
  {
    key: "Humidité",
    title: "Graphe d'Humidité",
    unit: "%",
    graphDomain: [0, 100],
  },
  {
    key: "Lumière",
    title: "Graphe de la Lumière",
    unit: "lux",
    graphDomain: [0, 60000],
  },
  {
    key: "Pression atmosphérique",
    title: "Graphe de Pression Atmosphérique",
    unit: "bar",
    graphDomain: [0, 1050],
  },
  {
    key: "Humidite du sol",
    title: "Graphe de l'Humidité du Sol",
    unit: "",
    graphDomain: [0, 0],
  },
  {
    key: "Co2",
    title: "Graphe de CO2",
    unit: "ppm",
    graphDomain: [0, 2000],
  },
];

const LiveDataCharts = () => {
  return (
    <Tabs defaultValue="Temperature">
      <TabsList className="flex justify-end w-full sticky top-0 bg-gray-300 z-10 py-6 px-5 rounded-bl-none rounded-br-none">
        {metrics.map((metric) => (
          <TabsTrigger key={metric.key} value={metric.key}>
            {metric.key}
          </TabsTrigger>
        ))}
      </TabsList>
      {metrics.map((metric) => (
        <TabsContent
          key={metric.key}
          value={metric.key}
          className="bg-[#D1D5DB] m-0 pb-5 px-5"
        >
          <RealTimeChart
            label={metric.title}
            unit={metric.unit}
            color="#16A34A"
            minThreshold={metric.graphDomain[0]}
            maxThreshold={metric.graphDomain[1]}
            graphDomain={metric.graphDomain}
            generateRandomData={() =>
              generateRandomData(metric.graphDomain[0], metric.graphDomain[1])
            }
          />
        </TabsContent>
      ))}
    </Tabs>
  );
};

export default LiveDataCharts;
