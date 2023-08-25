import request from "supertest";
import { routes_names } from "../../routes/routes_names";
import { Router, json } from "express";
import { appTest } from "@tests/setup/define-app-test";
import { setAuth } from "@tests/utils/setAuth";
import path from "path";
import multer from "multer";

const routes = Router();
const storage = multer.memoryStorage();

const upload = multer({ storage });


describe("Upload image on post test E2E", () => {
  beforeAll(async () => {
    appTest.server.expressApp.use(json());
    routes.use(appTest.middlewares.auth.exec);
    routes.use(appTest.middlewares.fingerprint.exec);
    routes.use(appTest.middlewares.admin.exec)

    routes.post(
      routes_names.upload_post_image,
      upload.single("file"),
      appTest.controllers.uploadImage.exec
    )

    routes.use(appTest.middlewares.error.exec);

    appTest.server.expressApp.use(routes);
  })

  it("should be able to upload image on post", async () => {
    const { token } = await setAuth();

    const url = path.join(__dirname, "assets-tests", 'test-unsplash.jpg');
  
    const res = await request(appTest.server.expressApp)
      .post(`/post/random_id/upload-image`)
      .attach('file', url)
      .set("authorization", `Bearer ${token}`)
  
    expect(res.status).toEqual(200);
  })
})
