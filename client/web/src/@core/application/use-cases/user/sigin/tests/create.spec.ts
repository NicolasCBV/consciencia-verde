import { adapterIds } from "@/@core/adapters/adapterIds";
import { gateIds } from "@/@core/infra/gateways/gateIds";
import { CreateUserGateway } from "@/@core/infra/gateways/user/user.create.gateway"
import { FakeHttpClient } from "@tests/mocks/httpClient";
import { Container } from "inversify";
import { useCasesIds } from "../../../useCasesId";
import { CreateUserUseCase } from "../create.use-case"

CreateUserGateway.prototype.create = jest.fn(async () => ({
  cancelKey: "random uuid" 
}));

describe("Create user use case test", () => {
  const container = new Container();
  container.bind(adapterIds.http).to(FakeHttpClient)
  container.bind(gateIds.user.create).to(CreateUserGateway);
  container.bind(useCasesIds.user.sigin.create).to(CreateUserUseCase);

  it("should be able to create user", async () => {
    const useCase = container.get<CreateUserUseCase>(useCasesIds.user.sigin.create);

    const gatewaySpy = jest.spyOn(CreateUserGateway.prototype, "create");

    await useCase.exec({
      name: "default name",
      email: "default@email.com",
      password: "123456"
    });

    expect(gatewaySpy).toHaveBeenCalledTimes(1);
  })
})
