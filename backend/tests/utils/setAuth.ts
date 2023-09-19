import { JwtAdapter } from "@app/adapters/jwt";
import { appTest } from "../setup/define-app-test";

export async function setAuth() {
	const tokenData = {
		type: "access_token",
		exp: Date.now() + 10000,
		iat: Date.now(),
		sub: "default_id",
		email: "default@email.com",
		userData: {
			name: "default name",
			level: 1,
			createdAt: new Date().toUTCString(),
			updatedAt: new Date().toUTCString()
		}
	} as const;

	const token = await new JwtAdapter().create(tokenData);
	await appTest.storages.cache.token.set({
		type: tokenData.type,
		content: token,
		ttl: tokenData.exp,
		id: tokenData.sub
	});

	return { token };
}
