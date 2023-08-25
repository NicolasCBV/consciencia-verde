import { UserGatewaysTypes } from "@/@core/domain/gateways/types/user.gateway-types";
import { UserGateways } from "@/@core/domain/gateways/user.gateway";

export class ValidateUseCase {
  constructor(
    private readonly createUserGate: UserGateways.CreateUserGateway
  ) {}

  async exec(input: UserGatewaysTypes.NonAuth.IValidate) {
    return await this.createUserGate.validate(input);
  }
}
