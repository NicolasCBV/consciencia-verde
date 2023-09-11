import { TokensTypes } from "@app/repositories/types/tokens.types";
import { injectable } from "inversify";

@injectable()
export class InMemoryTokensCache {
  static tokens: { key: string, content: string }[] = [];

  async set(input: TokensTypes.ICreateToken): Promise<void> {
    const index = InMemoryTokensCache.tokens.findIndex(
      (item) => item.key.includes(input.id)
    );

    if(index >= 0) {
      InMemoryTokensCache.tokens[index] = {
        key: InMemoryTokensCache.tokens[index].key,
        content: input.content
      };
      return;
    }

    InMemoryTokensCache.tokens.push({
      key: `token:${input.type}.${input.id}`,
      content: input.content,
    })
  }

  async get(key: TokensTypes.IGetToken): Promise<string | null> {
	return "random-token";
  }
  
  async exist(key: TokensTypes.IExistToken): Promise<boolean> {
	return true;
  }
}
