import { HttpAdapter } from "@/@core/adapters/http";
import { UserGatewaysTypes } from "@/@core/domain/gateways/types/user.gateway-types";
import { UserGateways } from "@/@core/domain/gateways/user.gateway";

export class DeleteUserGateway implements UserGateways.DeleteUserGateway {
  constructor(private readonly http: HttpAdapter) {}
  
  async delete(input: UserGatewaysTypes.Auth.IDelete) {
    const headers = new Headers();
    headers.set("authorization", `Bearer ${input.access_token}`);

    await this.http.call({
      url: "/api/delete",
      method: "DELETE",
      headers
    })
  };
}
