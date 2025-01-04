import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TableComponent } from "../view/Table";
import { ChartComponent } from "../view/Chart";
import { ChartArea, TableProperties } from "lucide-react";
import { DatePickerWithRange } from "../view/DatePiker";
import { ISensorStoredData } from "@/types/storedData";
import { DatePickerWithPresets } from "../view/DatePickerWithPresets";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { useEffect, useState } from "react";
import { DateRange } from "react-day-picker";

export function MoyenneTabs({
  visualisationPeriode,
}: {
  visualisationPeriode: string;
}) {
  const [data, setData] = useState<any>();
  const [filteredData, setFilteredData] = useState<any>([]);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [selectedRange, setSelectedRange] = useState<DateRange | undefined>();

  const { data: hourData } = useSelector((state: RootState) => state.hourData);
  const { data: dayData } = useSelector((state: RootState) => state.dayData);

  useEffect(() => {
    if (visualisationPeriode === "Heures") {
      setData(hourData);
    } else if (visualisationPeriode === "Jours") {
      setData(dayData);
    }
  }, [visualisationPeriode]);

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

  return (
    <Tabs defaultValue="Tableau">
      <TabsList className="flex justify-end w-full sticky top-0 bg-gray-300 z-10 py-6">
        <TabsTrigger value="Tableau">
          <TableProperties />
          Tableau
        </TabsTrigger>
        <TabsTrigger value="Graphique">
          <ChartArea />
          Graphique
        </TabsTrigger>
        {visualisationPeriode === "Heures" ? (
          <DatePickerWithPresets onDateChange={setSelectedDate} />
        ) : (
          <DatePickerWithRange onDateRangeChange={setSelectedRange} />
        )}
      </TabsList>
      <TabsContent value="Tableau">
        <TableComponent
          visualisationPeriode={visualisationPeriode}
          sensorData={filteredData}
        />
      </TabsContent>
      <TabsContent value="Graphique">
        <ChartComponent
          visualisationPeriode={visualisationPeriode}
          displayDateRange={
            visualisationPeriode === "Heures"
              ? `le ${selectedDate?.toLocaleDateString("fr-FR") || ""}`
              : selectedRange
              ? `du ${
                  selectedRange.from?.toLocaleDateString("fr-FR") || ""
                } au ${selectedRange.to?.toLocaleDateString("fr-FR") || ""}`
              : ""
          }
          sensorData={filteredData}
        />
      </TabsContent>
    </Tabs>
  );
}
