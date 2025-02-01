import React from "react";
import {
  CartesianGrid,
  Line,
  LineChart,
  YAxis,
  ReferenceLine,
  XAxis,
} from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useSocket } from "@/context/SocketContext";
import { useParams } from "next/navigation";

const MAX_DATA_POINTS = 60;

interface RealTimeChartProps {
  code: string;
  label: string; // Nom de la mesure (ex: Température, Humidité)
  unit: string; // Unité de mesure (ex: °C, %, lx)
  color: string; // Couleur de la ligne
  minThreshold: number; // Seuil minimum
  maxThreshold: number; // Seuil maximum
  graphDomain: number[]; // Limites des axes Y
  generateRandomData: () => number; // Fonction pour générer des données
}

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

const RealTimeChart: React.FC<RealTimeChartProps> = ({
  code,
  label,
  unit,
  color,
  minThreshold,
  maxThreshold,
  graphDomain,
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

  const { sensorData } = useSocket();
  const localName = useParams().capteurId as string;

  React.useEffect(() => {
    if (sensorData && sensorData.localName === localName) {
      setChartData((prevData) => {
        const newData = {
          date: new Date().toISOString(),
          value: sensorData[code],
        };
        return [...prevData.slice(1), newData];
      });
    }
  }, [sensorData]);

  return (
    <ChartContainer
      config={chartConfig}
      className="aspect-auto h-[250px] w-full"
    >
      <LineChart
        data={chartData}
        margin={{ left: 12, right: 12 }}
        className="bg-gray-100 rounded-lg"
      >
        <CartesianGrid strokeDasharray="3 3" vertical={false} />
        <XAxis tick={false} tickLine={false} />
        <YAxis
          tickFormatter={(value) => `${value} ${unit}`}
          domain={graphDomain}
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
              labelFormatter={() => (
                <div>
                  Heure :{" "}
                  {new Date().toLocaleTimeString("fr-FR", {
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit",
                  })}
                </div>
              )}
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
