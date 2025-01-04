"use client";

import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";
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
import { units } from "./Table";

// Configuration des métriques
export const metrics = [
  {
    key: "Temperature",
    title: "Graphe de Température",
    unit: "°C",
    graphDomain: [10, 40],
  },
  {
    key: "Humidité",
    title: "Graphe d'Humidité",
    unit: "%",
    graphDomain: [30, 100],
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
    graphDomain: [950, 1050],
  },
  {
    key: "Humidite du sol",
    title: "Graphe de l'Humidité du Sol",
    unit: "",
    graphDomain: [0, 0],
  },
  { key: "Co2", title: "Graphe de CO2", unit: "ppm", graphDomain: [300, 2000] },
];

// Fonction pour transformer les données de `sensorData` en format graphique
const generateHourlyTimeRange = () => {
  const now = new Date();
  const hours = [];
  for (let i = 0; i < 24; i++) {
    const hour = new Date();
    hour.setHours(i, 0, 0, 0);
    hours.push(
      hour.toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" })
    );
  }
  return hours;
};

const transformSensorData = (
  sensorData: ISensorStoredData[],
  key: string,
  visualPeriod: string
) => {
  const formattedData = sensorData.map((entry) => ({
    date:
      visualPeriod === "Jours"
        ? new Date(entry.timestamp).toLocaleDateString("fr-FR", {
            day: "2-digit",
            month: "2-digit",
          })
        : new Date(entry.timestamp).toLocaleString("fr-FR", {
            hour: "2-digit",
            minute: "2-digit",
          }),
    value: (() => {
      switch (key) {
        case "Temperature":
          return entry.averageTemp ? entry.averageTemp / 100 : 0;
        case "Humidité":
          return entry.averageHumidity ? entry.averageHumidity / 100 : 0;
        case "Lumière":
          return entry.averageLightA ? entry.averageLightA / 1000 : 0;
        case "Pression atmosphérique":
          return entry.averagePressure ? entry.averagePressure / 1000 : 0;
        case "Humidite du sol":
          return entry.averageSol || 0;
        case "Co2":
          return entry.averageIaq || 0;
        default:
          return 0;
      }
    })(),
  }));

  if (visualPeriod === "Heures") {
    const fullTimeRange = generateHourlyTimeRange();
    const dataMap = new Map(
      formattedData.map((item) => [item.date, item.value])
    );

    return fullTimeRange.map((time) => ({
      date: time,
      value: dataMap.get(time) || 0, // Valeur par défaut si absente
    }));
  }

  return formattedData;
};

// Composant pour afficher un graphique
const Chart = ({
  title,
  dataKey,
  data,
  graphDomain,
  unit,
  displayDateRange,
}: {
  title: string;
  dataKey: string;
  data: { date: string; value: number }[];
  graphDomain: number[];
  unit: string;
  displayDateRange: string;
}) => {
  const chartConfig = {
    [dataKey]: {
      label: title,
      color: "hsl(var(--chart-1))",
    },
  };

  return (
    <Card className="my-2">
      <CardHeader className="space-y-0 pb-3">
        <CardTitle>{title}</CardTitle>
        <CardDescription>
          {title} enregistrée {displayDateRange} en {unit === "" ? "N/A" : unit}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <AreaChart
            data={data}
            margin={{ left: 12, right: 12 }}
            className="bg-gray-100 rounded-lg"
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
            />
            <YAxis
              domain={graphDomain}
              tickFormatter={(value) => `${value}`}
              tickLine={false}
              axisLine={{ stroke: "#ccc" }}
              stroke="#ccc"
            />
            <ChartTooltip content={<ChartTooltipContent indicator="line" />} />
            <Area
              dataKey="value"
              type="monotone"
              fillOpacity={0}
              stroke="#16A34A"
              strokeWidth={3}
              dot={(props) => {
                const { cx, cy, value } = props;
                return (
                  <circle
                    cx={cx}
                    cy={cy}
                    r={4}
                    strokeWidth={2}
                    fill={value === 0 ? "transparent" : "#16A34A"}
                    stroke={value === 0 ? "transparent" : "#16A34A"}
                  />
                );
              }}
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
      <CardFooter>
        <div className="text-sm">
          {data.length > 0
            ? `Données du ${data[0].date} au ${data[data.length - 1].date}`
            : "Aucune donnée disponible"}
        </div>
      </CardFooter>
    </Card>
  );
};

// Composant principal
export function ChartComponent({
  visualisationPeriode,
  displayDateRange,
  sensorData,
}: {
  visualisationPeriode: string;
  displayDateRange: string;
  sensorData: ISensorStoredData[];
}) {
  return (
    <div className="flex flex-col h-full overflow-hidden">
      <div className="flex-1 overflow-y-auto">
        <div className="flex flex-col px-5">
          {metrics.map(({ key, title, graphDomain, unit }) => {
            const data = transformSensorData(
              sensorData,
              key,
              visualisationPeriode
            );
            return (
              <Chart
                key={key}
                title={title}
                dataKey={key}
                data={data}
                graphDomain={graphDomain}
                unit={unit}
                displayDateRange={displayDateRange}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
