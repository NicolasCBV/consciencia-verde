import { HttpClient } from "@/@core/adapters/adapters.container"
import { RegisterContainer } from "@/@core/containers/register"
import { ForgotPasswordGateway } from "@/@core/infra/gateways/user/user.forgotPassword.gateway";
import { EndForgotPassUseCase } from "../endForgotPass.use-case";

ForgotPasswordGateway.prototype.finish = jest.fn(async () => {});

describe("Finish forgot password use case test", () => {
  const registers = {
    gateway: "finish forgot password process gateway",
    useCase: "finish forgot password process use case"
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
        instance: EndForgotPassUseCase 
      }
    })
  });

  it("should be able to finih forgot password process", async () => {
    const useCase = container.start(EndForgotPassUseCase, registers.useCase);

    const gatewaySpy = jest.spyOn(ForgotPasswordGateway.prototype, "finish");

    await useCase.exec({
      forgot_token: "forgot_token",
      password: "123456"
    });

    expect(gatewaySpy).toHaveBeenCalledTimes(1);
  })
})
