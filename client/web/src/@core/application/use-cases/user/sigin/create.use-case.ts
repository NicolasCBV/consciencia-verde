import { UserGatewaysTypes } from "@/@core/domain/gateways/types/user.gateway-types";
import { UserGateways } from "@/@core/domain/gateways/user.gateway";
import { gateIds } from "@/@core/infra/gateways/gateIds";
import { inject, injectable } from "inversify";

@injectable()
export class CreateUserUseCase {
	constructor(
		@inject(gateIds.user.create)
		private readonly createUserGate: UserGateways.CreateUserGateway,
	) {}

	async exec(input: UserGatewaysTypes.NonAuth.ICreate) {
		return await this.createUserGate.create(input);
	}
}
