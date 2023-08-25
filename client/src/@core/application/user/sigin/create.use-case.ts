import { UserGatewaysTypes } from "@/@core/domain/gateways/types/user.gateway-types";
import { UserGateways } from "@/@core/domain/gateways/user.gateway";

export class CreateUserUseCase {
  constructor(private readonly createUserGate: UserGateways.CreateUserGateway) {}

  async exec(
	input: UserGatewaysTypes.NonAuth.ICreate
  ) {
	return await this.createUserGate.create(input);
  }
}
