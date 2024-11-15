import React, { useState } from "react";
import { Limite } from "../ConfigTabs";
import LimiteListItem from "../LimiteTabs/LimiteListItem";
import { Switch } from "@radix-ui/react-switch";
import { Save, X } from "lucide-react";

const LimiteList = () => {
  const initialLimites: Limite[] = [
    { name: "Température", unit: "°C", minValue: 0, maxValue: 100 },
    { name: "Humidité", unit: "%", minValue: 0, maxValue: 100 },
    { name: "Lumière", unit: "lux", minValue: 0, maxValue: 1000 },
    {
      name: "Pression Atmosphérique",
      unit: "Bae",
      minValue: 950,
      maxValue: 1050,
    },
    { name: "Humidité du Sol", unit: "%", minValue: 0, maxValue: 100 },
    { name: "CO₂", unit: "ppm", minValue: 0, maxValue: 2000 },
  ];

  const [limites, setLimites] = useState<Limite[]>(initialLimites);
  const [onLimitesChange, setOnLimitesChange] = useState<boolean>(false);

  const handleMinChange = (index: number, value: number) => {
    setLimites((prev) => {
      const newLimites = [...prev];
      newLimites[index].minValue = value;
      return newLimites;
    });
    setOnLimitesChange(true);
  };

  const handleMaxChange = (index: number, value: number) => {
    setLimites((prev) => {
      const newLimites = [...prev];
      newLimites[index].maxValue = value;
      return newLimites;
    });
    setOnLimitesChange(true);
  };

  console.log(limites);

  return (
    <ul>
      <li className="grid grid-cols-4 gap-4 p-2 my-2 items-center">
        <h3>Data</h3>
        <p>Unité</p>
        <p>Minimum</p>
        <p>Maximum</p>
      </li>
      <hr />
      {limites.map((limite, index) => (
        <LimiteListItem
          key={limite.name}
          title={limite.name}
          unit={limite.unit}
          minValue={limite.minValue}
          maxValue={limite.maxValue}
          onMinChange={(e) => handleMinChange(index, +e.target.value)}
          onMaxChange={(e) => handleMaxChange(index, +e.target.value)}
        />
      ))}
      {onLimitesChange && (
        <li>
          <div className="flex justify-center items-center gap-5">
            <button
              type="button"
              className="flex gap-1 justify-center items-center bg-gray-400 w-full p-2 text-white rounded-lg"
              onClick={() => {
                setLimites(initialLimites);
                setOnLimitesChange(false);
              }}
            >
              <X />
              Annuler
            </button>
            <button
              type="submit"
              className="flex gap-1 justify-center items-center bg-primary w-full p-2 text-white rounded-lg"
            >
              <Save />
              Enregistrer
            </button>
          </div>
        </li>
      )}
    </ul>
  );
};

export default LimiteList;
