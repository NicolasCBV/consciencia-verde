import { adapterIds } from "@/@core/adapters/adapterIds";
import { HttpAdapter } from "@/@core/adapters/http";
import { UserGatewaysTypes } from "@/@core/domain/gateways/types/user.gateway-types";
import { UserGateways } from "@/@core/domain/gateways/user.gateway";
import { inject, injectable } from "inversify";

@injectable()
export class DeleteUserGateway implements UserGateways.DeleteUserGateway {
  constructor(
    @inject(adapterIds.http)
    private readonly http: HttpAdapter
  ) {}
  
  async delete(input: UserGatewaysTypes.Auth.IDelete) {
    const headers = new Headers();
    headers.set("authorization", `Bearer ${input.access_token}`);

    await this.http.call({
      url: "/api/user/delete",
      method: "DELETE",
      headers
    })
  };
}
