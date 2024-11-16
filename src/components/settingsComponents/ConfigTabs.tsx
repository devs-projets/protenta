"use client";

import { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import LimiteList from "./LimiteTabs/LimiteList";
import ActionnaireList from "./actionnaireTabs/ActionnaireList";
import FloraisonComponent from "./floraison/FloraisonComponent";

// Définition des interfaces
export interface Actionnaire {
  name: string;
  status: boolean;
}

export interface Limite {
  name: string;
  unit: string;
  minValue: number;
  maxValue: number;
}

interface SensorLog {
  [key: string]: number; // Chaque capteur comme S1, S2, etc., est une clé avec une valeur numérique
}

const ConfigTabs = () => {
  const [actionnaires, setActionnaires] = useState<Actionnaire[]>([]);
  const [lastData, setLastData] = useState<SensorLog | null>(null);

  const getLastData = async () => {
    try {
      const response = await fetch(
        "http://localhost:4000/monitor?period=minute"
      );
      if (response.ok) {
        const data: SensorLog[] = await response.json();
        setLastData(data[0]);
      } else {
        console.error("Failed to fetch data:", response.statusText);
      }
    } catch (error) {
      console.error("An error occurred while fetching data:", error);
    }
  };

  // Fonction pour générer des actionnaires fictifs aléatoires
  const generateRandomActionnaires = () => {
    const randomActionnaires: Actionnaire[] = Array.from(
      { length: 5 },
      (_, index) => {
        const randomEtat = Math.random() > 0.5; // Génère true ou false aléatoirement
        return {
          name: `S${index + 1}`,
          status: randomEtat,
        };
      }
    );
    setActionnaires(randomActionnaires);
  };

  useEffect(() => {
    getLastData();
  }, []);

  useEffect(() => {
    if (lastData) {
      const newActionnaires: Actionnaire[] = Object.keys(lastData)
        .filter((key) => key.startsWith("S"))
        .map((key) => ({
          name: key,
          modeAuto: false,
          status: lastData[key] === 1,
        }));
      setActionnaires(newActionnaires);
    } else if (actionnaires.length === 0) {
      // Si lastData est null et actionnaires est vide, on génère des données fictives
      generateRandomActionnaires();
    }
  }, [lastData]);

  return (
    <div>
      <Tabs defaultValue="limites" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="limites">Limites</TabsTrigger>
          <TabsTrigger value="actionnaires">Actionnaires</TabsTrigger>
          <TabsTrigger value="floraison">Floraison</TabsTrigger>
        </TabsList>

        <TabsContent value="limites">
          <LimiteList />
        </TabsContent>

        <TabsContent value="actionnaires">
          <ActionnaireList actionnaires={actionnaires} />
        </TabsContent>

        <TabsContent value="floraison">
          <FloraisonComponent />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ConfigTabs;
