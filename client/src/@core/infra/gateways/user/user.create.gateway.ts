import { HttpAdapter } from "@/@core/adapters/http";
import { UserGatewaysTypes } from "@/@core/domain/gateways/types/user.gateway-types";
import { UserGateways } from "@/@core/domain/gateways/user.gateway";
import { CreateUserDTO } from "../../DTO/user/createUser.DTO";
import { LaunchOTPDTO } from "../../DTO/user/launchOTP.DTO";
import { ValidateUserDTO } from "../../DTO/user/validateUser.DTO";

export class CreateUserGateway implements UserGateways.CreateUserGateway {
  constructor(private readonly http: HttpAdapter) {}

  async cancelCreation(input: UserGatewaysTypes.NonAuth.ICancel) {
    const headers = new Headers();
    headers.set("content-type", "application/json");

    await this.http.call({
      url: "/api/cancelKey",
      method: "DELETE",
      headers,
      body: JSON.stringify(input) 
    });
  }

  async create(input: UserGatewaysTypes.NonAuth.ICreate) {
    const headers = new Headers();
    headers.set("content-type", "application/json");

    const response = await this.http.call({
      url: "/api/sigin",
      method: "POST",
      headers,
      body: JSON.stringify(input)
    });

    const dto = new CreateUserDTO();
    const body = await dto.exec(response.body);

    return body;
  }

  async launchOTP(input: UserGatewaysTypes.NonAuth.ILaunchOTP) {
    const headers = new Headers();
    headers.set("content-type", "application/json");
  
    const response = await this.http.call({
      url: "/api/launch-otp",
      method: "POST",
      headers,
      body: JSON.stringify(input)
    });

    const dto = new LaunchOTPDTO();
    const body = await dto.exec(response.body);

    return body;
  }
  
  async validate(input: UserGatewaysTypes.NonAuth.IValidate) {
    const headers = new Headers();
    headers.set("content-type", "application/json");

    const response = await this.http.call({
      url: "/api/validate",
      method: "POST",
      headers,
      body: JSON.stringify(input)
    });

    const dto = new ValidateUserDTO();
    const body = await dto.exec(response.body);

    return body;
  }
}
