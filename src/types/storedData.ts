export interface ISensorStoredData {
  id: string;
  timestamp: string; // ISO 8601 timestamp
  startTimestamp: string; // ISO 8601 timestamp
  endTimestamp: string; // ISO 8601 timestamp
  averageTemp: number;
  averageHumidity: number;
  averagePressure: number;
  averageLightA: number;
  averageSol: number;
  averageAccX: number;
  averageAccY: number;
  averageAccZ: number;
  averageIaq: number;
  averageGyroX: number;
  averageGyroY: number;
  averageGyroZ: number;
  lastSeuilHumidityMin: number;
  lastSeuilHumidityMax: number;
  lastSeuilTempMin: number;
  lastSeuilTempMax: number;
  lastSeuilLumMin: number;
  lastSeuilLumMax: number;
  lastSeuilPressionMin: number;
  lastSeuilPressionMax: number;
  lastSeuilCo2Min: number;
  lastSeuilCo2Max: number;
  lastMeanTemp: number;
  lastMeanHumidity: number;
  lastMeanLum: number;
  lastMeanPress: number;
  lastMeanCo2: number;
  S1: number;
  S2: number;
  S3: number;
  S4: number;
  S5: number;
  S6: number;
  S7: number;
  S8: number;
  S9: number;
  S10: number;
  S11: number;
  S12: number;
  S13: number;
  S14: number;
  S15: number;
  S16: number;
  PolStartTime: string | null; // ISO 8601 timestamp or null
  PolEndTime: string | null; // ISO 8601 timestamp or null
  Periode: string | null;
  MomentFloraison: boolean;
  originalDataId: string | null;
}
