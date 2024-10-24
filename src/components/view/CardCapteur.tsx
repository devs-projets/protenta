import React from "react";
import { CapteurItem } from "./Capteurs";

const CardCapteur = ({
  item,
  capteurIndex,
}: {
  item: CapteurItem;
  capteurIndex: number;
}) => {
  return (
    <div className="border border-gray-900 rounded-lg w-64">
      <div className="bg-[#d4d3d3] rounded-tl-lg rounded-tr-lg p-2 text-center font-bold">
        <h2>Capteur l{capteurIndex}</h2>
      </div>
      <div>
        <ul className="p-2">
          <li className="flex justify-between my-1">
            <span className="block">Température : </span>
            <span className="block">--- °C</span>
          </li>
          <li className="flex justify-between my-1">
            <span className="block">Humidité : </span>
            <span className="block">--- %</span>
          </li>
          <li className="flex justify-between my-1">
            <span className="block">Hum Sol : </span>
            <span className="block">--- %</span>
          </li>
          <li className="flex justify-between my-1">
            <span className="block">Press. Atm : </span>
            <span className="block">--- hPa</span>
          </li>
          <li className="flex justify-between my-1">
            <span className="block">Air : </span>
            <span className="block">---/---/---/---</span>
          </li>
          <li className="flex justify-between my-1">
            <span className="block">Lumière : </span>
            <span className="block">--- Lux</span>
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
