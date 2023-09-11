import { adapterIds } from "@/@core/adapters/adapterIds";
import { gateIds } from "@/@core/infra/gateways/gateIds";
import { ForgotPasswordGateway } from "@/@core/infra/gateways/user/user.forgotPassword.gateway";
import { FakeHttpClient } from "@tests/mocks/httpClient";
import { Container } from "inversify";
import { useCasesIds } from "../../../useCasesId";
import { StartForgotPassUseCase } from "../startForgotPass.use-case";

ForgotPasswordGateway.prototype.start = jest.fn(async () => {});

describe("Forgot password start process use case test", () => {
	const container = new Container();
	container.bind(adapterIds.http).to(FakeHttpClient);
	container.bind(gateIds.user.forgotPassword).to(ForgotPasswordGateway);
	container.bind(useCasesIds.user.forgotPassword.start).to(StartForgotPassUseCase);

	it("should be able to start forgot password process", async () => {
		const useCase = container.get<StartForgotPassUseCase>(
			useCasesIds.user.forgotPassword.start
		);

		const gatewaySpy = jest.spyOn(ForgotPasswordGateway.prototype, "start");

		await useCase.exec({
			email: "default@email.com"
		});

		expect(gatewaySpy).toHaveBeenCalledTimes(1);
	});
});
