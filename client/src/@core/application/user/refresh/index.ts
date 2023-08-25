import { HttpClient } from "@/@core/adapters/adapters.container"
import { RegisterContainer } from "@/@core/containers/register"
import { RefreshUserTokenGateway } from "@/@core/infra/gateways/user/user.refreshToken.gateway"
import { RefreshUseCase } from "./refresh.use-case";

export const refreshTokensRegister = {
  gateway: "refresh gateway",
  useCase: "refresh use case"
}

const refreshGatewayInstance = new RegisterContainer({
  [refreshTokensRegister.gateway]: {
    dependencies: {
      imports: [HttpClient]
    },
    instance: RefreshUserTokenGateway
  }
}).start(RefreshUserTokenGateway, refreshTokensRegister.gateway);

export const RefreshUserTokenContainer = new RegisterContainer({
  [refreshTokensRegister.useCase]: {
    dependencies: {
      imports: [refreshGatewayInstance]
    },
    instance: RefreshUseCase
  }
});

