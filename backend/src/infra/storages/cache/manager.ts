export abstract class CacheManager {
  abstract close(): Promise<void>;
}
