import { HttpClient } from "@/@core/adapters/adapters.container"
import { RegisterContainer } from "@/@core/containers/register"
import { CreateUserGateway } from "@/@core/infra/gateways/user/user.create.gateway"
import { LaunchOTPUseCase } from "../launchOTP.use-case";

CreateUserGateway.prototype.launchOTP = jest.fn(async () => ({
  cancelKey: "random uuid"
}));

describe("Launch OTP use case test", () => {
  const registers = {
    gateway: "launch OTP gateway",
    useCase: "launch OTP use case"
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
        instance: LaunchOTPUseCase 
      }
    })
  });

  it("should be able to launch OTP", async () => {
    const useCase = container.start(LaunchOTPUseCase, registers.useCase);

    const gatewaySpy = jest.spyOn(CreateUserGateway.prototype, "launchOTP");

    await useCase.exec({
      email: "default@email.com",
    });

    expect(gatewaySpy).toHaveBeenCalledTimes(1);
  })
})
