import { CacheManager } from "@infra/storages/cache/manager";
import { injectable } from "inversify";

@injectable()
export class CacheManagerMock implements CacheManager {
	async close() {}
}
