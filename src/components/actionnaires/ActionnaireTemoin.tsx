import { useSocket } from "@/context/SocketContext";
import { RootState } from "@/store/store";
import { ActionnaireDefautlDesctiption } from "@/types/actionnaireState";
import { ISensorStoredData } from "@/types/storedData";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const ActionnaireTemoin = () => {
  const [actionnaires, setActionnaires] = useState<{ [key: string]: number }>(
    {}
  );
  const { sensorData } = useSocket();
  const { data: minuteData } = useSelector(
    (state: RootState) => state.minuteData
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
    } else if (minuteData[0]) {
      const lastData: ISensorStoredData = minuteData[0];
      const actionnairesList = Object.keys(lastData)
        .filter(
          (key): key is keyof ISensorStoredData =>
            key.startsWith("S") && !key.startsWith("Seuil")
        )
        .reduce<{ [key: string]: number }>((obj, key) => {
          obj[key] = lastData[key] as number;
          return obj;
        }, {});
      setActionnaires(actionnairesList);
    }
  }, [sensorData, minuteData]);

  return (
    <div className="border py-5 rounded-lg shadow-lg">
      <h1 className="text-center text-2xl font-bold mb-5">Actionnaires</h1>
      <div className="flex flex-wrap justify-center gap-5">
        {Object.entries(actionnaires).map(([key, value]) => (
          <div
            className="flex justify-center items-center gap-5 flex-wrap"
            key={key}
          >
            <div className="bg-slate-200 w-60 h-32 shadow-lg rounded-lg flex flex-col justify-center items-center py-2 px-4">
              <h2 className="font-bold">{key}</h2>
              <p>{ActionnaireDefautlDesctiption[parseInt(key.slice(1))]}</p>
              <div>
                <div
                  className={`h-10 w-10 ${
                    value === 0 ? "bg-red-500" : "bg-green-500"
                  } rounded-full mt-2`}
                ></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActionnaireTemoin;
