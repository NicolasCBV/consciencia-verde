import { UserGatewaysTypes } from "@/@core/domain/gateways/types/user.gateway-types";
import { UserGateways } from "@/@core/domain/gateways/user.gateway";

export class StartForgotPassUseCase {
  constructor(
    private readonly forgotPasswordGate: UserGateways.ForgotUserPasswordGateway
  ) {}

  async exec(input: UserGatewaysTypes.NonAuth.IStartForgotPassFlow) {
    return this.forgotPasswordGate.start(input);
  }
}
