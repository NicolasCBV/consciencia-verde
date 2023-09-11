import { AdminsTypes } from "./types/admins.types";

export abstract class AdminsCacheRepo {
  abstract exist(input: AdminsTypes.IExists): Promise<boolean>;
  abstract create(input: AdminsTypes.ICreate): Promise<void>;
}
