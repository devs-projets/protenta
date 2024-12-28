import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { AlertDialogCancel } from "@radix-ui/react-alert-dialog";
import { useEffect, useState } from "react";

const properties = [
  "HumMin",
  "HumMax",
  "TemMin",
  "TemMax",
  "LumMin",
  "LumMax",
  "PressMin",
  "PressMax",
  "Co2Min",
  "Co2Max",
  "PolStartTime",
  "PolEndTime",
  "Periode",
  "MomentFloraison",
];

export default function FieldsModal({
  reinit,
  onSelectionChange,
}: {
  reinit: number;
  onSelectionChange: (x: string[]) => void;
}) {
  const [selected, setSelected] = useState<string[]>([]);

  useEffect(() => {
    setSelected([])
  }, [reinit])

  const handleCheckboxChange = (property: string) => {
    setSelected((prevSelected) => {
      const newSelection = prevSelected.includes(property)
        ? prevSelected.filter((item) => item !== property)
        : [...prevSelected, property];

      onSelectionChange(newSelection);
      return newSelection;
    });
  };
  const formatPropertyLabel = (property: string) => {
    if (property.startsWith("param")) {
      const number = property.replace("param", "");
      const formattedNumber =
        number === "300"
          ? "S1"
          : number.startsWith("3")
          ? `S${parseInt(number) - 300}`
          : number;
      return `Auto/Manuel ${formattedNumber}`;
    }
    switch (property) {
      case "PolStartTime":
        return "Début pollinisation";
      case "PolEndTime":
        return "Fin pollinisation";
      case "Periode":
        return "Période de Pollinisation";
      case "MomentFloraison":
        return "Moment de Pollinisation";
      default:
        return property;
    }
  };

  return (
    <div>
      <AlertDialog>
        <AlertDialogTrigger className="flex items-center justify-center bg-slate-200 text-center py-3 px-2 w-full rounded-lg p-2 text-black">
          Filtrer les paramettres
        </AlertDialogTrigger>
        <AlertDialogContent className="max-w-[48rem]">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-3xl font-bold text-center">
              Filtrer les paramettres
            </AlertDialogTitle>
          </AlertDialogHeader>
          <div className="p-4">
            <form className="grid grid-cols-5 gap-3">
              {properties.map((property) => (
                <div key={property} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id={property}
                    name={property}
                    value={property}
                    checked={selected.includes(property)}
                    onChange={() => handleCheckboxChange(property)}
                    className="w-4 h-4 checked:text-green-500"
                    disabled={
                      selected.length > 0 && !selected.includes(property)
                    }
                  />
                  <label
                    htmlFor={property}
                    className={`text-[14px] leading-5 flex items-center justify-center font-medium ${
                      selected.length > 0 && !selected.includes(property)
                        ? "text-gray-400"
                        : ""
                    }`}
                  >
                    {formatPropertyLabel(property)}
                  </label>
                </div>
              ))}
            </form>
          </div>
          <AlertDialogCancel className="mt-4 bg-slate-300 py-2 rounded-lg text-lg">
            Appliquer
          </AlertDialogCancel>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
