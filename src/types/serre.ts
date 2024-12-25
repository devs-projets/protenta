import { ICulture } from "./culture";
import { User } from "./user";

export interface ISerre {
  id: string;
  name: string;
  protentaId: string;
  capteurId: string;
  users: User[];
  allCulture: ICulture[];
}
