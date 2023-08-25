import { UserGatewaysTypes } from "@/@core/domain/gateways/types/user.gateway-types";
import { UserGateways } from "@/@core/domain/gateways/user.gateway";

export class UpdateUserUseCase {
  constructor(
	private readonly updateUserGate: UserGateways.UpdateUserGateway
  ) {}

  async exec(input: UserGatewaysTypes.Auth.IUpdateUser) {
	return this.updateUserGate.update(input);
  }
}
