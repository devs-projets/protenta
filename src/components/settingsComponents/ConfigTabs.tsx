"use client";

import { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import LimiteList from "./LimiteTabs/LimiteList";
import ActionnaireList from "./actionnaireTabs/ActionnaireList";
import FloraisonComponent from "./floraison/FloraisonComponent";
import { ISensorStoredData } from "@/types/storedData";
import { getStoredSensorData } from "@/lib/fetchData/getMonitorData";
import Spinner from "../Spinner";

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
  const [floraisonFeteched, setFloraisonFeteched] =
    useState<Partial<ISensorStoredData>>();
  const [lastData, setLastData] = useState<ISensorStoredData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchSensorData = async () => {
      try {
        const data = await getStoredSensorData("minute");
        if (data) setLastData(data[0]);
      } catch (error) {
        console.error("An error occurred while fetching sensor data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSensorData();
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

  return (
    <div>
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-75">
          <Spinner />
        </div>
      )}
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
