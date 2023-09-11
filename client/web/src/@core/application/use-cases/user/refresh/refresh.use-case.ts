import { UserGateways } from "@/@core/domain/gateways/user.gateway";
import { gateIds } from "@/@core/infra/gateways/gateIds";
import { inject, injectable } from "inversify";

@injectable()
export class RefreshUseCase {
	constructor(
    @inject(gateIds.user.refreshToken)
	private readonly refreshGate: UserGateways.RefreshUserTokenGateway
	) {}

	async exec() {
		return this.refreshGate.refresh();
	}
}
