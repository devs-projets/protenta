import { ILatestData } from "@/types/latestDataState";

export const extractLimites = (
  lastData: ILatestData
): Partial<ILatestData> => {
  return Object.keys(lastData)
    .filter((key): key is keyof ILatestData =>
      key.startsWith("Seuil")
    )
    .reduce((acc, key) => {
      (acc as any)[key] = lastData[key];
      return acc;
    }, {} as Partial<ILatestData>);
};
