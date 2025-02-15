import { ILatestData } from "./latestDataState";

type ActionaireStateType = boolean | number;

export interface ActionaireState {
  S1: ActionaireStateType;
  S2: ActionaireStateType;
  S3: ActionaireStateType;
  S4: ActionaireStateType;
  S5: ActionaireStateType;
  S6: ActionaireStateType;
  S7: ActionaireStateType;
  S8: ActionaireStateType;
  S9: ActionaireStateType;
  S10: ActionaireStateType;
  S11: ActionaireStateType;
  S12: ActionaireStateType;
  S13: ActionaireStateType;
  S14: ActionaireStateType;
  S15: ActionaireStateType;
  S16: ActionaireStateType;
}

export const ActionnaireDefautlDesctiption = [
  'Pollinisateur',
  "Electrovanne 1",
  "Electrovanne 2",
  "Led UV",
  "Mag Lock 1",
  "Mag Lock 2",
  "Pad cooling",
  "Extracteur d’humidité",
  "Générateur",
  "Pompe à eau",
  "Moteur de déploiement",
  "Moteur de repliement",
  "Bipeur",
  "Non définie",
  "Non définie",
  "Non définie",
  "Non définie",
  "Non définie",
  "Non définie",
  "Non définie",
  "Non définie",
  "Non définie",
]


export type SKeys = Pick<
  ILatestData,
  | "S1"
  | "S2"
  | "S3"
  | "S4"
  | "S5"
  | "S6"
  | "S7"
  | "S8"
  | "S9"
  | "S10"
  | "S11"
  | "S12"
  | "S13"
  | "S14"
  | "S15"
  | "S16"
>;

export type ManuelAutoKeys = Pick<
  ILatestData,
  | "ManuelAutoS1"
  | "ManuelAutoS2"
  | "ManuelAutoS3"
  | "ManuelAutoS4"
  | "ManuelAutoS5"
  | "ManuelAutoS6"
  | "ManuelAutoS7"
  | "ManuelAutoS8"
  | "ManuelAutoS9"
  | "ManuelAutoS10"
  | "ManuelAutoS11"
  | "ManuelAutoS12"
  | "ManuelAutoS13"
  | "ManuelAutoS14"
  | "ManuelAutoS15"
  | "ManuelAutoS16"
>;