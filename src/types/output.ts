export interface OutPutCapteur {
  latest: number;
  elapsed: number;
  localName: string;
  temperature: number;
  humidity: number;
  pression: number;
  light_A: number;
  sol: number;
  acc_x: number;
  acc_y: number;
  acc_z: number;
  iaq: number;
  gyro_x: number;
  gyro_y: number;
  gyro_z: number;
  accuracy: number;
}
