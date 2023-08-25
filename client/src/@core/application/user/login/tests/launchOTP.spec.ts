import { HttpClient } from "@/@core/adapters/adapters.container"
import { RegisterContainer } from "@/@core/containers/register"
import { LoginUserGateway } from "@/@core/infra/gateways/user/user.login.gateway";
import { LaunchOTPLoginUseCase } from "../launchOTPLogin.use-case";

LoginUserGateway.prototype.launchLoginOTP = jest.fn(async () => ({
  cancelKey: "random uuid"
}));

describe("Launch OTP - login - use case test", () => {
  const registers = {
    gateway: "launch OTP - login - gateway",
    useCase: "launch OTP - login - use case"
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
        instance: LaunchOTPLoginUseCase 
      }
    })
  });

  it("should be able to launch OTP - login", async () => {
    const useCase = container.start(LaunchOTPLoginUseCase, registers.useCase);

    const gatewaySpy = jest.spyOn(LoginUserGateway.prototype, "launchLoginOTP");

    await useCase.exec({
      email: "default@email.com",
    });

    expect(gatewaySpy).toHaveBeenCalledTimes(1);
  })
})
