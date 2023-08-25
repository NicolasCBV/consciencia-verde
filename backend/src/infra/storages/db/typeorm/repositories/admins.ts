import { AdminsRepo } from "@app/repositories/admins.repository";
import { AdminsTypes } from "@app/repositories/types/admins.types";
import { TypeORMAdmin } from "../models/admins";
import { injectable } from "inversify";

@injectable()
export class TypeORMAdminRepo implements AdminsRepo {
  async exist(input: AdminsTypes.IExists) {
    const res = TypeORMAdmin.findBy(input);

    return Boolean(res);
  }
}

