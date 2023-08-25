import { DatabaseManager } from "../manager";
import DataSource from "./ormconfig"
import { injectable } from "inversify";

@injectable()
export class TypeORMService implements DatabaseManager {
  private readonly datasource = DataSource;

  constructor() { }

  async init() {
    this.datasource.initialize();
  }

  async close() {
    this.datasource.destroy();
  }
}

