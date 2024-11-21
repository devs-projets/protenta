"use client";

import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { ISensorStoredData } from "@/types/storedData";

// Fonction pour transformer les données de `sensorData` en format graphique
const transformSensorData = (sensorData: ISensorStoredData[], key: string) => {
  return sensorData.map((entry) => ({
    date: new Date(entry.timestamp).toLocaleDateString("fr-FR", {
      day: "2-digit",
      month: "2-digit",
    }),
    value: (() => {
      switch (key) {
        case "Temperature":
          return entry.averageTemp ? entry.averageTemp / 100 : 0; // Conversion en °C
        case "Humidité":
          return entry.averageHumidity ? entry.averageHumidity / 100 : 0; // En pourcentage
          case "Lumière":
            return entry.averageLightA ? entry.averageLightA / 1000 : 0
        case "Pression atmosphérique":
          return entry.averagePressure ? entry.averagePressure / 1000 : 0; // Conversion en Bar
          case "Humidite du sol":
            return entry.averageSol ? entry.averageSol : 0;
        case "Co2":
          return entry.averageIaq || 0; // ppm
        default:
          return 0;
      }
    })(),
  }));
};

// Composant pour afficher un graphique
const Chart = ({
  title,
  dataKey,
  data,
}: {
  title: string;
  dataKey: string;
  data: { date: string; value: number }[];
}) => {
  const chartConfig = {
    [dataKey]: {
      label: title,
      color: "hsl(var(--chart-1))",
    },
  };

  return (
    <Card className="my-2">
      <CardHeader className="space-y-0 pb-0">
        <CardTitle>{title}</CardTitle>
        <CardDescription>
          {title} enregistrée pour les 7 derniers jours
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="max-h-60 w-full">
          <AreaChart data={data} margin={{ left: 12, right: 12 }}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />
            <Area
              dataKey="value"
              type="natural"
              fill="var(--color-temperature)"
              fillOpacity={0.4}
              stroke="var(--color-temperature)"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
      <CardFooter>
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2">
            <div className="flex items-center gap-2 font-medium leading-none">
              Données du{" "}
              {data.length > 0
                ? `${data[0].date} au ${data[data.length - 1].date}`
                : "N/A"}
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};

// Composant principal
export function ChartComponent({
  sensorData,
}: {
  sensorData: ISensorStoredData[];
}) {
  // Transformation des données pour chaque mesure
  const temperatureData = transformSensorData(sensorData, "Temperature");
  const humiditeData = transformSensorData(sensorData, "Humidité");
  const pressAtmData = transformSensorData(
    sensorData,
    "Pression atmosphérique"
  );
  const co2Data = transformSensorData(sensorData, "Co2");
  const lumiere = transformSensorData(sensorData, "Lumière");
  const HumSol = transformSensorData(sensorData, "Humidite du sol");

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <div className="flex-1 overflow-y-auto">
        <div className="flex flex-col px-5">
          <Chart
            title="Graphe de Température"
            dataKey="Temperature"
            data={temperatureData}
          />
          <Chart
            title="Graphe d'Humidité"
            dataKey="Humidité"
            data={humiditeData}
          />
          <Chart
            title="Graphe de la Lumière"
            dataKey="Humidité"
            data={lumiere}
          />
          <Chart
            title="Graphe de Pression Atmosphérique"
            dataKey="Pression atmosphérique"
            data={pressAtmData}
          />
          <Chart title="Graphe de l'Humidité du Sol" dataKey="Co2" data={HumSol} />
          <Chart title="Graphe de CO2" dataKey="Co2" data={co2Data} />
        </div>
      </div>
    </div>
  );
}
