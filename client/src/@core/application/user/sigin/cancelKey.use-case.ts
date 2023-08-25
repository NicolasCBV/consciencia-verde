import { UserGatewaysTypes } from "@/@core/domain/gateways/types/user.gateway-types";
import { UserGateways } from "@/@core/domain/gateways/user.gateway";

export class CancelSiginKeyUseCase {
  constructor(
    private readonly createUserGate: UserGateways.CreateUserGateway
  ) {}

  async exec(input: UserGatewaysTypes.NonAuth.ICancel) {
    return await this.createUserGate.cancelCreation(input);
  }
}
