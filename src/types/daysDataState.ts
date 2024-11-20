import { ISensorStoredData } from "./storedData";

export interface IDayDataSate {
    data: ISensorStoredData[];
    loading: boolean;
    error: string | null;
}