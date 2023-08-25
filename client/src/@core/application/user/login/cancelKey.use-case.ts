import { UserGatewaysTypes } from "@/@core/domain/gateways/types/user.gateway-types";
import { UserGateways } from "@/@core/domain/gateways/user.gateway";

export class CancelLoginKeyUseCase {
  constructor(
    private readonly loginUserGate: UserGateways.LoginUserGateway
  ) {}

  async exec(input: UserGatewaysTypes.NonAuth.ICancel) {
    return this.loginUserGate.cancelLogin(input);
  }
}
