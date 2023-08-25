import { UserGatewaysTypes } from "@/@core/domain/gateways/types/user.gateway-types";
import { UserGateways } from "@/@core/domain/gateways/user.gateway";

export class DeleteUserUseCase {
  constructor(
	private readonly deleteUserGate: UserGateways.DeleteUserGateway
  ) {}

  async exec(input: UserGatewaysTypes.Auth.IDelete) {
	return this.deleteUserGate.delete(input);
  }
}
