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

// Vos données
const dataWithDates = {
  "01/10": {
    Température: "27.37",
    Humidité: "65.79",
    Lumière: "51567.88",
    "Pression atmosphérique": "1015.83",
    "Humidite du sol": "53.92",
    Co2: "838.21",
  },
  "02/10": {
    Température: "19.97",
    Humidité: "42.52",
    Lumière: "46020.9",
    "Pression atmosphérique": "992.08",
    "Humidite du sol": "36.97",
    Co2: "889.09",
  },
  "03/10": {
    Température: "27.38",
    Humidité: "51.27",
    Lumière: "30625.82",
    "Pression atmosphérique": "997.38",
    "Humidite du sol": "63.18",
    Co2: "769.06",
  },
  "04/10": {
    Température: "18.75",
    Humidité: "67.48",
    Lumière: "37878.83",
    "Pression atmosphérique": "997.41",
    "Humidite du sol": "57.03",
    Co2: "784.39",
  },
  "05/10": {
    Température: "20.75",
    Humidité: "62.47",
    Lumière: "57135.16",
    "Pression atmosphérique": "1011.7",
    "Humidite du sol": "31.23",
    Co2: "701.37",
  },
  "06/10": {
    Température: "19.08",
    Humidité: "48.88",
    Lumière: "34195.65",
    "Pression atmosphérique": "1018.28",
    "Humidite du sol": "64.29",
    Co2: "927.52",
  },
  "07/10": {
    Température: "23.65",
    Humidité: "69.16",
    Lumière: "46487.67",
    "Pression atmosphérique": "1003.84",
    "Humidite du sol": "36.13",
    Co2: "740.52",
  },
};

// Fonction pour extraire les données
const extractData = (dataKey: any) => {
  return Object.keys(dataWithDates).map((date) => ({
    date,
    //@ts-ignore
    value: parseFloat(dataWithDates[date][dataKey]),
  }));
};

// Composant pour afficher un graphique
const Chart = ({
  title,
  dataKey,
  data,
}: {
  title: any;
  dataKey: any;
  data: any;
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

const IndividualMoyenneChart = () => {
  const param = useParams().moyenneId;
  const decodedParam = decodeURIComponent(param as string);

  const temperatureData = extractData(decodedParam);
  return (
    <div className="flex-1 overflow-hidden">
      <div className="bg-muted/50 rounded-xl p-5 mb-5">
        <div className="flex flex-col h-full overflow-hidden">
          <div className="flex-1 overflow-y-auto">
            <div className="flex flex-col">
              <Chart
                title="Graphe de Température"
                dataKey="Temperature"
                data={temperatureData}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IndividualMoyenneChart;
