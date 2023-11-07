import { adapterIds } from "@/@core/adapters/adapterIds";
import { gateIds } from "@/@core/infra/gateways/gateIds";
import { DeletePostGateway } from "@/@core/infra/gateways/post/post.delete.gateway";
import { FakeHttpClient } from "@tests/mocks/httpClient";
import { Container } from "inversify";
import { useCasesIds } from "../../useCasesId";
import { DeletePostUseCase } from "./delete.use-case";

DeletePostGateway.prototype.remove = jest.fn(async () => {});

describe("Delete post use case test", () => {
	const container = new Container();
	container.bind(adapterIds.http).to(FakeHttpClient);
	container.bind(gateIds.post.delete).to(DeletePostGateway);
	container.bind(useCasesIds.post.delete).to(DeletePostUseCase);

	it("should be able to delete post", async () => {
		const useCase = container.get<DeletePostUseCase>(
			useCasesIds.post.delete,
		);

		const gatewaySpy = jest.spyOn(DeletePostGateway.prototype, "remove");

		await useCase.exec({
			access_token: "access_token",
			id: "default_id",
		});

		expect(gatewaySpy).toHaveBeenCalledTimes(1);
	});
});
