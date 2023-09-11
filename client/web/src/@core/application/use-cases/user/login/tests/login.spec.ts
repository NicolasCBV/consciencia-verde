import { adapterIds } from "@/@core/adapters/adapterIds";
import { gateIds } from "@/@core/infra/gateways/gateIds";
import { LoginUserGateway } from "@/@core/infra/gateways/user/user.login.gateway";
import { FakeHttpClient } from "@tests/mocks/httpClient";
import { Container } from "inversify";
import { useCasesIds } from "../../../useCasesId";
import { LoginUseCase } from "../login.use-case";

LoginUserGateway.prototype.login = jest.fn(async () => ({
	access_token: "access_token"
}));

describe("Login use case test", () => {
	const container = new Container();
	container.bind(adapterIds.http).to(FakeHttpClient);
	container.bind(gateIds.user.login).to(LoginUserGateway);
	container.bind(useCasesIds.user.login.start).to(LoginUseCase);

	it("should be able to login", async () => {
		const useCase = container.get<LoginUseCase>(useCasesIds.user.login.start);

		const gatewaySpy = jest.spyOn(LoginUserGateway.prototype, "login");

		await useCase.exec({
			email: "default@email.com",
			code: "123456"
		});

		expect(gatewaySpy).toHaveBeenCalledTimes(1);
	});
});
