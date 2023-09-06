import { adapterIds } from "@/@core/adapters/adapterIds";
import { HttpAdapter } from "@/@core/adapters/http";
import { UserGatewaysTypes } from "@/@core/domain/gateways/types/user.gateway-types";
import { UserGateways } from "@/@core/domain/gateways/user.gateway";
import { inject, injectable } from "inversify";
import { LoginUserDTO } from "../../DTO/user/loginUser.DTO";

@injectable()
export class LoginUserGateway implements UserGateways.LoginUserGateway {
  constructor(
    @inject(adapterIds.http)
    private readonly http: HttpAdapter
  ) {}

  async launchLoginOTP(input: UserGatewaysTypes.NonAuth.ILaunchOTP) {
    const headers = new Headers();
    headers.set("content-type", "application/json");
  
    await this.http.call({
      url: "/api/user/launchOTPLogin",
      method: "POST",
      headers,
      body: JSON.stringify(input)
    });
  }
  

  async throwTFA(input: UserGatewaysTypes.NonAuth.IThrowTFA) {
    const headers = new Headers();
    headers.set("content-type", "application/json");

    await this.http.call({
      url: "/api/user/throwTFA",
      method: "POST",
      headers,
      body: JSON.stringify(input)
    })
  }

  async login(input: UserGatewaysTypes.NonAuth.ILogin) {
    const headers = new Headers();
    headers.set("content-type", "application/json");

    const response = await this.http.call({
      url: "/api/user/login",
      method: "POST",
      headers,
      body: JSON.stringify(input)
    })

    const dto = new LoginUserDTO();
    const body = await dto.exec(response.body);

    return body;
  }

 }
