import { adapterIds } from "@/@core/adapters/adapterIds";
import { gateIds } from "@/@core/infra/gateways/gateIds";
import { SearchPostGateway } from "@/@core/infra/gateways/post/post.search.gateway";
import { FakeHttpClient } from "@tests/mocks/httpClient";
import { Container } from "inversify";
import { useCasesIds } from "../../useCasesId";
import { SearchPostUseCase } from "./search.use-case";

SearchPostGateway.prototype.search = jest.fn(async () => ({
	posts: [],
	pages: 0,
}));

describe("Pagination post use case test", () => {
	const container = new Container();
	container.bind(adapterIds.http).to(FakeHttpClient);
	container.bind(gateIds.post.search).to(SearchPostGateway);
	container.bind(useCasesIds.post.pagination).to(SearchPostUseCase);

	it("should be able to get pagination on post", async () => {
		const useCase = container.get<SearchPostUseCase>(
			useCasesIds.post.pagination,
		);

		const gatewaySpy = jest.spyOn(SearchPostGateway.prototype, "search");

		await useCase.exec({
			query: "default name",
		});

		expect(gatewaySpy).toHaveBeenCalledTimes(1);
	});
});
