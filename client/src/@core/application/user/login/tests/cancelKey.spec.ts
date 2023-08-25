import { HttpClient } from "@/@core/adapters/adapters.container"
import { RegisterContainer } from "@/@core/containers/register"
import { LoginUserGateway } from "@/@core/infra/gateways/user/user.login.gateway";
import { CancelLoginKeyUseCase } from "../cancelKey.use-case"

LoginUserGateway.prototype.cancelLogin = jest.fn(async () => {});

describe("Cancel user login key use case test", () => {
  const registers = {
    gateway: "cancel user login key gateway",
    useCase: "cancel user login key use case"
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
        instance: CancelLoginKeyUseCase
      }
    })
  });

  it("should be able to cancel user login key", async () => {
    const useCase = container.start(CancelLoginKeyUseCase, registers.useCase);

    const gatewaySpy = jest.spyOn(LoginUserGateway.prototype, "cancelLogin");

    await useCase.exec({
      email: "default@email.com",
      key: "random uuid"
    });

    expect(gatewaySpy).toHaveBeenCalledTimes(1);
  })
})
