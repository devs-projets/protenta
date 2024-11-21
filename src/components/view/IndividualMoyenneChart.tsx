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
import { useParams } from "next/navigation";
import { ISensorStoredData } from "@/types/storedData";
import { defaulMoyenneCardData } from "@/mockData/defaultMoyenneCardData";

// Fonction pour extraire les données pour chaque type de mesure (paramètre)
const extractData = (sensorData: ISensorStoredData[], dataKey: string) => {
  return sensorData.map((entry) => ({
    date: new Date(entry.timestamp).toLocaleDateString("fr-FR", {
      day: "2-digit",
      month: "2-digit",
    }),
    value: (() => {
      switch (dataKey) {
        case "Température":
          return entry.averageTemp ? entry.averageTemp / 100 : 0; // Conversion en °C
        case "Humidité":
          return entry.averageHumidity ? entry.averageHumidity / 100 : 0; // En %
        case "Lumière":
          return entry.averageLightA ? entry.averageLightA / 1000 : 0; // Conversion en lux
        case "Pression atm":
          return entry.averagePressure ? entry.averagePressure / 1000 : 0; // Conversion en Bar
        case "Humidité sol":
          return entry.averageSol || 0;
        case "CO₂":
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
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>
          {title} enregistrée pour les 7 derniers jours
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="max-h-80 w-full">
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
              Données du 01/10 au 07/10
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};

// Composant principal pour afficher le graphique spécifique basé sur le paramètre
const IndividualMoyenneChart = ({ data }: { data: ISensorStoredData[] }) => {
  const { moyenneId } = useParams(); // Utilisation de useParams() pour obtenir le paramètre
  const thisItem = defaulMoyenneCardData.filter(x => x.accessParam === moyenneId)[0];
  const decodedParam = decodeURIComponent(moyenneId as string); // Décodage du paramètre si nécessaire

  // Extraction des données spécifiques en fonction du paramètre (moyenneId)
  const paramData = extractData(data, thisItem.name);

  return (
    <div className="flex-1 overflow-hidden">
      <div className="bg-muted/50 rounded-xl p-5 mb-5">
        <div className="flex flex-col h-full overflow-hidden">
          <div className="flex-1 overflow-y-auto">
            <div className="flex flex-col">
              <Chart
                title={`Graphe de ${thisItem.name}`}
                dataKey={thisItem.name}
                data={paramData}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IndividualMoyenneChart;
