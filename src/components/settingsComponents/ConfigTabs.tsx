"use client";

import { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import LimiteList from "./LimiteTabs/LimiteList";
import ActionnaireList from "./actionnaireTabs/ActionnaireList";
import FloraisonComponent from "./floraison/FloraisonComponent";
import { ISensorStoredData } from "@/types/storedData";

export interface Limite {
  code: string;
  name: string;
  unit: string;
  minValue: number;
  maxValue: number;
}

interface SensorLog {
  [key: string]: number; // Chaque capteur comme S1, S2, etc., est une clé avec une valeur numérique
}

const ConfigTabs = () => {
  const [actionnairesFetched, setActionnairesFetched] =
    useState<Partial<ISensorStoredData>>();
  const [limitesFetched, setLimitesFetched] =
    useState<Partial<ISensorStoredData>>();
    const [floraisonFeteched, setFloraisonFeteched] = useState<Partial<ISensorStoredData>>();
  const [lastData, setLastData] = useState<ISensorStoredData | null>(null);

  console.log(lastData);

  const getLastData = async () => {
    try {
      const response = await fetch(
        "http://localhost:4000/monitor?period=minute"
      );
      if (response.ok) {
        const data: ISensorStoredData[] = await response.json();
        setLastData(data[0]);
      } else {
        console.error("Failed to fetch data:", response.statusText);
      }
    } catch (error) {
      console.error("An error occurred while fetching data:", error);
    }
  };

  useEffect(() => {
    getLastData();
  }, []);

  useEffect(() => {
    if (lastData) {
      const newActionnaires = Object.keys(lastData)
        .filter((key): key is keyof ISensorStoredData => key.startsWith("S"))
        .reduce((acc, key) => {
          (acc as any)[key] = lastData[key];
          return acc;
        }, {} as Partial<ISensorStoredData>);
      setActionnairesFetched(newActionnaires);
      const newLimites = Object.keys(lastData)
        .filter((key): key is keyof ISensorStoredData =>
          key.startsWith("lastSeuil")
        )
        .reduce((acc, key) => {
          (acc as any)[key] = lastData[key];
          return acc;
        }, {} as Partial<ISensorStoredData>);
      setLimitesFetched(newLimites);
      const newFloraison = {
        MomentFloraison: lastData.MomentFloraison,
        Periode: lastData.Periode,
        PolEndTime: lastData.PolEndTime,
        PolStartTime: lastData.PolStartTime,
      };
      setFloraisonFeteched(newFloraison);
    }
  }, [lastData]);

  console.log(actionnairesFetched);

  return (
    <div>
      <Tabs defaultValue="limites" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="limites">Limites</TabsTrigger>
          <TabsTrigger value="actionnaires">Actionnaires</TabsTrigger>
          <TabsTrigger value="floraison">Floraison</TabsTrigger>
        </TabsList>

        <TabsContent value="limites">
          <LimiteList newLimites={limitesFetched} />
        </TabsContent>

        <TabsContent value="actionnaires">
          <ActionnaireList actionnairesFetched={actionnairesFetched} />
        </TabsContent>

        <TabsContent value="floraison">
          <FloraisonComponent floraisonFeteched={floraisonFeteched} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ConfigTabs;
