import { InitialConfigType } from "@/components/cultures/InitialConfig";

export interface ICulture {
  id: string;
  name: string;
  variety: string;
  type: string;
  description: string;
  createdAt: string;
  startProduction: string;
  endProduction: string;
  productionIsEnded: boolean;
  updatedAt: string;
  initialConfigId: string | null;
  serreId: string;
  initialConfig: InitialConfigType;
}
