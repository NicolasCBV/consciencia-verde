import { redisClient } from "./client";
import { CacheManager } from "../manager";
import { injectable } from "inversify";

@injectable()
export class RedisService implements CacheManager {
  constructor() {}

  async close() {
    await redisClient.quit();
  }
}
