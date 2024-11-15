import { useSocket } from "@/context/SocketContext";
import React, { useEffect, useState } from "react";

const ActionnaireTemoin = () => {

  const [actionnaires, setActionnaires] = useState<{ [key: string]: number }>({});
  const { sensorData } = useSocket();

  useEffect(() => {
    if (sensorData) {
      const actionnairesList = Object.keys(sensorData)
        .filter((key) => key.startsWith('S'))
        .reduce<{ [key: string]: number }>((obj, key) => {
          obj[key] = sensorData[key];
          return obj;
        }, {});

      setActionnaires(actionnairesList);
    }
  }, [sensorData]);

  console.log(actionnaires);

  return (
    <div className="border py-5 rounded-lg shadow-lg">
      <h1 className="text-center text-2xl font-bold mb-5">Actionnaires</h1>
      <div className="flex flex-wrap justify-center gap-5">
        <div className="flex justify-center items-center gap-5 flex-wrap">
          <div className="bg-slate-200 shadow-lg rounded-lg flex flex-col justify-center items-center py-2 px-4">
            <h2>S1</h2>
            <p>Description</p>
            <div>
              <div className="h-10 w-10 bg-green-500 rounded-full mt-2"></div>
            </div>
          </div>
        </div>
        <div className="flex justify-center items-center gap-5 flex-wrap">
          <div className="bg-slate-200 shadow-lg rounded-lg flex flex-col justify-center items-center py-2 px-4">
            <h2>S1</h2>
            <p>Description</p>
            <div>
              <div className="h-10 w-10 bg-green-500 rounded-full mt-2"></div>
            </div>
          </div>
        </div>
        <div className="flex justify-center items-center gap-5 flex-wrap">
          <div className="bg-slate-200 shadow-lg rounded-lg flex flex-col justify-center items-center py-2 px-4">
            <h2>S1</h2>
            <p>Description</p>
            <div>
              <div className="h-10 w-10 bg-green-500 rounded-full mt-2"></div>
            </div>
          </div>
        </div>
        <div className="flex justify-center items-center gap-5 flex-wrap">
          <div className="bg-slate-200 shadow-lg rounded-lg flex flex-col justify-center items-center py-2 px-4">
            <h2>S1</h2>
            <p>Description</p>
            <div>
              <div className="h-10 w-10 bg-green-500 rounded-full mt-2"></div>
            </div>
          </div>
        </div>
        <div className="flex justify-center items-center gap-5 flex-wrap">
          <div className="bg-slate-200 shadow-lg rounded-lg flex flex-col justify-center items-center py-2 px-4">
            <h2>S1</h2>
            <p>Description</p>
            <div>
              <div className="h-10 w-10 bg-green-500 rounded-full mt-2"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActionnaireTemoin;
