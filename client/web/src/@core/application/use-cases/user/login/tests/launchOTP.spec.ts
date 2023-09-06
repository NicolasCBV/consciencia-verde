import { adapterIds } from "@/@core/adapters/adapterIds";
import { gateIds } from "@/@core/infra/gateways/gateIds";
import { LoginUserGateway } from "@/@core/infra/gateways/user/user.login.gateway";
import { FakeHttpClient } from "@tests/mocks/httpClient";
import { Container } from "inversify";
import { useCasesIds } from "../../../useCasesId";
import { LaunchOTPLoginUseCase } from "../launchOTPLogin.use-case";

LoginUserGateway.prototype.launchLoginOTP = jest.fn(async () => {});

describe("Launch OTP - login - use case test", () => {
  const container = new Container();
  container.bind(adapterIds.http).to(FakeHttpClient);
  container.bind(gateIds.user.login).to(LoginUserGateway);
  container.bind(useCasesIds.user.login.launchOTP).to(LaunchOTPLoginUseCase);

  it("should be able to launch OTP - login", async () => {
    const useCase = container.get<LaunchOTPLoginUseCase>(useCasesIds.user.login.launchOTP);

    const gatewaySpy = jest.spyOn(LoginUserGateway.prototype, "launchLoginOTP");

    await useCase.exec({
      email: "default@email.com",
    });

    expect(gatewaySpy).toHaveBeenCalledTimes(1);
  })
})
