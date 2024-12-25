"use client";

import { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import LimiteList from "./LimiteTabs/LimiteList";
import ActionnaireList, { Actionnaire } from "./actionnaireTabs/ActionnaireList";
import FloraisonComponent from "./floraison/FloraisonComponent";
import { ISensorStoredData } from "@/types/storedData";
import Spinner from "../Spinner";
import { getLatestData } from "@/lib/fetchData/getLatestData";
import { extractActionnaires } from "@/lib/transformDatas/extractActionnaires";
import { extractLimites } from "@/lib/transformDatas/extractLimites";
import { extractFloraison } from "@/lib/transformDatas/extractFloraison";
import { ILatestData } from "@/types/latestDataState";

const ConfigTabs = () => {
  const [actionnairesFetched, setActionnairesFetched] =
    useState<Actionnaire[]>();
  const [limitesFetched, setLimitesFetched] = useState<Partial<ILatestData>>();
  const [floraisonFetched, setFloraisonFetched] =
    useState<Partial<ILatestData>>();
    
  const [loading, setLoading] = useState<boolean>(true);
  const [reload, setReload] = useState<boolean>(false);
  const [storedData, setStoredData] = useState<any>();

  useEffect(() => {
    const fetchSensorData = async () => {
      try {
        if (!loading) setLoading(true);
        const data = await getLatestData("monitor");
        setStoredData(data);
        setActionnairesFetched(extractActionnaires(data));
        // setActionnairesFetched(data);
        setLimitesFetched(extractLimites(data));
        setFloraisonFetched(extractFloraison(data));
      } catch (error) {
        console.error("An error occurred while fetching sensor data:", error);
      } finally {
        setLoading(false);
        setReload(false);
      }
    };

    fetchSensorData();
  }, [reload, setStoredData]);

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
          <LimiteList newLimites={limitesFetched} setReload={setReload} />
        </TabsContent>

        <TabsContent value="actionnaires">
          <ActionnaireList actionnairesFetched={actionnairesFetched} setReload={setReload} />
        </TabsContent>

        <TabsContent value="floraison">
          <FloraisonComponent floraisonFetched={floraisonFetched} setReload={setReload} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ConfigTabs;
