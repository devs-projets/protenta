export interface InitialConfigData {
  HumMin: number;
  HumMax: number;
  TemMin: number;
  TemMax: number;
  LumMin: number;
  LumMax: number;
  PressMin: number;
  PressMax: number;
  Co2Min: number;
  Co2Max: number;
  PolStartTime: number;
  PolEndTime: number;
  Periode: number;
  MomentFloraison: boolean;
  capteurNombres: number;
  initialActionaire: Record<string, boolean>; // Mappe des clés comme S1, S2, etc., à des booléens
}
