import { ISensorStoredData } from "./storedData";

export interface IMinuteDataState {
  data: ISensorStoredData[];
  loading: boolean;
  error: string | null;
}
