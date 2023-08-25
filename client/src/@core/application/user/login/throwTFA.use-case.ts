import { UserGatewaysTypes } from "@/@core/domain/gateways/types/user.gateway-types";
import { UserGateways } from "@/@core/domain/gateways/user.gateway";

export class ThrowTFAUseCase {
  constructor(
	private readonly loginUserGate: UserGateways.LoginUserGateway
  ) {}

  async exec(input: UserGatewaysTypes.NonAuth.IThrowTFA) {
	return await this.loginUserGate.throwTFA(input);
  }
}
