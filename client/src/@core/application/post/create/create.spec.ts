import { RegisterContainer } from "@/@core/containers/register"
import { CreatePostGateway } from "@/@core/infra/gateways/post/post.create.gateway";
import { postFactory } from "@/tests/factory/post";
import { CreatePostUseCase } from "./create.use-case";

CreatePostGateway.prototype.create = jest.fn(async () => {});

describe("Create post use case test", () => {
  const registers = {
    gateway: "create post gateway",
    useCase: "create post use case"
  }
  let container: RegisterContainer

  beforeEach(() => {
    container = new RegisterContainer({
      [registers.gateway]: {
        instance: CreatePostGateway 
      },
      [registers.useCase]: {
        dependencies: {
          imports: [registers.gateway]
        },
        instance: CreatePostUseCase 
      }
    })
  });

  it("should be able to create post", async () => {
    const useCase = container.start(CreatePostUseCase, registers.useCase);

    const gatewaySpy = jest.spyOn(CreatePostGateway.prototype, "create");
    const post = postFactory();

    await useCase.exec({ post });

    expect(gatewaySpy).toHaveBeenCalledTimes(1);
  })
})
