"use client";

import * as React from "react";
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

export default function RealTimeTemperatureChart() {
  // Initialiser le tableau avec 60 points vides
  const [chartData, setChartData] = React.useState<{ date: string; temperature: number }[]>( 
    Array.from({ length: MAX_DATA_POINTS }, (_, index) => ({
      date: `-${MAX_DATA_POINTS - index}`, // Date factice pour les points vides
      temperature: 0, // Valeur initiale vide
    }))
  );

  // Fonction pour générer des données de température aléatoires (en °C)
  function generateRandomData() {
    const date = new Date().toISOString();
    const temperature = Math.floor(15 + Math.random() * 15); // Température aléatoire entre 15 et 30 °C
    return { date, temperature };
  }

  // Utilisation d'un intervalle pour ajouter des données progressivement
  React.useEffect(() => {
    const intervalId = setInterval(() => {
      setChartData((prevData) => {
        const newData = generateRandomData();
        // Supprimer le premier élément (le plus ancien) et ajouter la nouvelle donnée à la fin
        return [...prevData.slice(1), newData];
      });
    }, 1000); // Ajout de données toutes les secondes

    return () => clearInterval(intervalId); // Nettoyage de l'intervalle à la fin
  }, []);

  // Valeurs plafond et seuils à surveiller
  const maxTemperature = 30; // Température maximale (plafond)
  const minTemperature = 15; // Température minimale (seuil de surveillance)

  return (
    <ChartContainer config={chartConfig} className="aspect-auto h-[250px] w-full">
      <LineChart
        data={chartData}
        margin={{ left: 20, right: 20 }}
        className="bg-gray-100 rounded-lg"
      >
        <CartesianGrid strokeDasharray="3 3" vertical={false} />
        
        {/* Suppression de l'axe X */}
        <YAxis
          tickFormatter={(value) => `${value} °C`} // Ajouter l'unité °C sur l'axe Y
          domain={['dataMin', 'dataMax']} // Fixer les bornes de l'axe Y en fonction des données
          allowDataOverflow={true} // Permet de dépasser les bornes de l'axe Y pour s'adapter aux données
          tickCount={6} // Nombre de ticks à afficher sur l'axe Y
          tickLine={false} // Enlever les lignes de repère sur les ticks
          axisLine={{ stroke: '#ccc' }} // Couleur de la ligne de l'axe Y
          stroke="#ccc" // Couleur de l'axe Y
        />

        {/* Ligne plafond (température maximale) */}
        <ReferenceLine y={25} label="Plafond" stroke="#FF0000" strokeDasharray="4 4" />

        {/* Ligne seuil minimal (température minimale) */}
        <ReferenceLine y={20} label="Seuil Minimal" stroke="#00FF00" strokeDasharray="4 4" />

        <ChartTooltip
          content={
            <ChartTooltipContent
              className="w-[150px]"
              nameKey="temperature"
              labelFormatter={(value) => {
                return new Date(value).toLocaleTimeString("en-US", {
                  hour: "2-digit",
                  minute: "2-digit",
                  second: "2-digit",
                });
              }}
            />
          }
        />
        <Line
          type="monotone"
          dataKey="temperature"
          stroke="#FF6347" // Couleur rouge pour la température (chaud)
          strokeWidth={3} // Épaisseur de la ligne
          dot={(props) => {
            const { cx, cy, value } = props;
            // Si la valeur est 0 (point factice), on rend le point transparent
            const isPlaceholder = value === 0;
            return (
              <circle
                cx={cx}
                cy={cy}
                r={4}
                strokeWidth={2}
                fill={isPlaceholder ? "transparent" : "#FF6347"} // Transparent pour les points vides
                stroke={isPlaceholder ? "transparent" : "#FF6347"} // Transparent pour les points vides
              />
            );
          }}
          strokeOpacity={chartData.some((point) => point.temperature > 0) ? 1 : 0.2} // Réduit l'opacité si des points sont factices
          isAnimationActive={false} // Désactiver l'animation par défaut pour chaque point
        />
      </LineChart>
    </ChartContainer>
  );
}
