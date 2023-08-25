import { RegisterContainer } from "@/@core/containers/register"
import { ExistentPostGateway } from "@/@core/infra/gateways/post/post.exist.gateway";
import { ExistPostUseCase } from "./exist.use-case";

ExistentPostGateway.prototype.exist = jest.fn(async () => true);

describe("Exist post use case test", () => {
  const registers = {
    gateway: "exist post gateway",
    useCase: "exist post use case"
  }
  let container: RegisterContainer

  beforeEach(() => {
    container = new RegisterContainer({
      [registers.gateway]: {
        instance: ExistentPostGateway 
      },
      [registers.useCase]: {
        dependencies: {
          imports: [registers.gateway]
        },
        instance: ExistPostUseCase 
      }
    })
  });

  it("should be able to check if post exist", async () => {
    const useCase = container.start(ExistPostUseCase, registers.useCase);

    const gatewaySpy = jest.spyOn(ExistentPostGateway.prototype, "exist");

    await useCase.exec({ name: "default name" });

    expect(gatewaySpy).toHaveBeenCalledTimes(1);
  })
})
