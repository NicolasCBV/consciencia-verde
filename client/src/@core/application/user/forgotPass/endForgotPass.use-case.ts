import { UserGatewaysTypes } from "@/@core/domain/gateways/types/user.gateway-types";
import { UserGateways } from "@/@core/domain/gateways/user.gateway";

export class EndForgotPassUseCase {
  constructor(
    private readonly forgotPasswordGate: UserGateways.ForgotUserPasswordGateway
  ) {}

  async exec(input: UserGatewaysTypes.NonAuth.IEndForgotPassFlow) {
    return this.forgotPasswordGate.finish(input);
  }
}
