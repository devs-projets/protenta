"use client";

import {
  Area,
  AreaChart,
  CartesianGrid,
  ReferenceLine,
  XAxis,
  YAxis,
} from "recharts";
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
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { useEffect, useState } from "react";
import { ILatestData } from "@/types/latestDataState";
import { DateRange } from "react-day-picker";

// Configuration des métriques
export const metrics = [
  {
    key: "Temperature",
    code: "temperature",
    title: "Graphe de Température",
    unit: "°C",
    graphDomain: [10, 40],
  },
  {
    key: "Humidité",
    code: "humidite",
    title: "Graphe d'Humidité",
    unit: "%",
    graphDomain: [30, 100],
  },
  {
    key: "Lumière",
    code: "lumiere",
    title: "Graphe de la Lumière",
    unit: "lux",
    graphDomain: [0, 60000],
  },
  {
    key: "Pression atmosphérique",
    code: "pressionatm",
    title: "Graphe de Pression Atmosphérique",
    unit: "bar",
    graphDomain: [950, 1050],
  },
  {
    key: "Humidite du sol",
    code: "humditesol",
    title: "Graphe de l'Humidité du Sol",
    unit: "",
    graphDomain: [0, 0],
  },
  {
    key: "Co2",
    code: "co2",
    title: "Graphe de CO2",
    unit: "ppm",
    graphDomain: [300, 2000],
  },
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

// Fonction pour transformer les données de `sensorData` en format graphique
const generateDaylyTimeRange = (timeRange: DateRange | undefined) => {
  if (!timeRange || !timeRange.from || !timeRange.to) {
    // Si aucun intervalle n'est fourni, générer les 30 derniers jours par défaut
    const now = new Date();
    const days = [];
    for (let i = 29; i >= 0; i--) {
      const day = new Date();
      day.setDate(now.getDate() - i);
      days.push(
        day.toLocaleDateString("fr-FR", { day: "2-digit", month: "2-digit" })
      );
    }
    return days.reverse();
  }

  const from = new Date(timeRange.from);
  const to = new Date(timeRange.to);
  const days = [];

  // Calculer le nombre de jours dans l'intervalle
  const diffTime = Math.abs(to.getTime() - from.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  // Si l'intervalle est inférieur à 30 jours, compléter avec des jours supplémentaires
  if (diffDays < 30) {
    const extraDays = 30 - diffDays;
    for (let i = extraDays; i > 0; i--) {
      const day = new Date(from);
      day.setDate(from.getDate() - i);
      days.push(
        day.toLocaleDateString("fr-FR", { day: "2-digit", month: "2-digit" })
      );
    }
  }

  // Ajouter les jours de l'intervalle
  for (let i = 0; i <= diffDays; i++) {
    const day = new Date(from);
    day.setDate(from.getDate() + i);
    days.push(
      day.toLocaleDateString("fr-FR", { day: "2-digit", month: "2-digit" })
    );
  }

  return days;
};

const transformSensorData = (
  sensorData: ISensorStoredData[],
  key: string,
  visualPeriod: string,
  timeRange: any
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
          return entry.averageTemp || 0;
        case "Humidité":
          return entry.averageHumidity || 0;
        case "Lumière":
          return entry.averageLightA || 0;
        case "Pression atmosphérique":
          return entry.averagePressure || 0;
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

  if (visualPeriod === "Jours") {
    const fullTimeRange = generateDaylyTimeRange(timeRange);
    const dataMap = new Map(
      formattedData.map((item) => [item.date, item.value])
    );

    return fullTimeRange.map((time) => ({
      date: time,
      value: dataMap.get(time) || 0,
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
  const [min, setMin] = useState<number>(0);
  const [max, setMax] = useState<number>(0);
  const { data: MonitorLastData } = useSelector(
    (state: RootState) => state.latestData
  );

  useEffect(() => {
    if (MonitorLastData) {
      const limitesList = Object.keys(MonitorLastData)
        .filter((key) => key.startsWith("Seuil"))
        .reduce<{ [key: string]: number }>((obj, key) => {
          const value = MonitorLastData[key as keyof ILatestData];
          if (typeof value === "number") {
            obj[key.replace("Seuil", "")] = value;
          }
          return obj;
        }, {});

      switch (dataKey) {
        case "Temperature":
          setMin(limitesList["Temp_min"]);
          setMax(limitesList["Temp_max"]);
          break;
        case "Humidité":
          setMin(limitesList["Humidity_min"]);
          setMax(limitesList["Humidity_max"]);
          break;
        case "Lumière":
          setMin(limitesList["Lum_min"]);
          setMax(limitesList["Lum_max"]);
          break;
        case "Pression atmosphérique":
          setMin(limitesList["Pression_min"]);
          setMax(limitesList["Pression_max"]);
          break;
        case "Co2":
          setMin(limitesList["Co2_min"]);
          setMax(limitesList["Co2_max"]);
          break;
        default:
          setMin(0);
          setMax(0);
          break;
      }
    }
  }, [MonitorLastData]);

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
            <ReferenceLine
              y={max}
              label="Plafond"
              stroke="#FF0000"
              strokeDasharray="4 4"
            />
            <ReferenceLine
              y={min}
              label="Seuil Minimal"
              stroke="#00FF00"
              strokeDasharray="4 4"
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
          {title} enregistrée {displayDateRange} en {unit === "" ? "N/A" : unit}
        </div>
      </CardFooter>
    </Card>
  );
};

// Composant principal
export function ChartComponent({
  type,
  visualisationPeriode,
  displayDateRange,
  timeRange,
  sensorData,
}: {
  type?: string;
  visualisationPeriode: string;
  displayDateRange: string;
  timeRange: Date | DateRange | undefined;
  sensorData: ISensorStoredData[];
}) {
  return (
    <div className="flex flex-col h-full overflow-hidden">
      <div className="flex-1 overflow-y-auto">
        <div className="flex flex-col px-5">
          {metrics.map(({ key, code, title, graphDomain, unit }) => {
            const data = transformSensorData(
              sensorData,
              key,
              visualisationPeriode,
              timeRange
            );

            if(type && type !== code) return null;
            
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
