import { AbstractCookieGateway } from "@/@core/domain/gateways/cookie.gateway";
import { gateIds } from "@/@core/infra/gateways/gateIds";
import { inject, injectable } from "inversify";

@injectable()
export class MakeRefreshCookieUseCase {
	constructor(
		@inject(gateIds.cookie.refreshCookie)
		private readonly refreshCookieGate: AbstractCookieGateway.RefreshCookieGateway
	) {}

	exec(input: string): string {
		return this.refreshCookieGate.makeRefreshCookie(input);
	}
}
