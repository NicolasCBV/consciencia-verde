import { adapterIds } from "@/@core/adapters/adapterIds";
import { HttpAdapter } from "@/@core/adapters/http";
import { UserGatewaysTypes } from "@/@core/domain/gateways/types/user.gateway-types";
import { UserGateways } from "@/@core/domain/gateways/user.gateway";
import { inject, injectable } from "inversify";

@injectable()
export class UpdateUserGateway implements UserGateways.UpdateUserGateway {
  constructor(
    @inject(adapterIds.http)
    private readonly http: HttpAdapter
  ) {}
 
  private async updateImage(auth: string, file: File) {
    const form = new FormData();
    form.append("file", file);

    await this.http.call({
      url: "/api/user/uploadImage",
      method: "PATCH",
      headers: {
        "authorization": `${auth}`
      },
      body: form
    });
  }

  async update(input: UserGatewaysTypes.Auth.IUpdateUser) {
    if(input.image)
      await this.updateImage(input.access_token, input.image.file)

    await this.http.call({
      url: "/api/user/updateContent",
      method: "PATCH",
      headers: {
        "content-type": "application/json",
        "authorization": `${input.access_token}`
      },
      body: JSON.stringify({
        name: input.name,
        description: input.description
      })
    }) 
  }
}
