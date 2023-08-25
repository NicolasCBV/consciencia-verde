import { HttpAdapter } from "@/@core/adapters/http";
import { UserGateways } from "@/@core/domain/gateways/user.gateway";
import { RefreshUserTokenDTO } from "../../DTO/user/refreshUserToken.DTO";

export class RefreshUserTokenGateway implements UserGateways.RefreshUserTokenGateway {
  constructor(private readonly http: HttpAdapter) {}

  async refresh() {
    const headers = new Headers();
    headers.set("content-type", "application/json");

    const response = await this.http.call({
      url: "/api/refreshToken",
      method: "POST",
      headers
    });

    const dto = new RefreshUserTokenDTO();
    const body = await dto.exec(response.body);

    return body;
  }
}
