export abstract class DatabaseManager {
  abstract init(): Promise<void>;
  abstract close(): Promise<void>;
}
