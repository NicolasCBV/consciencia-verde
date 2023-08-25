import { HttpClient } from "@/@core/adapters/adapters.container"
import { RegisterContainer } from "@/@core/containers/register"
import { ForgotPasswordGateway } from "@/@core/infra/gateways/user/user.forgotPassword.gateway";
import { StartForgotPassUseCase } from "../startForgotPass.use-case";

ForgotPasswordGateway.prototype.start = jest.fn(async () => {});

describe("Forgot password start process use case test", () => {
  const registers = {
    gateway: "forgot password start process gateway",
    useCase: "forgot password start process use case"
  }
  let container: RegisterContainer

  beforeEach(() => {
    container = new RegisterContainer({
      [registers.gateway]: {
        dependencies: {
          imports: [HttpClient]
        },
        instance: ForgotPasswordGateway
      },
      [registers.useCase]: {
        dependencies: {
          imports: [registers.gateway]
        },
        instance: StartForgotPassUseCase
      }
    })
  });

  it("should be able to start forgot password process", async () => {
    const useCase = container.start(StartForgotPassUseCase, registers.useCase);

    const gatewaySpy = jest.spyOn(ForgotPasswordGateway.prototype, "start");

    await useCase.exec({
      email: "default@email.com"
    });

    expect(gatewaySpy).toHaveBeenCalledTimes(1);
  })
})
