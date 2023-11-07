import { adapterIds } from "@/@core/adapters/adapterIds";
import { gateIds } from "@/@core/infra/gateways/gateIds";
import { LoginUserGateway } from "@/@core/infra/gateways/user/user.login.gateway";
import { FakeHttpClient } from "@tests/mocks/httpClient";
import { Container } from "inversify";
import { useCasesIds } from "../../../useCasesId";
import { ThrowTFAUseCase } from "../throwTFA.use-case";

LoginUserGateway.prototype.throwTFA = jest.fn(async () => {});

describe("Throw TFA use case test", () => {
	const container = new Container();
	container.bind(adapterIds.http).to(FakeHttpClient);
	container.bind(gateIds.user.login).to(LoginUserGateway);
	container.bind(useCasesIds.user.login.end).to(ThrowTFAUseCase);

	it("should be able to throw TFA", async () => {
		const useCase = container.get<ThrowTFAUseCase>(
			useCasesIds.user.login.end,
		);

		const gatewaySpy = jest.spyOn(LoginUserGateway.prototype, "throwTFA");

		await useCase.exec({
			email: "default@email.com",
			password: "1234567",
		});

		expect(gatewaySpy).toHaveBeenCalledTimes(1);
	});
});
