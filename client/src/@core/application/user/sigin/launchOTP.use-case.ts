import { UserGatewaysTypes } from "@/@core/domain/gateways/types/user.gateway-types";
import { UserGateways } from "@/@core/domain/gateways/user.gateway";

export class LaunchOTPUseCase {
  constructor(
    private readonly createUserGate: UserGateways.CreateUserGateway
  ) {}

  async exec(input: UserGatewaysTypes.NonAuth.ILaunchOTP) {
    return await this.createUserGate.launchOTP(input);
  }
}
