import { adapterIds } from "@/@core/adapters/adapterIds";
import { gateIds } from "@/@core/infra/gateways/gateIds";
import { GetPostGateway } from "@/@core/infra/gateways/post/post.get.gateway";
import { FakeHttpClient } from "@tests/mocks/httpClient";
import { Container } from "inversify";
import { useCasesIds } from "../../useCasesId";
import { GetPostUseCase } from "./get.use-case";
import { PaginationPostUseCase } from "./pagination.use-case";

GetPostGateway.prototype.pagination = jest.fn(async () => []);

describe("Pagination post use case test", () => {
  const container = new Container();
  container.bind(adapterIds.http).to(FakeHttpClient);
  container.bind(gateIds.post.get).to(GetPostGateway);
  container.bind(useCasesIds.post.pagination).to(PaginationPostUseCase);

  it("should be able to get pagination on post", async () => {
    const useCase = container.get<GetPostUseCase>(useCasesIds.post.pagination);

    const gatewaySpy = jest.spyOn(GetPostGateway.prototype, "pagination");

    await useCase.exec({ id: "default_id" });

    expect(gatewaySpy).toHaveBeenCalledTimes(1);
  })
})
