import { AdminsCacheRepo } from "@app/repositories/admins.cache-repository";
import { AdminsRepo } from "@app/repositories/admins.repository";
import { Admin } from "@app/entities/admin";
import { inject, injectable } from "inversify";
import { storageIds } from "../ids";

interface IProps {
  userId: string;
}

@injectable()
export class SearchManager {
  constructor(
    @inject(storageIds.db.adminEntitie)
	private readonly adminRepo: AdminsRepo,
    @inject(storageIds.cache.adminEntitie)
    private readonly adminCacheRepo: AdminsCacheRepo
  ) {}

  private async handleCache(userId: string): Promise<boolean> {
    const result = await this.adminRepo.exist({ userId });

    if(!result)
      return false;

    const admin = new Admin({ userId })
    await this.adminCacheRepo.create({ admin });

    return true;
  }

  async checkExistence(input: IProps): Promise<boolean> {
    const result = await this.adminCacheRepo.exist(input);

    if(!result)
      return await this.handleCache(input.userId);

    return true;
  }
}
