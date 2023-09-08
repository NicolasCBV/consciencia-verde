import { adapterIds } from "@/@core/adapters/adapterIds";
import { gateIds } from "@/@core/infra/gateways/gateIds";
import { CreateUserGateway } from "@/@core/infra/gateways/user/user.create.gateway";
import { FakeHttpClient } from "@tests/mocks/httpClient";
import { Container } from "inversify";
import { useCasesIds } from "../../../useCasesId";
import { LaunchOTPUseCase } from "../launchOTP.use-case";

CreateUserGateway.prototype.launchOTP = jest.fn(async () => ({
	cancelKey: "random uuid"
}));

describe("Launch OTP use case test", () => {
	const container = new Container();
	container.bind(adapterIds.http).to(FakeHttpClient);
	container.bind(gateIds.user.create).to(CreateUserGateway);
	container.bind(useCasesIds.user.sigin.launchOTP).to(LaunchOTPUseCase);

	it("should be able to launch OTP", async () => {
		const useCase = container.get<LaunchOTPUseCase>(useCasesIds.user.sigin.launchOTP);

		const gatewaySpy = jest.spyOn(CreateUserGateway.prototype, "launchOTP");

		await useCase.exec({
			email: "default@email.com",
		});

		expect(gatewaySpy).toHaveBeenCalledTimes(1);
	});
});
