import { adapterIds } from "@/@core/adapters/adapterIds";
import { gateIds } from "@/@core/infra/gateways/gateIds";
import { CreateUserGateway } from "@/@core/infra/gateways/user/user.create.gateway"
import { FakeHttpClient } from "@tests/mocks/httpClient";
import { Container } from "inversify";
import { useCasesIds } from "../../../useCasesId";
import { CancelSiginKeyUseCase } from "../cancelKey.use-case"

CreateUserGateway.prototype.cancelCreation = jest.fn(async () => {});

describe("Cancel user key use case test", () => {
  const container = new Container();
  container.bind(adapterIds.http).to(FakeHttpClient)
  container.bind(gateIds.user.create).to(CreateUserGateway);
  container.bind(useCasesIds.user.sigin.cancelKey).to(CancelSiginKeyUseCase);

  it("should be able to cancel user key", async () => {
    const useCase = container.get<CancelSiginKeyUseCase>(useCasesIds.user.sigin.cancelKey);

    const gatewaySpy = jest.spyOn(CreateUserGateway.prototype, "cancelCreation");

    await useCase.exec({
      email: "default@email.com",
      key: "random uuid"
    });

    expect(gatewaySpy).toHaveBeenCalledTimes(1);
  })
})
