import { RegisterContainer } from "@/@core/containers/register";
import { CreatePostGateway } from "@/@core/infra/gateways/post/post.create.gateway";
import { ExistentPostGateway } from "@/@core/infra/gateways/post/post.exist.gateway";
import { GetPostGateway } from "@/@core/infra/gateways/post/post.get.gateway";
import { CreatePostUseCase } from "./create/create.use-case";
import { ExistPostUseCase } from "./exist/exist.use-case";
import { GetPostUseCase } from "./get/get.use-case";

export const postRegister = {
  gateways: {
    create: "create post gateway",
    get: "get post gateway",
    exist: "exist post gateway"
  },
  useCases: {
    create: "create post use case",
    get: "get post use case",
    exist: "exist post use case"
  }
};

export const PostContainer = new RegisterContainer({
  [postRegister.gateways.create]: {
    instance: CreatePostGateway
  },
  [postRegister.useCases.create]: {
    dependencies: {
      imports: [postRegister.gateways.create]
    },
    instance: CreatePostUseCase
  },

  [postRegister.gateways.get]: {
    instance: GetPostGateway
  },
  [postRegister.useCases.get]: {
    dependencies: {
      imports: [postRegister.gateways.get]
    },
    instance: GetPostUseCase
  },

  [postRegister.gateways.exist]: {
    instance: ExistentPostGateway
  },
  [postRegister.useCases.exist]: {
    dependencies: {
      imports: [postRegister.gateways.exist]
    },
    instance: ExistPostUseCase
  }

});

