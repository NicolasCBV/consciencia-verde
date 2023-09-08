import { UserGatewaysTypes } from "@/@core/domain/gateways/types/user.gateway-types";
import { UserGateways } from "@/@core/domain/gateways/user.gateway";
import { gateIds } from "@/@core/infra/gateways/gateIds";
import { inject, injectable } from "inversify";

@injectable()
export class UpdateUserUseCase {
	constructor(
    @inject(gateIds.user.update)
	private readonly updateUserGate: UserGateways.UpdateUserGateway
	) {}

	async exec(input: UserGatewaysTypes.Auth.IUpdateUser) {
		return this.updateUserGate.update(input);
	}
}
