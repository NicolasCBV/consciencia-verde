import { adapterIds } from "@/@core/adapters/adapterIds";
import { gateIds } from "@/@core/infra/gateways/gateIds";
import { CreateUserGateway } from "@/@core/infra/gateways/user/user.create.gateway";
import { FakeHttpClient } from "@tests/mocks/httpClient";
import { Container } from "inversify";
import { useCasesIds } from "../../../useCasesId";
import { ValidateUseCase } from "../validate.use-case";

CreateUserGateway.prototype.validate = jest.fn(async () => ({
	access_token: "access_token"
}));

describe("Validate user use case test", () => {
	const container = new Container();
	container.bind(adapterIds.http).to(FakeHttpClient);
	container.bind(gateIds.user.create).to(CreateUserGateway);
	container.bind(useCasesIds.user.sigin.validate).to(ValidateUseCase);

	it("should be able to validate user", async () => {
		const useCase = container.get<ValidateUseCase>(useCasesIds.user.sigin.validate);

		const gatewaySpy = jest.spyOn(CreateUserGateway.prototype, "validate");

		await useCase.exec({
			email: "default@email.com",
			code: "1234567"
		});

		expect(gatewaySpy).toHaveBeenCalledTimes(1);
	});
});
