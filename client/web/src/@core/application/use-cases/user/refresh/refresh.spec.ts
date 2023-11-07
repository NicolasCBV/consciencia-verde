import { adapterIds } from "@/@core/adapters/adapterIds";
import { gateIds } from "@/@core/infra/gateways/gateIds";
import { RefreshUserTokenGateway } from "@/@core/infra/gateways/user/user.refreshToken.gateway";
import { FakeHttpClient } from "@tests/mocks/httpClient";
import { Container } from "inversify";
import { useCasesIds } from "../../useCasesId";
import { RefreshUseCase } from "./refresh.use-case";

RefreshUserTokenGateway.prototype.refresh = jest.fn(async () => ({
	access_token: "access_token",
}));

describe("Refresh user token use case test", () => {
	const container = new Container();
	container.bind(adapterIds.http).to(FakeHttpClient);
	container.bind(gateIds.user.refreshToken).to(RefreshUserTokenGateway);
	container.bind(useCasesIds.user.refreshTokens).to(RefreshUseCase);

	it("should be able to update user", async () => {
		const useCase = container.get<RefreshUseCase>(
			useCasesIds.user.refreshTokens,
		);

		const gatewaySpy = jest.spyOn(
			RefreshUserTokenGateway.prototype,
			"refresh",
		);

		await useCase.exec();

		expect(gatewaySpy).toHaveBeenCalledTimes(1);
	});
});
