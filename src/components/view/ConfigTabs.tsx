"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "../ui/switch";
import { ConfirmActionnaireModal } from "./ConfirmActionnaireModal";

const ActionnaireListItem = ({ title, mode, onConfirmMode, disabled }: any) => {
  return (
    <li className="grid grid-cols-4 gap-4 p-2 my-2 items-center">
      <h3>{title}</h3>
      <p>Description</p>
      <Switch disabled={disabled} />
      <ConfirmActionnaireModal
        title={title}
        mode={mode}
        onConfirmMode={onConfirmMode}
      />
    </li>
  );
};

const LimiteListItem = ({
  title,
  unit,
  minValue,
  maxValue,
  onMinChange,
  onMaxChange,
}: any) => {
  const userRole = localStorage.getItem('userRole');
  const isDisabled = userRole === "simple";
  console.log(isDisabled)
  return (
    <li className="grid grid-cols-4 gap-4 p-2 my-2 items-center">
      <h3>{title}</h3>
      <p>{unit}</p>
      <input
        type="number"
        value={minValue}
        onChange={onMinChange}
        placeholder="Min"
        className="border rounded px-2 py-1"
        disabled={isDisabled}
      />
      <input
        type="number"
        value={maxValue}
        onChange={onMaxChange}
        placeholder="Max"
        className="border rounded px-2 py-1"
        disabled={isDisabled}
      />
    </li>
  );
};

const ConfigTabs = () => {
  // Données des onglets Limites
  const initialLimites = [
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
    { name: "CO₂", unit: "ohm", minValue: 0, maxValue: 2000 },
  ];

  const initialActionnaires = [
    { name: "S1", mode: "off", switchEnabled: false },
    { name: "S2", mode: "off", switchEnabled: false },
    { name: "S3", mode: "off", switchEnabled: false },
    { name: "S4", mode: "off", switchEnabled: false },
    { name: "S5", mode: "off", switchEnabled: false },
    { name: "S6", mode: "off", switchEnabled: false },
    { name: "S7", mode: "off", switchEnabled: false },
    { name: "S8", mode: "off", switchEnabled: false },
    { name: "S9", mode: "off", switchEnabled: false },
  ];

  const [actionnaires, setActionnaires] = useState(initialActionnaires);
  const [limites, setLimites] = useState(initialLimites);

  // Fonction pour confirmer le changement de mode
  const confirmToggleMode = (actionnaireName: string, newMode: string) => {
    setActionnaires((prev) =>
      prev.map((actionnaire) =>
        actionnaire.name === actionnaireName
          ? { ...actionnaire, mode: newMode, switchEnabled: newMode === "on" }
          : actionnaire
      )
    );
  };

  // Fonction pour gérer les changements de valeurs minimales et maximales
  const handleMinChange = (index: number, value: number) => {
    setLimites((prev) => {
      const newLimites = [...prev];
      newLimites[index].minValue = value;
      return newLimites;
    });
  };

  const handleMaxChange = (index: number, value: number) => {
    setLimites((prev) => {
      const newLimites = [...prev];
      newLimites[index].maxValue = value;
      return newLimites;
    });
  };

  return (
    <div>
      <Tabs defaultValue="limites" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="limites">Limites</TabsTrigger>
          <TabsTrigger value="actionnaires">Actionnaires</TabsTrigger>
        </TabsList>

        {/* Onglet Limites */}
        <TabsContent value="limites">
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
                onMinChange={(e: any) =>
                  handleMinChange(index, +e.target.value)
                }
                onMaxChange={(e: any) =>
                  handleMaxChange(index, +e.target.value)
                }
              />
            ))}
            <hr />
            <li className="grid grid-cols-4 gap-4 p-2 my-2 items-center bg-green-100 rounded">
              <h3>Floraison</h3>
              <p>Début --/--/--</p>
              <p>Fin --/--/--</p>
              <Switch className="mx-5" />
            </li>
          </ul>
        </TabsContent>

        {/* Onglet Actionnaires */}
        <TabsContent value="actionnaires">
          <ul>
            {actionnaires.map((actionnaire) => (
              <ActionnaireListItem
                key={actionnaire.name}
                title={actionnaire.name}
                mode={actionnaire.mode}
                disabled={actionnaire.mode === "off"}
                onConfirmMode={confirmToggleMode}
              />
            ))}
          </ul>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ConfigTabs;
