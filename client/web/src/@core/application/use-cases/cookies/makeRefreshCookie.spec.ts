import { adapterIds } from "@/@core/adapters/adapterIds";
import { Cookie } from "@/@core/adapters/cookie/index";
import { RefreshCookieGateway } from "@/@core/infra/gateways/cookie/refreshCookie.gateway";
import { gateIds } from "@/@core/infra/gateways/gateIds";
import { Container } from "inversify";
import { useCasesIds } from "../useCasesId";
import { MakeRefreshCookieUseCase } from "./makeRefreshCookie.use-case";

RefreshCookieGateway.prototype.makeRefreshCookie = jest.fn(() => "fake_cookie");

describe("Create refresh cookie use case test", () => {
	const container = new Container();
	container.bind(adapterIds.cookie).to(Cookie);
	container.bind(gateIds.cookie.refreshCookie).to(RefreshCookieGateway);
	container
		.bind(useCasesIds.cookie.makeRefreshCookie)
		.to(MakeRefreshCookieUseCase);

	it("should be able to create refresh cookie", async () => {
		const useCase = container.get<MakeRefreshCookieUseCase>(
			useCasesIds.cookie.makeRefreshCookie,
		);

		const gatewaySpy = jest.spyOn(
			RefreshCookieGateway.prototype,
			"makeRefreshCookie",
		);

		useCase.exec("fake_cookie");

		expect(gatewaySpy).toHaveBeenCalledTimes(1);
	});
});
