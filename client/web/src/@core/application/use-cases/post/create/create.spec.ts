import { adapterIds } from "@/@core/adapters/adapterIds";
import { gateIds } from "@/@core/infra/gateways/gateIds";
import { CreatePostGateway } from "@/@core/infra/gateways/post/post.create.gateway";
import { postFactory } from "@tests/factory/post";
import { FakeHttpClient } from "@tests/mocks/httpClient";
import { Container } from "inversify";
import { useCasesIds } from "../../useCasesId";
import { CreatePostUseCase } from "./create.use-case";

CreatePostGateway.prototype.create = jest.fn(async () => ({ 
  id: "default_id" 
}));

describe("Create post use case test", () => {
  const container = new Container();
  container.bind(adapterIds.http).to(FakeHttpClient)
  container.bind(gateIds.post.create).to(CreatePostGateway);
  container.bind(useCasesIds.post.create).to(CreatePostUseCase);

  it("should be able to create post", async () => {
    const useCase = container.get<CreatePostUseCase>(useCasesIds.post.create);

    const gatewaySpy = jest.spyOn(CreatePostGateway.prototype, "create");
    const post = postFactory();

    await useCase.exec({ 
      access_token: "access_token",
      post 
    });

    expect(gatewaySpy).toHaveBeenCalledTimes(1);
  })
})
