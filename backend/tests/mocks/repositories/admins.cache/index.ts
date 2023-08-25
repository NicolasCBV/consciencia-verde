import { Admin } from "@app/entities/admin";
import { AdminsCacheRepo } from "@app/repositories/admins.cache-repository";
import { AdminsTypes } from "@app/repositories/types/admins.types";
import { injectable } from "inversify";

@injectable()
export class InMemoryAdminsCache implements AdminsCacheRepo {
  static admins: Admin[] = [];

  async exist(input: AdminsTypes.IExists): Promise<boolean> {
	const admin = InMemoryAdminsCache.admins.find((item) => item.userId === input.userId);
	return Boolean(admin);
  }

  async create(input: AdminsTypes.ICreate): Promise<void> {
	const index = InMemoryAdminsCache.admins.findIndex(
		(item) => 
			item.userId === input.admin.userId ||
			item.id === input.admin.id
	);

	if(index >= 0) {
	  InMemoryAdminsCache.admins[index] = input.admin;
	  return;
	}

	InMemoryAdminsCache.admins.push(input.admin);
  }
}
