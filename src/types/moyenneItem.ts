import { StaticImageData } from "next/image";

export interface MoyenneItem {
  accessParam: string;
  name: string;
  icon: JSX.Element | StaticImageData | string;
  value: number | "N/A";
}
