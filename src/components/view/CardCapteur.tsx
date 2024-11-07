import React, { useEffect, useState } from "react";
import { CapteurItem } from "./Capteurs";
import { SensorLog } from "./IndividualCapteurLogs";

const CardCapteur = ({
  item,
  capteurIndex,
  sensorData,
}: {
  item: CapteurItem;
  capteurIndex: number;
  sensorData: SensorLog;
}) => {
  const [currentSensorData, setCurrentSensorData] = useState<SensorLog | null>(null);
  const [indicator, setIndicator] = useState<boolean>(false);

  useEffect(() => {
    if (sensorData?.localName === item.id) {
      setIndicator(true); // Mettre en évidence la card en cours de mise à jour
      setCurrentSensorData(sensorData);
    } else {
      setIndicator(false); // Réinitialiser les autres cards à l'état par défaut
    }
  }, [sensorData, item.id]);

  return (
    <div className="border border-gray-900 rounded-lg w-64">
      <div
        className={`${
          indicator ? "bg-green-500" : "bg-[#d4d3d3]"
        } rounded-tl-lg rounded-tr-lg p-2 text-center font-bold transition-colors duration-300`}
      >
        <h2>Capteur l{capteurIndex} {currentSensorData?.latest}</h2>
      </div>
      <div>
        <ul className="p-2">
          <li className="flex justify-between my-1">
            <span className="block">Température : </span>
            <span className="block">
              {currentSensorData?.temperature ? currentSensorData.temperature : "---"} °C
            </span>
          </li>
          <li className="flex justify-between my-1">
            <span className="block">Humidité : </span>
            <span className="block">
              {currentSensorData?.humidity ? currentSensorData.humidity : "---"} %
            </span>
          </li>
          <li className="flex justify-between my-1">
            <span className="block">Hum Sol : </span>
            <span className="block">--- %</span>
          </li>
          <li className="flex justify-between my-1">
            <span className="block">Press. Atm : </span>
            <span className="block">
              {currentSensorData?.pressure ? currentSensorData.pressure : "---"} hPa
            </span>
          </li>
          <li className="flex justify-between my-1">
            <span className="block">Air : </span>
            <span className="block">---/---/---/---</span>
          </li>
          <li className="flex justify-between my-1">
            <span className="block">Lumière : </span>
            <span className="block">
              {currentSensorData?.light_A ? currentSensorData.light_A : "---"} Lux
            </span>
          </li>
          <li className="flex justify-between my-1">
            <span className="block">Acc. : </span>
            <span className="block">---</span>
          </li>
          <li className="flex justify-between my-1">
            <span className="block">Gyro. : </span>
            <span className="block">---</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default CardCapteur;
