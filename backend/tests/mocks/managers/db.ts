import { DatabaseManager } from "@infra/storages/db/manager";
import { injectable } from "inversify";

@injectable()
export class DatabaseManagerMock implements DatabaseManager {
  async init() {}
  async close() {}
}
