import { UserGatewaysTypes } from "@/@core/domain/gateways/types/user.gateway-types";
import { UserGateways } from "@/@core/domain/gateways/user.gateway";
import { gateIds } from "@/@core/infra/gateways/gateIds";
import { inject, injectable } from "inversify";

@injectable()
export class DeleteUserUseCase {
  constructor(
    @inject(gateIds.user.delete)
	private readonly deleteUserGate: UserGateways.DeleteUserGateway
  ) {}

  async exec(input: UserGatewaysTypes.Auth.IDelete) {
	return this.deleteUserGate.delete(input);
  }
}
