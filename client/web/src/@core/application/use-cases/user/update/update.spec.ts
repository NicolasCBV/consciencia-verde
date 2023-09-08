import { adapterIds } from "@/@core/adapters/adapterIds";
import { gateIds } from "@/@core/infra/gateways/gateIds";
import { UpdateUserGateway } from "@/@core/infra/gateways/user/user.update.gateway";
import { FakeHttpClient } from "@tests/mocks/httpClient";
import { Container } from "inversify";
import { useCasesIds } from "../../useCasesId";
import { UpdateUserUseCase } from "./update.use-case";

UpdateUserGateway.prototype.update = jest.fn(async () => {});

describe("Update user use case test", () => {
	const container = new Container();
	container.bind(adapterIds.http).to(FakeHttpClient);
	container.bind(gateIds.user.update).to(UpdateUserGateway);
	container.bind(useCasesIds.user.update).to(UpdateUserUseCase);

	it("should be able to update user", async () => {
		const useCase = container.get<UpdateUserUseCase>(useCasesIds.user.update);

		const gatewaySpy = jest.spyOn(UpdateUserGateway.prototype, "update");

		await useCase.exec({
			access_token: "access_token",
			name: "new name",
			description: "new description"
		});

		expect(gatewaySpy).toHaveBeenCalledTimes(1);
	});
});
