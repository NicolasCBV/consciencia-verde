import request from "supertest";
import { routes_names } from "../../routes/routes_names";
import { Router, json } from "express";
import { appTest } from "@tests/setup/define-app-test";
import { setAuth } from "@tests/utils/setAuth";
import { z } from "zod";

const routes = Router();

describe("Create post test E2E", () => {
  beforeAll(async () => {
    appTest.server.expressApp.use(json());
    routes.use(appTest.middlewares.auth.exec);
    routes.use(appTest.middlewares.fingerprint.exec);
    routes.use(appTest.middlewares.admin.exec)

    routes.post(
      routes_names.create_post,
      appTest.middlewares.DTO.createPost.exec,
      appTest.controllers.createPost.exec 
    );

    routes.use(appTest.middlewares.error.exec);

    appTest.server.expressApp.use(routes);
  })

  it("should be able to create post", async () => {
    const { token } = await setAuth(); 
  
    const expectedBody = z.object({
      id: z.string()
    });
  
    const res = await request(appTest.server.expressApp)
      .post(routes_names.create_post)
      .send({
        name: "Primeiro post22",
        description: "Description22",
        content: ["test", "2"]
      })
      .set("authorization", `Bearer ${token}`)
      .set("content-type", "application/json");
  
    expect(res.status).toEqual(201);
    expect(expectedBody.parseAsync(res.body)).resolves;
  })

  it("should throw one error - bad request", async () => {
    const { token } = await setAuth(); 

    const res = await request(appTest.server.expressApp)
      .post(routes_names.create_post)
      .send({
        id: "default_id",
        name: "Primeiro post22",
        description: "Description22",
        content: ["test", "2"]
      })
      .set("authorization", `Bearer ${token}`)
      .set("content-type", "application/json");

    expect(res.status).toEqual(400);
  })
})
