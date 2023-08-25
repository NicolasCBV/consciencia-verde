import { Admin } from "@src/app/entities/admin";
import { AdminsRepo } from "@src/app/repositories/admins.repository";
import { AdminsTypes } from "@src/app/repositories/types/admins.types";
import { injectable } from "inversify";

@injectable()
export class InMemoryAdmins implements AdminsRepo {
  static admins: Admin[] = [];

  async exist(input: AdminsTypes.IExists): Promise<boolean> {
	const res = InMemoryAdmins.admins.find(
      (item) => item.userId === input.userId
    );
    return Boolean(res);
  }
}
