import { RegisterContainer } from "@/@core/containers/register"
import { GetPostGateway } from "@/@core/infra/gateways/post/post.get.gateway";
import { postFactory } from "@/tests/factory/post";
import { GetPostUseCase } from "./get.use-case";

GetPostGateway.prototype.get = jest.fn(async () => postFactory());

describe("Get post use case test", () => {
  const registers = {
    gateway: "get post gateway",
    useCase: "get post use case"
  }
  let container: RegisterContainer

  beforeEach(() => {
    container = new RegisterContainer({
      [registers.gateway]: {
        instance: GetPostGateway 
      },
      [registers.useCase]: {
        dependencies: {
          imports: [registers.gateway]
        },
        instance: GetPostUseCase 
      }
    })
  });

  it("should be able to get post", async () => {
    const useCase = container.start(GetPostUseCase, registers.useCase);

    const gatewaySpy = jest.spyOn(GetPostGateway.prototype, "get");
    const post = postFactory();

    await useCase.exec({ post });

    expect(gatewaySpy).toHaveBeenCalledTimes(1);
  })
})
