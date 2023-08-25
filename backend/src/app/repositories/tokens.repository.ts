import { TokensTypes } from "./types/tokens.types";

export abstract class TokensCacheRepo {
  abstract get(key: TokensTypes.IGetToken): Promise<string | null>;
  abstract exist(key: TokensTypes.IExistToken): Promise<boolean>;
  abstract set(key: TokensTypes.ICreateToken): Promise<void>;
}
