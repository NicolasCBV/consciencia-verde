import { Container } from "inversify";
import { CustomServer, serverIds } from "./infra/server";
import { storageIds } from "./infra/storages/ids";
import { RedisService } from "./infra/storages/cache/redis";
import { adapterIds } from "./app/adapters/adapterIds";
import { BcryptAdapter } from "./app/adapters/bcrypt";
import { JwtAdapter } from "./app/adapters/jwt";
import { AuthMiddleware } from "./infra/middlewares/auth/auth.middleware";
import { midIds } from "./infra/middlewares/midIds";
import { FingerprintMiddleware } from "./infra/middlewares/auth/fingerprint.middleware";
import { AdminMiddleware } from "./infra/middlewares/auth/admin.middleware";
import { CreatePostDTO } from "./infra/middlewares/DTO/createPost.DTO";
import { UpdatePostDTO } from "./infra/middlewares/DTO/updatePost.DTO";
import { FirebaseHandler } from "./infra/storages/externals/firestore";
import { SetPostUseCase } from "./app/use-cases/setPost.use-case";
import { useCaseIds } from "./app/use-cases/useCaseIds";
import { UploadImagePostUseCase } from "./app/use-cases/uploadImageOnPost.use-case";
import { DeletePostUseCase } from "./app/use-cases/deletePost.use-case";
import { CreatePostController } from "./infra/controllers/post/createPost.controller";
import { controllerIds } from "./infra/controllers/controllerIds";
import { UploadImagePostController } from "./infra/controllers/post/uploadImageOnPost.controller";
import { DeletePostController } from "./infra/controllers/post/deletePost.controller";
import { UpdatePostController } from "./infra/controllers/post/updatePost.controller";
import { ErrorMiddleware } from "./infra/middlewares/error.middleware";
import { RedisTokenEntitie } from "./infra/storages/cache/redis/entities/token.entitie";

export const container = new Container();

container.bind(storageIds.cache.manager).to(RedisService);
container.bind(storageIds.cache.tokenEntitie).to(RedisTokenEntitie)

container.bind(storageIds.external.postRepo).to(FirebaseHandler)

container.bind(adapterIds.crypt).to(BcryptAdapter);
container.bind(adapterIds.token).to(JwtAdapter)

container.bind(midIds.error).to(ErrorMiddleware);
container.bind(midIds.auth.mid).to(AuthMiddleware);
container.bind(midIds.fingerprint.mid).to(FingerprintMiddleware);
container.bind(midIds.admin.mid).to(AdminMiddleware);

container.bind(midIds.DTO.createPost).to(CreatePostDTO);
container.bind(midIds.DTO.updatePost).to(UpdatePostDTO);

container.bind(useCaseIds.post.create).to(SetPostUseCase);
container.bind(useCaseIds.post.uploadImage).to(UploadImagePostUseCase)
container.bind(useCaseIds.post.delete).to(DeletePostUseCase)

container.bind(controllerIds.createPost).to(CreatePostController);
container.bind(controllerIds.updatePost).to(UpdatePostController)
container.bind(controllerIds.uploadImagePost).to(UploadImagePostController)
container.bind(controllerIds.deletePost).to(DeletePostController)

container.bind(serverIds.server).to(CustomServer);

export const application = {
  middlewares: {
    error: container.get<ErrorMiddleware>(midIds.error),
    auth: container.get<AuthMiddleware>(midIds.auth.mid),
    fingerprint: container.get<FingerprintMiddleware>(midIds.fingerprint.mid),
    admin: container.get<AdminMiddleware>(midIds.admin.mid),
    DTO: {
      createPost: container.get<CreatePostDTO>(midIds.DTO.createPost),
      updatePost: container.get<UpdatePostDTO>(midIds.DTO.updatePost)
    }
  },
  controllers: {
    createPost: container.get<CreatePostController>(controllerIds.createPost),
    updatePost: container.get<UpdatePostController>(controllerIds.updatePost),
    uploadImage: container.get<UploadImagePostController>(controllerIds.uploadImagePost),
    deletePost: container.get<DeletePostController>(controllerIds.deletePost)
  },
  server: container.get<CustomServer>(serverIds.server)
}

