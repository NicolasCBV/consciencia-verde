import { HttpClient } from "@/@core/adapters/adapters.container"
import { RegisterContainer } from "@/@core/containers/register"
import { LoginUserGateway } from "@/@core/infra/gateways/user/user.login.gateway";
import { LoginUseCase } from "../login.use-case";

LoginUserGateway.prototype.login = jest.fn(async () => ({
  access_token: "access_token"
}));

describe("Login use case test", () => {
  const registers = {
    gateway: "login gateway",
    useCase: "login use case"
  }
  let container: RegisterContainer

  beforeEach(() => {
    container = new RegisterContainer({
      [registers.gateway]: {
        dependencies: {
          imports: [HttpClient]
        },
        instance: LoginUserGateway 
      },
      [registers.useCase]: {
        dependencies: {
          imports: [registers.gateway]
        },
        instance: LoginUseCase
      }
    })
  });

  it("should be able to login", async () => {
    const useCase = container.start(LoginUseCase, registers.useCase);

    const gatewaySpy = jest.spyOn(LoginUserGateway.prototype, "login");

    await useCase.exec({
      email: "default@email.com",
      code: "123456"
    });

    expect(gatewaySpy).toHaveBeenCalledTimes(1);
  })
})
