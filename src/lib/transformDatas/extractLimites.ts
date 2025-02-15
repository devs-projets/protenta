import { ILatestData } from "@/types/latestDataState";

export const extractLimites = (data: ILatestData): Partial<ILatestData> => ({
  SeuilHumidity_min: data.SeuilHumidity_min,
  SeuilHumidity_max: data.SeuilHumidity_max,
  SeuilTemp_min: data.SeuilTemp_min,
  SeuilTemp_max: data.SeuilTemp_max,
  SeuilLum_min: data.SeuilLum_min,
  SeuilLum_max: data.SeuilLum_max,
  SeuilPression_min: data.SeuilPression_min,
  SeuilPression_max: data.SeuilPression_max,
  SeuilCo2_min: data.SeuilCo2_min,
  SeuilCo2_max: data.SeuilCo2_max,
});