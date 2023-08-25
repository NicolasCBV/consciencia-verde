import { HttpClient } from "@/@core/adapters/adapters.container"
import { RegisterContainer } from "@/@core/containers/register"
import { CreateUserGateway } from "@/@core/infra/gateways/user/user.create.gateway"
import { ValidateUseCase } from "../validate.use-case";

CreateUserGateway.prototype.validate = jest.fn(async () => ({
  access_token: "access_token"
}));

describe("Validate user use case test", () => {
  const registers = {
    gateway: "validate user gateway",
    useCase: "validate user use case"
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
        instance: ValidateUseCase 
      }
    })
  });

  it("should be able to validate user", async () => {
    const useCase = container.start(ValidateUseCase, registers.useCase);

    const gatewaySpy = jest.spyOn(CreateUserGateway.prototype, "validate");

    await useCase.exec({
      email: "default@email.com",
      code: "1234567"
    });

    expect(gatewaySpy).toHaveBeenCalledTimes(1);
  })
})
