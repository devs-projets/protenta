import { ILatestData } from "@/types/latestDataState";

export const extractFloraison = (
  lastData: ILatestData
): Partial<ILatestData> => {
  return {
    MomentFloraison: lastData.MomentFloraison,
    Periode: lastData.Periode,
    PolEndTime: lastData.PolEndTime,
    PolStartTime: lastData.PolStartTime,
  };
};
