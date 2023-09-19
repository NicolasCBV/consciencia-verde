import request from "supertest";
import { routes_names } from "../../routes/routes_names";
import { Router, json } from "express";
import { appTest } from "@tests/setup/define-app-test";
import { setAuth } from "@tests/utils/setAuth";

const routes = Router();

describe("Update post test E2E", () => {
	beforeAll(async () => {
		appTest.server.expressApp.use(json());
		routes.use(appTest.middlewares.auth.exec);
		routes.use(appTest.middlewares.fingerprint.exec);
		routes.use(appTest.middlewares.admin.exec);

		routes.put(
			routes_names.update_post,
			appTest.middlewares.DTO.updatePost.exec,
			appTest.controllers.updatePost.exec
		);

		routes.use(appTest.middlewares.error.exec);

		appTest.server.expressApp.use(routes);
	});

	it("should be able to update post", async () => {
		const { token } = await setAuth(); 
  
		const res = await request(appTest.server.expressApp)
			.put("/post")
			.send({
				id: "random_id",
				name: "Primeiro post22",
				description: "Description22",
				content: ["test", "2"]
			})
			.set("authorization", `Bearer ${token}`)
			.set("content-type", "application/json");
  
		expect(res.status).toEqual(200);
	});
});
