import { UserGatewaysTypes } from "@/@core/domain/gateways/types/user.gateway-types";
import { UserGateways } from "@/@core/domain/gateways/user.gateway";

export class LaunchOTPLoginUseCase {
  constructor(
    private readonly loginUserGate: UserGateways.LoginUserGateway
  ) {}

  async exec(input: UserGatewaysTypes.NonAuth.ILaunchOTP) {
    return await this.loginUserGate.launchLoginOTP(input);
  }
}
