import request from "supertest";
import { Router, json } from "express";
import { appTest } from "@tests/setup/define-app-test";
import { setAuth } from "@tests/utils/setAuth";
import { JwtAdapter } from "@app/adapters/jwt";
import { InMemoryTokensCache } from "@tests/mocks/repositories/token.cache";

const routes = Router();

describe("Create post test E2E", () => {
	afterEach(async () => {
		InMemoryTokensCache.tokens = [];
	});

	beforeAll(async () => {
		appTest.server.expressApp.use(json());
		routes.use(appTest.middlewares.auth.exec);
		routes.use(appTest.middlewares.fingerprint.exec);
		routes.use(appTest.middlewares.admin.exec);

		routes.get("/", (req, res) => {
			res.status(200).end();
		});

		routes.use(appTest.middlewares.error.exec);

		appTest.server.expressApp.use(routes);
	});

	it("should be able to authenticate", async () => {
		const { token } = await setAuth(); 
  
		const res = await request(appTest.server.expressApp)
			.get("/")
			.set("authorization", `Bearer ${token}`);
  
		expect(res.status).toEqual(200);
	});

	it("should throw 401 status: admin doesn't exist", async () => {
		const tokenData = {
			type: "access_token",
			exp: Date.now() + 10000,
			iat: Date.now(),
			sub: "default_id",
			email: "default@email.com",
			userData: {
				name: "default name",
				level: 0,
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
  
		const res = await request(appTest.server.expressApp)
			.get("/")
			.set("authorization", `Bearer ${token}`);
  
		expect(res.status).toEqual(401);
	});

	it("should throw 401 status: device id is not right", async () => {
		const tokenData = {
			type: "access_token",
			exp: Date.now() + 10000,
			iat: Date.now(),
			sub: "default_id",
			email: "default@email.com",
			deviceId: "deviceId",
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
  
		const res = await request(appTest.server.expressApp)
			.get("/")
			.set("authorization", `Bearer ${token}`);
  
		expect(res.status).toEqual(401);
	});
});
