import { UserGatewaysTypes } from "@/@core/domain/gateways/types/user.gateway-types";
import { UserGateways } from "@/@core/domain/gateways/user.gateway";
import { gateIds } from "@/@core/infra/gateways/gateIds";
import { inject, injectable } from "inversify";

@injectable()
export class EndForgotPassUseCase {
	constructor(
		@inject(gateIds.user.forgotPassword)
		private readonly forgotPasswordGate: UserGateways.ForgotUserPasswordGateway,
	) {}

	async exec(input: UserGatewaysTypes.NonAuth.IEndForgotPassFlow) {
		return this.forgotPasswordGate.finish(input);
	}
}
