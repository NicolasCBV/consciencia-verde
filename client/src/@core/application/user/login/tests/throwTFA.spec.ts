import { HttpClient } from "@/@core/adapters/adapters.container"
import { RegisterContainer } from "@/@core/containers/register"
import { LoginUserGateway } from "@/@core/infra/gateways/user/user.login.gateway";
import { ThrowTFAUseCase } from "../throwTFA.use-case";

LoginUserGateway.prototype.throwTFA = jest.fn(async () => {});

describe("Throw TFA use case test", () => {
  const registers = {
    gateway: "throw TFA gateway",
    useCase: "throw TFA use case"
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
        instance: ThrowTFAUseCase 
      }
    })
  });

  it("should be able to throw TFA", async () => {
    const useCase = container.start(ThrowTFAUseCase, registers.useCase);

    const gatewaySpy = jest.spyOn(LoginUserGateway.prototype, "throwTFA");

    await useCase.exec({
      email: "default@email.com",
      password: "1234567"
    });

    expect(gatewaySpy).toHaveBeenCalledTimes(1);
  })
})
