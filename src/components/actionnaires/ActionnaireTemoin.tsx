import { useSocket } from "@/context/SocketContext";
import { RootState } from "@/store/store";
import { ActionnaireDefautlDesctiption } from "@/types/actionnaireState";
import { ISensorStoredData } from "@/types/storedData";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { defaulActionnairesData } from "@/mockData/defaultActionnairesData";
import ActionnaireCard from "./ActionnaireCard";
import { ILatestData } from "@/types/latestDataState";

const ActionnaireTemoin = () => {
  const [actionnaires, setActionnaires] = useState<{ [key: string]: number }>(
    {}
  );
  const { sensorData } = useSocket();
  const { data: latestData } = useSelector(
    (state: RootState) => state.latestData
  );

  useEffect(() => {
    if (sensorData) {
      const actionnairesList = Object.keys(sensorData)
        .filter((key) => key.startsWith("S") && !key.startsWith("Seuil"))
        .reduce<{ [key: string]: number }>((obj, key) => {
          obj[key] = sensorData[key];
          return obj;
        }, {});

      setActionnaires(actionnairesList);
    } else if (latestData) {
      // const lastData: ISensorStoredData = minuteData[0];
      const actionnairesList = Object.keys(latestData)
        .filter(
          (key): key is keyof ISensorStoredData =>
            key.startsWith("S") && !key.startsWith("Seuil")
        )
        .reduce<{ [key: string]: number }>((obj, key) => {
          obj[key] = latestData[key as keyof ILatestData] as number;
          return obj;
        }, {});
      setActionnaires(actionnairesList);
    }
  }, [sensorData, latestData]);

  return (
    <div className="border py-5 rounded-lg shadow-lg">
      <h1 className="text-center text-2xl font-bold mb-5">Actionnaires</h1>
      <div className="flex flex-wrap justify-center gap-5">
        {defaulActionnairesData.map((item, index) => (
          <ActionnaireCard key={item.name} item={item} data={latestData} index={index} />
        ))}
      </div>
    </div>
  );
};

export default ActionnaireTemoin;
