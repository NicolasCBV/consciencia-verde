import { TokensCacheRepo } from "@app/repositories/tokens.repository";
import { TokensTypes } from "@app/repositories/types/tokens.types";
import { redisClient } from "../client";
import { injectable } from "inversify";

@injectable()
export class RedisTokenEntitie implements TokensCacheRepo {
	async set(input: TokensTypes.ICreateToken): Promise<void> {
		await redisClient.set(
			`token:${input.type}.${input.id}`,
			input.content,
			"PX",
			input.ttl
		);
	}

	async get(input: TokensTypes.IGetToken): Promise<string | null> {
		return await redisClient.get(`token:access_token.${input.id}`);
	}

	async exist(input: TokensTypes.IExistToken): Promise<boolean> {
		const res = await redisClient.exists(`token:access_token.${input.id}`);
		return Boolean(res);
	}
}
