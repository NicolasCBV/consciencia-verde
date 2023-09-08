import { adapterIds } from "@/@core/adapters/adapterIds";
import { gateIds } from "@/@core/infra/gateways/gateIds";
import { GetPostGateway } from "@/@core/infra/gateways/post/post.get.gateway";
import { postFactory } from "@tests/factory/post";
import { FakeHttpClient } from "@tests/mocks/httpClient";
import { Container } from "inversify";
import { useCasesIds } from "../../useCasesId";
import { GetPostUseCase } from "./get.use-case";

GetPostGateway.prototype.get = jest.fn(async () => postFactory());

describe("Get post use case test", () => {
	const container = new Container();
	container.bind(adapterIds.http).to(FakeHttpClient);
	container.bind(gateIds.post.get).to(GetPostGateway);
	container.bind(useCasesIds.post.get).to(GetPostUseCase);

	it("should be able to get post", async () => {
		const useCase = container.get<GetPostUseCase>(useCasesIds.post.get);

		const gatewaySpy = jest.spyOn(GetPostGateway.prototype, "get");

		await useCase.exec({ id: "default_id" });

		expect(gatewaySpy).toHaveBeenCalledTimes(1);
	});
});
