import { ISensorData } from "@/types/monitor";

export const defaultSensorData: ISensorData = {
    id: "",
    name: "",

    
    latest: "", // Default to an empty string
    elapsed: "0", // Default elapsed time to 0
    localName: "Unknown Sensor", // Default sensor name
    temperature: 0, // Default temperature value
    humidity: 0, // Default humidity value
    pressure: 0, // Default pressure value
    light_A: 0, // Default light intensity
    sol: 0, // Default soil moisture
    acc_x: 0, // Default accelerometer x-axis
    acc_y: 0, // Default accelerometer y-axis
    acc_z: 0, // Default accelerometer z-axis
    iaq: 0, // Default indoor air quality index
    gyro_x: 0, // Default gyroscope x-axis
    gyro_y: 0, // Default gyroscope y-axis
    gyro_z: 0, // Default gyroscope z-axis
    accuracy: 0, // Default accuracy level
  
    // Threshold values
    SeuilHumidity_min: 0,
    SeuilHumidity_max: 100,
    SeuilTemp_min: -50,
    SeuilTemp_max: 50,
    SeuilLum_min: 0,
    SeuilLum_max: 1000,
    SeuilPression_min: 900,
    SeuilPression_max: 1100,
    SeuilCo2_min: 0,
    SeuilCo2_max: 1000,
  
    // Mean values
    MeanTemp: 0,
    MeanHumidity: 0,
    MeanLum: 0,
    MeanPress: 0,
    MeanCo2: 0,
  
    // Output states
    S1: 0,
    S2: 0,
    S3: 0,
    S4: 0,
    S5: 0,
    S6: 0,
    S7: 0,
    S8: 0,
    S9: 0,
    S10: 0,
    S11: 0,
    S12: 0,
    S13: 0,
    S14: 0,
    S15: 0,
    S16: 0,
  
    MomentFloraison: false, // Default flowering status
    a1: 0,
    a2: 0,
    a3: 0,
    a4: 0,
    a5: 0,
    a6: 0,
    a7: 0,
    a8: 0,
    a9: 0,
    a10: 0,
  };
  