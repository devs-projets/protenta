import Co2Icon from "@/assets/icons/co2.png";
import HumiditeIcon from "@/assets/icons/humidite.png";
import SolHumiditeIcon from "@/assets/icons/solHumidite.png";
import LumiereIcon from "@/assets/icons/lumiere.png";
import PressionAtmoIcon from "@/assets/icons/pressionAtmo.png";
import TemperatureIcon from "@/assets/icons/temperature.png";

export const defaulMoyenneCardData = [
  {
    accessParam: "temperature",
    name: "Température",
    icon: TemperatureIcon,
    value: 0.0,
  },
  {
    accessParam: "humidite",
    name: "Humidité",
    icon: HumiditeIcon,
    value: 0.0,
  },
  { accessParam: "lumiere", name: "Lumière", icon: LumiereIcon, value: 0.0 },
  {
    accessParam: "pressionatm",
    name: "Pression atm",
    icon: PressionAtmoIcon,
    value: 0.0,
  },
  {
    accessParam: "humditesol",
    name: "Humidité sol",
    icon: SolHumiditeIcon,
    value: 0.0,
  },
  { accessParam: "co2", name: "CO₂", icon: Co2Icon, value: 0.0 },
];
