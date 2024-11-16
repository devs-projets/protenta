export interface ISensorData {
  id: string;
  name: string;

  latest: string; // Latest sensor reading timestamp or identifier
  elapsed: string; // Elapsed time since the last reading
  localName: string; // Local name of the sensor/device
  temperature: number; // Temperature value
  humidity: number; // Humidity value
  pressure: number; // Pressure value
  light_A: number; // Ambient light intensity
  sol: number; // Soil moisture or another environmental factor
  acc_x: number; // Accelerometer data along x-axis
  acc_y: number; // Accelerometer data along y-axis
  acc_z: number; // Accelerometer data along z-axis
  iaq: number; // Indoor air quality index
  gyro_x: number; // Gyroscope data along x-axis
  gyro_y: number; // Gyroscope data along y-axis
  gyro_z: number; // Gyroscope data along z-axis
  accuracy: number; // Accuracy level of the sensor data

  // Threshold values
  SeuilHumidity_min: number; // Minimum humidity threshold
  SeuilHumidity_max: number; // Maximum humidity threshold
  SeuilTemp_min: number; // Minimum temperature threshold
  SeuilTemp_max: number; // Maximum temperature threshold
  SeuilLum_min: number; // Minimum light intensity threshold
  SeuilLum_max: number; // Maximum light intensity threshold
  SeuilPression_min: number; // Minimum pressure threshold
  SeuilPression_max: number; // Maximum pressure threshold
  SeuilCo2_min: number; // Minimum CO2 threshold
  SeuilCo2_max: number; // Maximum CO2 threshold

  // Mean values
  MeanTemp: number; // Mean temperature over a period
  MeanHumidity: number; // Mean humidity over a period
  MeanLum: number; // Mean light intensity over a period
  MeanPress: number; // Mean pressure over a period
  MeanCo2: number; // Mean CO2 levels over a period

      // propriété ajouter
  MeanHumSol: number;

  // Output states
  S1: number; // Output state for S1 (0 = off, 1 = on)
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

  MomentFloraison: boolean; // Indicates whether flowering has started
  a1: number; // Output atate for a1 (0 = off, 1 = on)
  a2: number;
  a3: number;
  a4: number;
  a5: number;
  a6: number;
  a7: number;
  a8: number;
  a9: number;
  a10: number;
}

export type ISensorAverageData = Partial<ISensorData>;
