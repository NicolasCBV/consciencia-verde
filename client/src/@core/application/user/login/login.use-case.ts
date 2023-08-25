import { UserGatewaysTypes } from "@/@core/domain/gateways/types/user.gateway-types";
import { UserGateways } from "@/@core/domain/gateways/user.gateway";

export class LoginUseCase {
  constructor(
    private readonly loginUserGate: UserGateways.LoginUserGateway
  ) {}

  async exec(input: UserGatewaysTypes.NonAuth.ILogin) {
    return await this.loginUserGate.login(input);
  }
}
