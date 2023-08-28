import { adapterIds } from "@/@core/adapters/adapterIds";
import { gateIds } from "@/@core/infra/gateways/gateIds";
import { DeleteUserGateway } from "@/@core/infra/gateways/user/user.delete.gateway";
import { Container } from "inversify";
import { FakeHttpClient } from "@tests/mocks/httpClient";
import { useCasesIds } from "../../useCasesId";
import { DeleteUserUseCase } from "./delete.use-case";

DeleteUserGateway.prototype.delete = jest.fn(async () => {});

describe("Delete user use case test", () => {
  const container = new Container();
  container.bind(adapterIds.http).to(FakeHttpClient)
  container.bind(gateIds.user.delete).to(DeleteUserGateway);
  container.bind(useCasesIds.user.delete).to(DeleteUserUseCase);

  it("should be able to delete user", async () => {
    const useCase = container.get<DeleteUserUseCase>(useCasesIds.user.delete);
    const gatewaySpy = jest.spyOn(DeleteUserGateway.prototype, "delete");

    await useCase.exec({
      access_token: "access_token"  
    });

    expect(gatewaySpy).toHaveBeenCalledTimes(1);
  })
})
