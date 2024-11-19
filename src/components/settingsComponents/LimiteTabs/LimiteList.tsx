import React, { useEffect, useState } from "react";
import { Limite } from "../ConfigTabs";
import LimiteListItem from "../LimiteTabs/LimiteListItem";
import { Switch } from "@radix-ui/react-switch";
import { Save, X } from "lucide-react";

const LimiteList = ({ newLimites }: { newLimites: any }) => {
  const initialLimites: Limite[] = [
    {
      code: "lastSeuilTemp",
      name: "Température",
      unit: "°C",
      minValue: 0,
      maxValue: 0,
    },
    {
      code: "lastSeuilHumidity",
      name: "Humidité",
      unit: "%",
      minValue: 0,
      maxValue: 0,
    },
    {
      code: "lastSeuilLum",
      name: "Lumière",
      unit: "lux",
      minValue: 0,
      maxValue: 0,
    },
    {
      code: "lastSeuilPression",
      name: "Pression Atmosphérique",
      unit: "Bae",
      minValue: 0,
      maxValue: 0,
    },
    {
      code: "lastSeuilCo2",
      name: "CO₂",
      unit: "ppm",
      minValue: 0,
      maxValue: 0,
    },
  ];

  const [limites, setLimites] = useState<Limite[]>(initialLimites);
  const [onLimitesChange, setOnLimitesChange] = useState<boolean>(false);

  useEffect(() => {
    if (newLimites) {
      const updatedLimites = limites.map((limite) => {
        const code = limite.code;
        const minKey = `${code}Min`;
        const maxKey = `${code}Max`;
        return {
          ...limite,
          minValue: newLimites[minKey],
          maxValue: newLimites[maxKey],
        };
      });
      setLimites(updatedLimites);
    }
  }, [newLimites]);

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
    const data: any = {};
    limites.map((x) => {
      if (x.code === "lastSeuilHumidity") {
        data["HumMin"] = x.minValue;
        data["HumMax"] = x.maxValue;
      }
      if (x.code === "lastSeuilTemp") {
        data["TemMin"] = x.minValue;
        data["TemMax"] = x.maxValue;
      }
      if (x.code === "lastSeuilLum") {
        data["LumMin"] = x.minValue;
        data["LumMax"] = x.maxValue;
      }
      if (x.code === "lastSeuilPression") {
        data["PressMin"] = x.minValue;
        data["PressMax"] = x.maxValue;
      }
      if (x.code === "lastSeuilCo2") {
        data["Co2Min"] = x.minValue;
        data["Co2Max"] = x.maxValue;
      }
    });

    try {
      const response = await fetch("http://localhost:4000/send-commande", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
    
      if (response.ok) {
        setOnLimitesChange(false);
        alert("Les limites ont été mises à jour avec succès !");
      } else {
        const errorMessage = await response.json();
        alert(
          `Une erreur s'est produite : \nStatus Code = ${errorMessage && errorMessage.statusCode}\nVeuillez réessayer...`
        );
      }
    } catch (error) {
      console.error("Erreur réseau ou serveur :", error);
      alert(
        "Une erreur s'est produite lors de la communication avec le serveur. Vérifiez votre connexion."
      );
    }
    
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
