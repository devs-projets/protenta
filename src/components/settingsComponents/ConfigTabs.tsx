"use client";

import { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import LimiteList from "./LimiteTabs/LimiteList";
import ActionnaireList, {
  Actionnaire,
} from "./actionnaireTabs/ActionnaireList";
import FloraisonComponent from "./floraison/FloraisonComponent";
import Spinner from "../Spinner";
import { getLatestData } from "@/lib/fetchData/getLatestData";
import { extractActionnaires } from "@/lib/transformDatas/extractActionnaires";
import { extractLimites } from "@/lib/transformDatas/extractLimites";
import { extractFloraison } from "@/lib/transformDatas/extractFloraison";
import { ILatestData } from "@/types/latestDataState";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { useAuth } from "@/context/AuthProvider";

const ConfigTabs = () => {
  const [actionnairesFetched, setActionnairesFetched] =
    useState<Actionnaire[]>();
  const [limitesFetched, setLimitesFetched] = useState<Partial<ILatestData>>();
  const [floraisonFetched, setFloraisonFetched] =
    useState<Partial<ILatestData>>();
  const { access_token } = useAuth();
  const { currentSerre, activeCulture } = useSelector(
    (state: RootState) => state.serre
  );

  const [loading, setLoading] = useState<boolean>(true);
  const [reload, setReload] = useState<boolean>(false);
  // const [storedData, setStoredData] = useState<any>();

  // TODO: A checker
  useEffect(() => {
    const fetchSensorData = async () => {
      if (!access_token) {
        throw Error("Token not found !");
      }

      if (!activeCulture) {
        throw Error("Une culture active");
      }

      try {
        if (!loading) setLoading(true);
        const data = await getLatestData(
          access_token,
          currentSerre?.id as string,
          activeCulture.id,
          "monitor"
        );
        // setStoredData(data);
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
  }, [reload]);
  // }, [reload, setStoredData]);

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
          {/* TODO: Check ça */}
          {limitesFetched && <LimiteList newLimites={limitesFetched} setReload={setReload} />}
        </TabsContent>

        <TabsContent value="actionnaires">
          <ActionnaireList
            actionnairesFetched={actionnairesFetched}
            setReload={setReload}
          />
        </TabsContent>

        <TabsContent value="floraison">
          <FloraisonComponent
            floraisonFetched={floraisonFetched}
            setReload={setReload}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ConfigTabs;
