import { ILatestData } from "@/types/latestDataState";

export const extractFloraison = (
  lastData: ILatestData
): Partial<ILatestData> => {
  return {
    MomentFloraison: lastData.MomentFloraison,
    PeriodePol: lastData.PeriodePol,
    PolEndTime: lastData.PolEndTime,
    PolStartTime: lastData.PolStartTime,
  };
};
