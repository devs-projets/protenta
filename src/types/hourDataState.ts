import { ISensorStoredData } from "./storedData";

export interface IHourDataState {
    data: ISensorStoredData[];
    loading: boolean;
    error: string | null;
}
