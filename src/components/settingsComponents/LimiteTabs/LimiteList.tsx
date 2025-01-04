import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import LimiteListItem from "../LimiteTabs/LimiteListItem";
import { Save, X } from "lucide-react";
import { sendCommand } from "@/lib/postData/sendCommands";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

export interface Limite {
  code: string;
  name: string;
  unit: string;
  minValue: number;
  maxValue: number;
}

export const initialLimites: Limite[] = [
  {
    code: "SeuilTemp_",
    name: "Température",
    unit: "°C",
    minValue: 0,
    maxValue: 0,
  },
  {
    code: "SeuilHumidity_",
    name: "Humidité",
    unit: "%",
    minValue: 0,
    maxValue: 0,
  },
  {
    code: "SeuilLum_",
    name: "Lumière",
    unit: "lux",
    minValue: 0,
    maxValue: 0,
  },
  {
    code: "SeuilPression_",
    name: "Pression Atmosphérique",
    unit: "Bar",
    minValue: 0,
    maxValue: 0,
  },
  {
    code: "SeuilCo2_",
    name: "CO₂",
    unit: "ppm",
    minValue: 0,
    maxValue: 0,
  },
];

const LimiteList = ({
  newLimites,
  setReload,
}: {
  newLimites: any;
  setReload: Dispatch<SetStateAction<boolean>>;
}) => {
  const [limites, setLimites] = useState<Limite[]>(initialLimites);
  const [onLimitesChange, setOnLimitesChange] = useState<boolean>(false);
  const { access_token } = useSelector((state: RootState) => state.auth);
  const { serre } = useSelector((state: RootState) => state.serre);

  useEffect(() => {
    if (newLimites) {
      const updatedLimites = limites.map((limite) => {
        const code = limite.code;
        const minKey = `${code}min`;
        const maxKey = `${code}max`;
        return {
          ...limite,
          minValue: newLimites[minKey],
          maxValue: newLimites[maxKey],
        };
      });
      setLimites(updatedLimites);
    }
  }, [newLimites]);

  console.log(limites);

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
    if (!access_token) {
      console.error("Access token is null");
      return;
    }

    if (!serre) {
      console.error("Serre is undefined");
      return;
    }

    const data: any = {};
    limites.map((x) => {
      if (x.code === "SeuilHumidity_") {
        data["HumMin"] = x.minValue ?? 0;
        data["HumMax"] = x.maxValue ?? 0;
      }
      if (x.code === "SeuilTemp_") {
        data["TemMin"] = x.minValue ?? 0;
        data["TemMax"] = x.maxValue ?? 0;
      }
      if (x.code === "SeuilLum_") {
        data["LumMin"] = x.minValue ?? 0;
        data["LumMax"] = x.maxValue ?? 0;
      }
      if (x.code === "SeuilPression_") {
        data["PressMin"] = x.minValue ?? 0;
        data["PressMax"] = x.maxValue ?? 0;
      }
      if (x.code === "SeuilCo2_") {
        data["Co2Min"] = x.minValue ?? 0;
        data["Co2Max"] = x.maxValue ?? 0;
      }
    });
    const message = "Les limites ont été mises à jour avec succès !";

    sendCommand(serre.id, data, message, access_token).then((result) => {
      if (result?.success) {
        setReload(true);
        setOnLimitesChange(false);
      }
    });
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
      <ul>
        {limites &&
          limites.map((limite, index) => (
            <LimiteListItem
              key={limite.code}
              title={limite.name}
              unit={limite.unit}
              minValue={limite.minValue}
              maxValue={limite.maxValue}
              onMinChange={(e) => handleMinChange(index, +e.target.value)}
              onMaxChange={(e) => handleMaxChange(index, +e.target.value)}
            />
          ))}
      </ul>
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
