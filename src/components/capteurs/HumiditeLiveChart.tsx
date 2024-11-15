"use client";

import * as React from "react";
import { CartesianGrid, Line, LineChart, YAxis, ReferenceLine } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useSocket } from "@/context/SocketContext";

const MAX_DATA_POINTS = 60; // Nombre maximal de points affichés dans le graphique

const chartConfig = {
  views: { label: "Page Views" },
  desktop: { label: "Desktop", color: "hsl(var(--chart-1))" },
  mobile: { label: "Mobile", color: "hsl(var(--chart-2))" },
};

export default function RealTimeHumiditéChart() {
  const { sensorData } = useSocket(); // Données provenant du capteur via le contexte
  const [chartData, setChartData] = React.useState<{ date: string; humidity: number }[]>(
    Array.from({ length: MAX_DATA_POINTS }, (_, index) => ({
      date: `-${MAX_DATA_POINTS - index}`, // Initialisation avec des dates fictives
      humidity: 0, // Valeur initiale vide
    }))
  );

  // Fonction pour ajouter les nouvelles données au graphique
  const addSensorDataToChart = (humidity: number) => {
    const date = new Date().toISOString(); // Timestamp actuel
    setChartData((prevData) => {
      const newData = { date, humidity };
      // Supprimer l'ancien point et ajouter le nouveau
      return [...prevData.slice(1), newData];
    });
  };

  // Effet pour surveiller les données provenant du capteur
  React.useEffect(() => {
    if (sensorData && Array.isArray(sensorData)) {
      // Trouver l'élément avec `localName` égal à "I2"
      const sensor = sensorData.find((item) => item.localName === "I2");
      if (sensor) {
        addSensorDataToChart(sensor.temperature); // Ajouter la température au graphique
      }
    }
  }, [sensorData]); // Exécute l'effet à chaque mise à jour de `sensorData`

  // Valeurs plafond et seuils
  const maxTemperature = 30; // Température maximale (plafond)
  const minTemperature = 15; // Température minimale (seuil bas)

  return (
    <ChartContainer config={chartConfig} className="aspect-auto h-[250px] w-full">
      <LineChart
        data={chartData}
        margin={{ left: 20, right: 20 }}
        className="bg-gray-100 rounded-lg"
      >
        <CartesianGrid strokeDasharray="3 3" vertical={false} />
        <YAxis
          tickFormatter={(value) => `${value} °C`} // Formatage des ticks avec l'unité °C
          domain={['dataMin - 5', 'dataMax + 5']} // Étendre les bornes de l'axe Y
          allowDataOverflow
          tickCount={6}
          tickLine={false}
          axisLine={{ stroke: "#ccc" }}
          stroke="#ccc"
        />
        <ReferenceLine y={maxTemperature} label="Plafond" stroke="#FF0000" strokeDasharray="4 4" />
        <ReferenceLine y={minTemperature} label="Seuil Minimal" stroke="#00FF00" strokeDasharray="4 4" />

        <ChartTooltip
          content={
            <ChartTooltipContent
              className="w-[150px]"
              nameKey="temperature"
              labelFormatter={(value) =>
                new Date(value).toLocaleTimeString("en-US", {
                  hour: "2-digit",
                  minute: "2-digit",
                  second: "2-digit",
                })
              }
            />
          }
        />
        <Line
          type="monotone"
          dataKey="temperature"
          stroke="#FF6347"
          strokeWidth={3}
          dot={(props) => {
            const { cx, cy, value } = props;
            const isPlaceholder = value === 0; // Points factices
            return (
              <circle
                cx={cx}
                cy={cy}
                r={4}
                strokeWidth={2}
                fill={isPlaceholder ? "transparent" : "#FF6347"}
                stroke={isPlaceholder ? "transparent" : "#FF6347"}
              />
            );
          }}
          isAnimationActive={false}
        />
      </LineChart>
    </ChartContainer>
  );
}
