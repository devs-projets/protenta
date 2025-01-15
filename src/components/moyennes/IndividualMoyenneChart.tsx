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
import { useParams } from "next/navigation";
import { ISensorStoredData } from "@/types/storedData";
import { defaulMoyenneCardData } from "@/mockData/defaultMoyenneCardData";
import { useEffect, useState } from "react";
import { DatePickerWithPresets } from "../view/DatePickerWithPresets";
import { DatePickerWithRange } from "../view/DatePiker";
import { DateRange } from "react-day-picker";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

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

// Fonction pour extraire les données pour chaque type de mesure (paramètre)
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

  return formattedData;
};

// Composant pour afficher un graphique
const Chart = ({
  title,
  dataKey,
  data,
  visualPeriod,
  visualisationPeriode,
}: {
  title: string;
  dataKey: string;
  data: { date: string; value: number }[];
  visualPeriod: Date | DateRange | undefined;
  visualisationPeriode: string;
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
          {/* {data.length > 0
            ? visualisationPeriode === "Jours"
              ? `Données du ${data[0].date} au ${data[data.length - 1].date}`
              : `Données du ${new Date(visualPeriod).toLocaleDateString()}`
            : "Aucune donnée disponible"} */}
          <div className="text-sm">
            {data.length > 0
              ? visualPeriod instanceof Date
                ? `Données du ${new Date(visualPeriod).toLocaleDateString()}`
                : "Période invalide"
              : "Aucune donnée disponible"}
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};

// Composant principal pour afficher le graphique spécifique basé sur le paramètre
const IndividualMoyenneChart = ({ data }: { data: ISensorStoredData[] }) => {
  const { moyenneId } = useParams(); // Utilisation de useParams() pour obtenir le paramètre
  const thisItem = defaulMoyenneCardData.filter(
    (x) => x.accessParam === moyenneId
  )[0];
  const decodedParam = decodeURIComponent(moyenneId as string); // Décodage du paramètre si nécessaire

  const [visualisationPeriode, setVisualisationPeride] =
    useState<string>("Heures");
  const [filteredData, setFilteredData] = useState<any>([]);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [selectedRange, setSelectedRange] = useState<DateRange | undefined>();

  const getButtonClass = (option: string) =>
    `px-4 py-2 rounded-lg block min-w-20 text-center cursor-pointer ${
      visualisationPeriode === option
        ? "bg-primary text-white"
        : "border border-primary"
    }`;

  const { data: hourData } = useSelector((state: RootState) => state.hourData);
  const { data: dayData } = useSelector((state: RootState) => state.dayData);

  useEffect(() => {
    if (visualisationPeriode === "Heures" && selectedDate) {
      // Filtrer par date
      const filtered = hourData.filter((entry) => {
        const entryDate = new Date(entry.timestamp).toLocaleDateString();
        const selectedDateStr = selectedDate.toLocaleDateString();
        return entryDate === selectedDateStr;
      });

      // Trier les données par timestamp
      setFilteredData(
        filtered.sort(
          (a: ISensorStoredData, b: ISensorStoredData) =>
            new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
        )
      );
    } else if (
      visualisationPeriode === "Jours" &&
      selectedRange?.from &&
      selectedRange?.to
    ) {
      // Ajuster la date de fin pour inclure toute la journée
      const adjustedEndDate = new Date(selectedRange.to);
      adjustedEndDate.setHours(23, 59, 59, 999); // Mettre l'heure à 23h59m59s999ms pour inclure toute la journée du 26/12

      // Filtrer par plage de dates
      const filtered = dayData.filter((entry) => {
        const entryDate = new Date(entry.timestamp);
        if (selectedRange.from) {
          return (
            entryDate >= selectedRange.from && entryDate <= adjustedEndDate
          );
        }
      });

      // Trier les données par timestamp
      setFilteredData(
        filtered.sort(
          (a: ISensorStoredData, b: ISensorStoredData) =>
            new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
        )
      );
    }
  }, [selectedDate, selectedRange, visualisationPeriode, hourData, dayData]);

  // Extraction des données spécifiques en fonction du paramètre (moyenneId)
  const paramData = transformSensorData(
    filteredData,
    thisItem.name,
    visualisationPeriode
  );

  return (
    <div className="flex-1 rounded-xl bg-muted/50 p-5 mb-10">
      <div className="h-full overflow-y-auto">
        <div className="flex justify-end gap-2 mb-3 items-center">
          <div>
            <p>Visuliser les données en :</p>
          </div>
          <div className="flex items-center gap-3 justify-between">
            <span
              onClick={() => setVisualisationPeride("Heures")}
              className={getButtonClass("Heures")}
            >
              Heures
            </span>
            <span
              onClick={() => setVisualisationPeride("Jours")}
              className={getButtonClass("Jours")}
            >
              Jours
            </span>
          </div>
        </div>
        <div className="flex justify-end">
          {visualisationPeriode === "Heures" ? (
            <DatePickerWithPresets onDateChange={setSelectedDate} />
          ) : (
            <DatePickerWithRange onDateRangeChange={setSelectedRange} />
          )}
        </div>
        <Chart
          title={`Graphe de ${thisItem.name}`}
          dataKey={thisItem.name}
          data={paramData}
          visualisationPeriode={visualisationPeriode}
          visualPeriod={
            visualisationPeriode === "Heures" ? selectedDate : selectedRange
          }
        />
      </div>
    </div>
  );
};

export default IndividualMoyenneChart;
