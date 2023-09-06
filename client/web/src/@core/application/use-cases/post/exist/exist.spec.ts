import { adapterIds } from "@/@core/adapters/adapterIds";
import { gateIds } from "@/@core/infra/gateways/gateIds";
import { ExistentPostGateway } from "@/@core/infra/gateways/post/post.exist.gateway";
import { FakeHttpClient } from "@tests/mocks/httpClient";
import { Container } from "inversify";
import { useCasesIds } from "../../useCasesId";
import { ExistPostUseCase } from "./exist.use-case";

ExistentPostGateway.prototype.exist = jest.fn(async () => true);

describe("Exist post use case test", () => {
  const container = new Container();
  container.bind(adapterIds.http).to(FakeHttpClient)
  container.bind(gateIds.post.exist).to(ExistentPostGateway);
  container.bind(useCasesIds.post.exist).to(ExistPostUseCase);

  it("should be able to check if post exist", async () => {
    const useCase = container.get<ExistPostUseCase>(useCasesIds.post.exist);

    const gatewaySpy = jest.spyOn(ExistentPostGateway.prototype, "exist");

    await useCase.exec({ name: "default name" });

    expect(gatewaySpy).toHaveBeenCalledTimes(1);
  })
})
