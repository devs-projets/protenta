import React from "react";
import { CartesianGrid, Line, LineChart, YAxis, ReferenceLine } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const MAX_DATA_POINTS = 60;
const chartConfig = {
  views: {
    label: "Page Views",
  },
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
  },
  mobile: {
    label: "Mobile",
    color: "hsl(var(--chart-2))",
  },
};

const chartDomain: any = {
  Temperature: { min: 0, max: 40 },
  Humidité: { min: 0, max: 100 },
  Lumière: { min: 0, max: 1000 },
  "Pression_Atm": { min: 0, max: 1050 },
  "Humidité_Sol": { min: 0, max: 100 },
  Co2: { min: 0, max: 500 },
};

interface RealTimeChartProps {
  label: string; // Nom de la mesure (ex: Température, Humidité)
  unit: string; // Unité de mesure (ex: °C, %, lx)
  color: string; // Couleur de la ligne
  minThreshold: number; // Seuil minimum
  maxThreshold: number; // Seuil maximum
  generateRandomData: () => number; // Fonction pour générer des données
}

const RealTimeChart: React.FC<RealTimeChartProps> = ({
  label,
  unit,
  color,
  minThreshold,
  maxThreshold,
  generateRandomData,
}) => {
  const [chartData, setChartData] = React.useState<
    { date: string; value: number }[]
  >(
    Array.from({ length: MAX_DATA_POINTS }, (_, index) => ({
      date: `-${MAX_DATA_POINTS - index}`,
      value: 0,
    }))
  );

  // Obtenir les seuils depuis le label
  const { min: minChartDomain = 0, max: maxChartDomain = 100 } =
    chartDomain[label] || {};

  React.useEffect(() => {
    const intervalId = setInterval(() => {
      setChartData((prevData) => {
        const newData = {
          date: new Date().toISOString(),
          value: generateRandomData(),
        };
        return [...prevData.slice(1), newData];
      });
    }, 1000);

    return () => clearInterval(intervalId);
  }, [generateRandomData]);

  return (
    <ChartContainer
      config={chartConfig}
      className="aspect-auto h-[250px] w-full"
    >
      <LineChart
        data={chartData}
        margin={{ left: 20, right: 20 }}
        className="bg-gray-100 rounded-lg"
      >
        <CartesianGrid strokeDasharray="3 3" vertical={false} />
        <YAxis
          tickFormatter={(value) => `${value} ${unit}`}
          domain={[minChartDomain, maxChartDomain]}
          allowDataOverflow
          tickCount={6}
          tickLine={false}
          axisLine={{ stroke: "#ccc" }}
          stroke="#ccc"
        />
        <ReferenceLine
          y={maxThreshold}
          label="Plafond"
          stroke="#FF0000"
          strokeDasharray="4 4"
        />
        <ReferenceLine
          y={minThreshold}
          label="Seuil Minimal"
          stroke="#00FF00"
          strokeDasharray="4 4"
        />
        <ChartTooltip
          content={
            <ChartTooltipContent
              className="w-[150px]"
              nameKey="value"
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
          dataKey="value"
          stroke={color}
          strokeWidth={3}
          dot={(props) => {
            const { cx, cy, value } = props;
            const isPlaceholder = value === 0;
            return (
              <circle
                cx={cx}
                cy={cy}
                r={4}
                strokeWidth={2}
                fill={isPlaceholder ? "transparent" : color}
                stroke={isPlaceholder ? "transparent" : color}
              />
            );
          }}
          strokeOpacity={chartData.some((point) => point.value > 0) ? 1 : 0.2}
          isAnimationActive={false}
        />
      </LineChart>
    </ChartContainer>
  );
};

export default RealTimeChart;
