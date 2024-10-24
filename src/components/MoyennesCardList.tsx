import React from "react";
import Co2Icon from "@/assets/icons/co2.png";
import HumiditeIcon from "@/assets/icons/humidite.png";
import SolHumiditeIcon from "@/assets/icons/solHumidite.png";
import LumiereIcon from "@/assets/icons/lumiere.png";
import PressionAtmoIcon from "@/assets/icons/pressionAtmo.png";
import TemperatureIcon from "@/assets/icons/temperature.png";
import MoyenneCard from "./view/MoyenneCard";
import Link from "next/link";

export interface MoyenneItem {
  name: string;
  icon: any;
  value: number;
}
  export const moyennes: MoyenneItem[] = [
    {
      name: "Température",
      icon: TemperatureIcon,
      value: 0.0,
    },
    {
      name: "Humidité",
      icon: HumiditeIcon,
      value: 0,
    },
    {
      name: "Lumière",
      icon: LumiereIcon,
      value: 0.0,
    },
    {
      name: "Pression atm",
      icon: PressionAtmoIcon,
      value: 0.0,
    },
    {
      name: "Humidite sol",
      icon: SolHumiditeIcon,
      value: 0.0,
    },
    {
      name: "Co2",
      icon: Co2Icon,
      value: 0.0,
    },
  ];
const MoyennesCardList = () => {

  return (
    <>
      {moyennes.map((item, index) => (
        <Link key={item.name} href={"/dashboard/experts/moyenne/" + item.name}>
          <MoyenneCard key={`moyenne_item_${index}`} item={item} />
        </Link>
      ))}
    </>
  );
};

export default MoyennesCardList;
