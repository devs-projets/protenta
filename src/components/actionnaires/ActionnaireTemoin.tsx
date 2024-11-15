import { useSocket } from "@/context/SocketContext";
import React, { useEffect, useState } from "react";

const ActionnaireTemoin = () => {
  const [actionnaires, setActionnaires] = useState<{ [key: string]: number }>(
    {}
  );
  const { sensorData } = useSocket();

  useEffect(() => {
    if (sensorData) {
      const actionnairesList = Object.keys(sensorData)
        .filter((key) => key.startsWith("S") && !key.startsWith("Seuil"))
        .reduce<{ [key: string]: number }>((obj, key) => {
          obj[key] = sensorData[key];
          return obj;
        }, {});

      setActionnaires(actionnairesList);
    }
  }, [sensorData]);

  return (
    <div className="border py-5 rounded-lg shadow-lg">
      <h1 className="text-center text-2xl font-bold mb-5">Actionnaires</h1>
      <div className="flex flex-wrap justify-center gap-5">
        {Object.entries(actionnaires).map(([key, value]) => (
          <div
            className="flex justify-center items-center gap-5 flex-wrap"
            key={key}
          >
            <div className="bg-slate-200 w-24 shadow-lg rounded-lg flex flex-col justify-center items-center py-2 px-4">
              <h2>{key}</h2>
              <div>
                <div className={`h-10 w-10 ${value === 0 ? "bg-red-500" : "bg-green-500"} rounded-full mt-2`}></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActionnaireTemoin;
