import { adapterIds } from "@/@core/adapters/adapterIds";
import { HttpAdapter } from "@/@core/adapters/http";
import { UserGateways } from "@/@core/domain/gateways/user.gateway";
import { inject, injectable } from "inversify";
import { RefreshUserTokenDTO } from "../../DTO/user/refreshUserToken.DTO";

@injectable()
export class RefreshUserTokenGateway implements UserGateways.RefreshUserTokenGateway {
	constructor(
    @inject(adapterIds.http)
    private readonly http: HttpAdapter
	) {}

	async refresh() {
		const headers = new Headers();
		headers.set("content-type", "application/json");

		const response = await this.http.call({
			url: "/api/user/refreshToken",
			method: "POST",
			headers
		});

		const dto = new RefreshUserTokenDTO();
		const body = await dto.exec(response.body);

		return body;
	}
}
