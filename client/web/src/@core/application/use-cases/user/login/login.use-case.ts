import { UserGatewaysTypes } from "@/@core/domain/gateways/types/user.gateway-types";
import { UserGateways } from "@/@core/domain/gateways/user.gateway";
import { gateIds } from "@/@core/infra/gateways/gateIds";
import { inject, injectable } from "inversify";

@injectable()
export class LoginUseCase {
	constructor(
    @inject(gateIds.user.login)
    private readonly loginUserGate: UserGateways.LoginUserGateway
	) {}

	async exec(input: UserGatewaysTypes.NonAuth.ILogin) {
		return await this.loginUserGate.login(input);
	}
}
