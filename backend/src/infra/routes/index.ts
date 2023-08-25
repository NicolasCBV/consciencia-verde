import { Router } from "express";
import { application } from "@src/app";
import { routes_names } from "./routes_names";
import multer from "multer";

export const routes: Router = Router();
const storage = multer.memoryStorage();

const upload = multer({ storage });

routes.use(application.middlewares.auth.exec);
routes.use(application.middlewares.fingerprint.exec);
routes.use(application.middlewares.admin.exec)

routes.post(
  routes_names.create_post,
  application.middlewares.DTO.createPost.exec,
  application.controllers.createPost.exec 
);

routes.put(
  routes_names.update_post,
  application.middlewares.DTO.updatePost.exec,
  application.controllers.updatePost.exec
);

routes.post(
  routes_names.upload_post_image,
  upload.single("file"),
  application.controllers.uploadImage.exec
)

routes.delete(
  routes_names.delete_post,
  application.controllers.deletePost.exec
);
