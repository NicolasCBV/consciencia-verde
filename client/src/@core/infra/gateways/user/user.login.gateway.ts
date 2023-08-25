import { HttpAdapter } from "@/@core/adapters/http";
import { UserGatewaysTypes } from "@/@core/domain/gateways/types/user.gateway-types";
import { UserGateways } from "@/@core/domain/gateways/user.gateway";
import { LaunchOTPDTO } from "../../DTO/user/launchOTP.DTO";
import { LoginUserDTO } from "../../DTO/user/loginUser.DTO";

export class LoginUserGateway implements UserGateways.LoginUserGateway {
  constructor(private readonly http: HttpAdapter) {}

  async cancelLogin(input: UserGatewaysTypes.NonAuth.ICancel) {
    const headers = new Headers();
    headers.set("content-type", "application/json");

    await this.http.call({
      url: "/api/cancelKey",
      method: "DELETE",
      headers,
      body: JSON.stringify(input) 
    });
  }

  async launchLoginOTP(input: UserGatewaysTypes.NonAuth.ILaunchOTP) {
    const headers = new Headers();
    headers.set("content-type", "application/json");
  
    const response = await this.http.call({
      url: "/api/launchOTPLogin",
      method: "POST",
      headers,
      body: JSON.stringify(input)
    });

    const dto = new LaunchOTPDTO();
    const body = await dto.exec(response.body);

    return body;
  }
  

  async throwTFA(input: UserGatewaysTypes.NonAuth.IThrowTFA) {
    const headers = new Headers();
    headers.set("content-type", "application/json");

    await this.http.call({
      url: "/api/throwTFA",
      method: "POST",
      headers,
      body: JSON.stringify(input)
    })
  }

  async login(input: UserGatewaysTypes.NonAuth.ILogin) {
    const headers = new Headers();
    headers.set("content-type", "application/json");

    const response = await this.http.call({
      url: "/api/login",
      method: "POST",
      headers,
      body: JSON.stringify(input)
    })

    const dto = new LoginUserDTO();
    const body = await dto.exec(response.body);

    return body;
  }

 }
