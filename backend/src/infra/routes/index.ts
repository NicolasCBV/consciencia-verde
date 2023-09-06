import { Router } from "express";
import { application } from "@src/app";
import { routes_names } from "./routes_names";
import multer from "multer";
import { BadRequest } from "../errors/BadRequest";
import rateLimit from "express-rate-limit";

export const routes: Router = Router();
const storage = multer.memoryStorage();

routes.use(rateLimit({
  windowMs: 30 * 1000,
  max: 60,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    name: "Too Many Requests",
    message: "Too many requests, please try again later.",
    code: 429
  }
}));
const upload = multer({ 
  storage,
  limits: {
    files: 1,
    fileSize: 1024 * 1024 * 4
  }, 
  fileFilter: (
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    req, 
    file, 
    callback
  ) => {
    if(
      file?.mimetype === "image/jpeg" ||
      file?.mimetype === "image/png" ||
      file?.mimetype === "image/gif" ||
      file?.mimetype === "image/pjpeg"
    ) 
      return callback(null, true);
    const err = new BadRequest();
    return callback(err)
  }
});
routes.get("/", (req, res) => res.status(200).end())
routes.use(application.middlewares.auth.exec);
routes.use(application.middlewares.fingerprint.exec);
routes.use(application.middlewares.admin.exec);

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
