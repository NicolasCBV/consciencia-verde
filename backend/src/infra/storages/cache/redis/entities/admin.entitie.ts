import { AdminsTypes } from "@app/repositories/types/admins.types";
import { redisClient } from "../client";
import { AdminsCacheRepo } from "@app/repositories/admins.cache-repository";
import { AdminMapper } from "@app/mappers/admins";
import { injectable } from "inversify";

@injectable()
export class RedisAdminEntitie implements AdminsCacheRepo {
  async exist(input: AdminsTypes.IExists): Promise<boolean> {
    const res = await redisClient.exists(`admin:user:${input.userId}`);
    return Boolean(res);
  }

  async create(input: AdminsTypes.ICreate): Promise<void> {
    await redisClient.set(
      `admin:user:${input.admin.userId}`,
      JSON.stringify(AdminMapper.toRepresentationalJSON(input.admin)),
      "PX",
      86400000,
    );
  }
}
