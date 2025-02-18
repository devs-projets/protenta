import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import RealTimeChart from "./TemperatureLiveChart";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { ILatestData } from "@/types/latestDataState";

// function generateRandomData(min: number, max: number): number {
//   return Math.floor(min + Math.random() * (max - min));
// }

export interface IMetrics {
  key: string;
  code: string;
  title: string;
  unit: string;
  graphDomain: number[];
  thresholdKey: string;
}

const metrics = [
  {
    key: "Temperature",
    code: "temperature",
    title: "Graphe de Température",
    unit: "°C",
    graphDomain: [0, 40],
    thresholdKey: "SeuilTemp",
  },
  {
    key: "Humidité",
    code: "humidity",
    title: "Graphe d'Humidité",
    unit: "%",
    graphDomain: [0, 100],
    thresholdKey: "SeuilHumidity",
  },
  {
    key: "Lumière",
    code: "light_A",
    title: "Graphe de la Lumière",
    unit: "lux",
    graphDomain: [0, 60000],
    thresholdKey: "SeuilLum",
  },
  {
    key: "Pression atmosphérique",
    code: "pressure",
    title: "Graphe de Pression Atmosphérique",
    unit: "bar",
    graphDomain: [0, 1050],
    thresholdKey: "SeuilPression",
  },
  {
    key: "Humidite du sol",
    code: "sol",
    title: "Graphe de l'Humidité du Sol",
    unit: "",
    graphDomain: [0, 0],
  },
  {
    key: "Co2",
    code: "co2",
    title: "Graphe de CO2",
    unit: "ppm",
    graphDomain: [0, 2000],
    thresholdKey: "SeuilCo2",
  },
];

const parseThreshold = (value: string | number | boolean | null): number => {
  if (typeof value === "string") {
    return parseInt(value, 10);
  }
  if (typeof value === "number") {
    return value;
  }
  return 0;
};

const LiveDataCharts = () => {
  const { data: latestData } = useSelector(
    (state: RootState) => state.latestData
  );

  return (
    <Tabs defaultValue="Temperature">
      <TabsList className="flex flex-wrap h-auto justify-end w-full sticky top-0 bg-gray-300 z-10 py-2 px-5 rounded-bl-none rounded-br-none">
        {metrics.map((metric) => (
          <TabsTrigger key={metric.key} value={metric.key}>
            {metric.key}
          </TabsTrigger>
        ))}
      </TabsList>
      {metrics.map((metric) => {
        // Récupérer et convertir les seuils
        const minThreshold =
          latestData && metric.thresholdKey
            ? parseThreshold(
                latestData[`${metric.thresholdKey}_min` as keyof ILatestData]
              )
            : metric.graphDomain[0];
        const maxThreshold =
          latestData && metric.thresholdKey
            ? parseThreshold(
                latestData[`${metric.thresholdKey}_max` as keyof ILatestData]
              )
            : metric.graphDomain[1];
        return (
          <TabsContent
            key={metric.key}
            value={metric.key}
            className="bg-[#D1D5DB] m-0 pb-5 px-5"
          >
            <RealTimeChart
              code={metric.code}
              // label={metric.title}
              unit={metric.unit}
              color="#16A34A"
              minThreshold={minThreshold}
              maxThreshold={maxThreshold}
              graphDomain={metric.graphDomain}
              // generateRandomData={() =>
              //   generateRandomData(metric.graphDomain[0], metric.graphDomain[1])
              // }
            />
          </TabsContent>
        );
      })}
    </Tabs>
  );
};

export default LiveDataCharts;
