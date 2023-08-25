import { HttpAdapter } from "@/@core/adapters/http";
import { UserGatewaysTypes } from "@/@core/domain/gateways/types/user.gateway-types";
import { UserGateways } from "@/@core/domain/gateways/user.gateway";

export class ForgotPasswordGateway implements UserGateways.ForgotUserPasswordGateway {
  constructor(private readonly http: HttpAdapter) {}
  
  async start(input: UserGatewaysTypes.NonAuth.IStartForgotPassFlow) {
    const headers = new Headers();
    headers.set("content-type", `application/json`);

    await this.http.call({
      url: "/api/forgotPassword",
      method: "POST",
      headers,
      body: JSON.stringify({
        email: input.email
      })
    });
  };

  async finish(input: UserGatewaysTypes.NonAuth.IEndForgotPassFlow) {
    const headers = new Headers();
    headers.set("content-type", `application/json`);
    headers.set("authorization", `Bearer ${input.forgot_token}`);

    await this.http.call({
      url: "/api/finishForgotPassword",
      method: "PATCH",
      headers,
      body: JSON.stringify({
        password: input.password
      })
    });
  };
}
