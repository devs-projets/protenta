"use client";

import { useParams } from "next/navigation";
import { ISensorStoredData } from "@/types/storedData";
import { useEffect, useState } from "react";
import { DatePickerWithPresets } from "../view/DatePickerWithPresets";
import { DatePickerWithRange } from "../view/DatePiker";
import { DateRange } from "react-day-picker";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { ChartComponent } from "../view/Chart";

const IndividualMoyenneChart = () => {
  const { moyenneId } = useParams();
  const decodedParam = decodeURIComponent(moyenneId as string);

  const [visualisationPeriode, setVisualisationPeride] =
    useState<string>("Heures");
  const [filteredData, setFilteredData] = useState<ISensorStoredData[]>([]);
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
      const filtered = hourData.filter((entry) => {
        const entryDate = new Date(entry.timestamp).toLocaleDateString();
        const selectedDateStr = selectedDate.toLocaleDateString();
        return entryDate === selectedDateStr;
      });

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
      const adjustedEndDate = new Date(selectedRange.to);
      adjustedEndDate.setHours(23, 59, 59, 999);

      const filtered = dayData.filter((entry) => {
        const entryDate = new Date(entry.timestamp);
        if (selectedRange.from) {
          return (
            entryDate >= selectedRange.from && entryDate <= adjustedEndDate
          );
        }
      });

      setFilteredData(
        filtered.sort(
          (a: ISensorStoredData, b: ISensorStoredData) =>
            new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
        )
      );
    }
  }, [selectedDate, selectedRange, visualisationPeriode, hourData, dayData]);

  return (
    <div className="flex-1 rounded-xl bg-muted/50 p-5 mb-10">
      <div className="flex flex-wrap gap-3 justify-end items-center py-2 rounded-lg bg-[#E5E7EB]">
        <div className="flex items-center flex-wrap justify-end mr-3">
          <div>
            <p className="mr-3">Visuliser les données en </p>
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
      </div>
      <ChartComponent
        type={decodedParam}
        visualisationPeriode={visualisationPeriode}
        displayDateRange={
          visualisationPeriode === "Heures"
            ? `le ${selectedDate?.toLocaleDateString("fr-FR") || ""}`
            : selectedRange
            ? `du ${selectedRange.from?.toLocaleDateString("fr-FR") || ""} au ${
                selectedRange.to?.toLocaleDateString("fr-FR") || ""
              }`
            : ""
        }
        timeRange={
          visualisationPeriode === "Heures" ? selectedDate : selectedRange
        }
        sensorData={filteredData}
      />
    </div>
  );
};

export default IndividualMoyenneChart;
