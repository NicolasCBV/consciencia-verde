import { adapterIds } from "@/@core/adapters/adapterIds";
import { gateIds } from "@/@core/infra/gateways/gateIds";
import { ForgotPasswordGateway } from "@/@core/infra/gateways/user/user.forgotPassword.gateway";
import { FakeHttpClient } from "@tests/mocks/httpClient";
import { Container } from "inversify";
import { useCasesIds } from "../../../useCasesId";
import { EndForgotPassUseCase } from "../endForgotPass.use-case";

ForgotPasswordGateway.prototype.finish = jest.fn(async () => {});

describe("Finish forgot password use case test", () => {
  const container = new Container();
  container.bind(adapterIds.http).to(FakeHttpClient);
  container.bind(gateIds.user.forgotPassword).to(ForgotPasswordGateway);
  container.bind(useCasesIds.user.forgotPassword.end).to(EndForgotPassUseCase);

  it("should be able to finih forgot password process", async () => {
    const useCase = container.get<EndForgotPassUseCase>(
      useCasesIds.user.forgotPassword.end
    );

    const gatewaySpy = jest.spyOn(ForgotPasswordGateway.prototype, "finish");

    await useCase.exec({
      forgot_token: "forgot_token",
      password: "123456"
    });

    expect(gatewaySpy).toHaveBeenCalledTimes(1);
  })
})
