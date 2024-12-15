import { EUserRole } from "./userRole";

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  role: string;
  userName: string;
  // TODO: à mettre à jour !
  allSerre: any;
}

export interface ICreateUser {
  passWord: string;
  firstName: string;
  lastName: string;
  phone: string;
  role: EUserRole;
}
