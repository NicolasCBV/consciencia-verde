import { HttpClient } from "@/@core/adapters/adapters.container"
import { RegisterContainer } from "@/@core/containers/register"
import { RefreshUserTokenGateway } from "@/@core/infra/gateways/user/user.refreshToken.gateway";
import { RefreshUseCase } from "./refresh.use-case";

RefreshUserTokenGateway.prototype.refresh = jest.fn(async () => ({
  access_token: "access_token"
}));

describe("Refresh user token use case test", () => {
  const registers = {
    gateway: "refresh user token user gateway",
    useCase: "refresh user token use case"
  }
  let container: RegisterContainer

  beforeEach(() => {
    container = new RegisterContainer({
      [registers.gateway]: {
        dependencies: {
          imports: [HttpClient]
        },
        instance: RefreshUserTokenGateway 
      },
      [registers.useCase]: {
        dependencies: {
          imports: [registers.gateway]
        },
        instance: RefreshUseCase
      }
    })
  });

  it("should be able to update user", async () => {
    const useCase = container.start(RefreshUseCase, registers.useCase);

    const gatewaySpy = jest.spyOn(RefreshUserTokenGateway.prototype, "refresh");

    await useCase.exec();

    expect(gatewaySpy).toHaveBeenCalledTimes(1);
  })
})
