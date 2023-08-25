import { HttpClient } from "@/@core/adapters/adapters.container"
import { RegisterContainer } from "@/@core/containers/register"
import { CreateUserGateway } from "@/@core/infra/gateways/user/user.create.gateway"
import { CreateUserUseCase } from "../create.use-case"

CreateUserGateway.prototype.create = jest.fn(async () => ({
  cancelKey: "random uuid" 
}));

describe("Create user use case test", () => {
  const registers = {
    gateway: "create user gateway",
    useCase: "create user use case"
  }
  let container: RegisterContainer

  beforeEach(() => {
    container = new RegisterContainer({
      [registers.gateway]: {
        dependencies: {
          imports: [HttpClient]
        },
        instance: CreateUserGateway
      },
      [registers.useCase]: {
        dependencies: {
          imports: [registers.gateway]
        },
        instance: CreateUserUseCase
      }
    })
  });

  it("should be able to create user", async () => {
    const useCase = container.start(CreateUserUseCase, registers.useCase);

    const gatewaySpy = jest.spyOn(CreateUserGateway.prototype, "create");

    await useCase.exec({
      name: "default name",
      email: "default@email.com",
      password: "123456"
    });

    expect(gatewaySpy).toHaveBeenCalledTimes(1);
  })
})
