import { adapterIds } from "@/@core/adapters/adapterIds";
import { gateIds } from "@/@core/infra/gateways/gateIds";
import { UpdatePostGateway } from "@/@core/infra/gateways/post/post.update.gateway";
import { postFactory } from "@tests/factory/post";
import { FakeHttpClient } from "@tests/mocks/httpClient";
import { Container } from "inversify";
import { useCasesIds } from "../../useCasesId";
import { UpdatePostUseCase } from "./update.use-case";

UpdatePostGateway.prototype.update = jest.fn(async () => {});

describe("Update post use case test", () => {
	const container = new Container();
	container.bind(adapterIds.http).to(FakeHttpClient);
	container.bind(gateIds.post.update).to(UpdatePostGateway);
	container.bind(useCasesIds.post.update).to(UpdatePostUseCase);

	it("should be able to update post", async () => {
		const useCase = container.get<UpdatePostUseCase>(
			useCasesIds.post.update,
		);

		const gatewaySpy = jest.spyOn(UpdatePostGateway.prototype, "update");
		const post = postFactory();

		await useCase.exec({
			id: "default_id",
			access_token: "access_token",
			post,
		});

		expect(gatewaySpy).toHaveBeenCalledTimes(1);
	});
});
