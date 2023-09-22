import { IRefreshToken } from "@src/app/adapters/token.adapter";
import { randomUUID } from "crypto";

type TOverride = Partial<IRefreshToken>;

export function tokenFactory(input?: TOverride): IRefreshToken {
	return {
		sub: randomUUID(),
		type: "access_token",
		email: "default@email.com",
		userData: {
			name: "default name",
			createdAt: new Date().toUTCString(),
			updatedAt: new Date().toUTCString()
		},
		iat: Date.now(),
		exp: Date.now() + 1000 * 60 * 15,
		...input
	};
}
