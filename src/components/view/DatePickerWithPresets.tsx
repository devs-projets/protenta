"use client";

import * as React from "react";
import { addDays, format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const today = new Date();

export function DatePickerWithPresets({
  onDateChange,
  className,
}: React.HTMLAttributes<HTMLDivElement> & {
  onDateChange: (date: Date | undefined) => void;
}) {
  const [date, setDate] = React.useState<Date | undefined>(new Date());

  React.useEffect(() => {
    onDateChange(date);
  }, [date]);

  return (
    <div className={cn("grid gap-2 mx-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            className={cn(
              "w-auto justify-start text-left font-normal",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon />
            {date ? format(date, "LLL dd, y") : <span>Pick a date</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="flex w-auto flex-col space-y-2 p-2">
          <Select
            onValueChange={(value) =>
              setDate(addDays(new Date(), parseInt(value)))
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Choisissez un jour" />
            </SelectTrigger>
            <SelectContent position="popper">
              <SelectItem value="0">Ajourd'hui</SelectItem>
              <SelectItem value="-1">Hier</SelectItem>
              <SelectItem value="-3">Dans 3 plutôt</SelectItem>
              <SelectItem value="-6">Une semaine plutôt</SelectItem>
            </SelectContent>
          </Select>
          <div className="rounded-md border">
            <Calendar
              mode="single"
              selected={date}
              onSelect={(selectedDate) => {
                if (selectedDate) {
                  setDate(selectedDate);
                }
              }}
              disabled={(date) => date > today}
            />
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
