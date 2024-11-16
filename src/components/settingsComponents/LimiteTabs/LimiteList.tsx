import React, { useState } from "react";
import { Limite } from "../ConfigTabs";
import LimiteListItem from "../LimiteTabs/LimiteListItem";
import { Switch } from "@radix-ui/react-switch";
import { Save, X } from "lucide-react";

const LimiteList = ({ newLimites }: { newLimites: any }) => {
  const initialLimites: Limite[] = [
    {
      code: "SeuilHumidity",
      name: "Température",
      unit: "°C",
      minValue: newLimites ? newLimites.SeuilHumidity_min : 0,
      maxValue: newLimites ? newLimites.SeuilHumidity_max : 0,
    },
    {
      code: "SeuilTemp",
      name: "Humidité",
      unit: "%",
      minValue: newLimites ? newLimites.SeuilHumidity_min : 0,
      maxValue: newLimites ? newLimites.SeuilHumidity_max : 0,
    },
    {
      code: "SeuilLum",
      name: "Lumière",
      unit: "lux",
      minValue: newLimites ? newLimites.SeuilLum_min : 0,
      maxValue: newLimites ? newLimites.SeuilLum_max : 0,
    },
    {
      code: "SeuilPression",
      name: "Pression Atmosphérique",
      unit: "Bae",
      minValue: newLimites ? newLimites.SeuilPression_min : 0,
      maxValue: newLimites ? newLimites.SeuilPression_max : 0,
    },
    {
      // TODO: Code de l'humidité sol (La valeur n'est même pas renvoyé !!!)
      code: "",
      name: "Humidité du Sol",
      unit: "%",
      minValue: 0,
      maxValue: 100,
    },
    {
      code: "SeuilCo2",
      name: "CO₂",
      unit: "ppm",
      minValue: newLimites ? newLimites.SeuilCo2_min : 0,
      maxValue: newLimites ? newLimites.SeuilCo2_max : 0,
    },
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

  const submitNewLimites = async () => {
    const data: any = {} 
    limites.map(x => {
      if(x.code === "SeuilHumidity") {
        data["SeuilHumidity_min"] = x.minValue;
        data["SeuilHumidity_max"] = x.maxValue;
      }
      if(x.code === "SeuilTemp") {
        data["SeuilTemp_min"] = x.minValue;
        data["SeuilTemp_max"] = x.maxValue;
      }
      if(x.code === "SeuilLum") {
        data["SeuilLum_min"] = x.minValue;
        data["SeuilLum_max"] = x.maxValue;
      }
      if(x.code === "SeuilPression") {
        data["SeuilPression_min"] = x.minValue;
        data["SeuilPression_max"] = x.maxValue;
      }
      if(x.code === "SeuilCo2") {
        data["SeuilCo2_min"] = x.minValue;
        data["SeuilCo2_max"] = x.maxValue;
      }
    })

    console.log(data)
  };

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
              onClick={submitNewLimites}
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
