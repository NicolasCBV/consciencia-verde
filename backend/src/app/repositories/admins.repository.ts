import { AdminsTypes } from "./types/admins.types";

export abstract class AdminsRepo {
  abstract exist(input: AdminsTypes.IExists): Promise<boolean>;
}
