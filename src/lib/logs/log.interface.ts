export interface ILogsData {
    id:               string;
    timestamp:        Date;
    UsersLogs:        UsersLogs;
    PolStartTime?:    string;
    PolEndTime?:      string;
    Periode?:         string;
    MomentFloraison?: boolean;
    S1?:              string;
    S2?:              string;
    S3?:              string;
    S4?:              string;
    S5?:              string;
    S6?:              string;
    S7?:              string;
    S8?:              string;
    S9?:              string;
    S10?:              string;
    S11?:              string;
    S12?:              string;
    S13?:              string;
    S14?:              string;
    S15?:              string;
    S16?:              string;
    param300?:        boolean;
    param301?:        boolean;
    param302?:        boolean;
    param303?:        boolean;
    param304?:        boolean;
    param305?:        boolean;
    param306?:        boolean;
    param307?:        boolean;
    param308?:        boolean;
    param309?:        boolean;
    param310?:        boolean;
    param311?:        boolean;
    param312?:        boolean;
    param313?:        boolean;
    param314?:        boolean;
    param315?:        boolean;
    param316?:        boolean;
    HumMin?:          number;
    HumMax?:         number;
    TemMin?:        number;
    TemMax?:       number;
    LumMin?:   number;
    LumMax?:   number;
    PressMin?:   number;
    PressMax?:   number;
    Co2Min?:   number;
    Co2Max?:   number;
}
export interface UsersLogs {
    id:   string;
    user: IUser;
}

export interface IUser {
    id:        string;
    firstName: string;
    lastName:  string;
    role:      string;
    allSerre?: []
}
export interface ICapteurs{
        id:  string;
        S1:  string;
        S2:  string;
        S3:  string;
        S4:  string;
        S5:  string;
        S6:  string;
        S7:  string;
        S8:  string;
        S9:  string;
        S10: string;
        S11: string;
        S12: string;
        S13: string;
        S14: string;
        S15: string;
        S16: string;
}
const actions: { [key: string]: string } = {
    param300: "Désactiver manuel S1",
    param301: "Désactiver manuel S2",
    param302: "Désactiver manuel S3",
    param303: "Désactiver manuel S4",
    param304: "Désactiver manuel S5",
    param305: "Désactiver manuel S6",
    param306: "Désactiver manuelAuto S7",
    param307: "Désactiver manuelAuto S8",
    param308: "Désactiver manuelAuto S9",
    param309: "Désactiver manuelAuto S10",
    param310: "Désactiver manuelAuto S11",
    param311: "Désactiver manuelAuto S12",
    param313: "Désactiver manuelAuto S13",
    param314: "Désactiver manuelAuto S14",
    param315: "Désactiver manuelAuto S15",
    param316: "Désactiver manuelAuto S16"
  };

  
  
 export function handleParamsAction(param: string, value: boolean): string {
    // const number = param.replace('param', '');
    
    if (value) {
      if (actions.hasOwnProperty(param)) {
        return actions[param].replace('Désactiver', 'Activer').replace('manuel', 'mode auto');
      }
    }
  
    return actions[param];
  }
  
//   // Exemple d'utilisation
//   console.log(getActionStatus('param300', true)); // Activer mode auto S1
//   console.log(getActionStatus(301, false)); // Désactiver manuel S2
//   console.log(getActionStatus(999, true)); // Action inconnue
  