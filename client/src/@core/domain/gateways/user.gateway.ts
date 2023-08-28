import { UserGatewaysTypes } from "./types/user.gateway-types";

export namespace UserGateways {
  export abstract class RefreshUserTokenGateway {
    abstract refresh(): Promise<UserGatewaysTypes.IBundleTokens>
  }

  export abstract class CreateUserGateway {
    abstract cancelCreation(input: UserGatewaysTypes.NonAuth.ICancel): Promise<void>;
    abstract create(
      input: UserGatewaysTypes.NonAuth.ICreate
    ): Promise<UserGatewaysTypes.NonAuth.ICreateReturn>;
    abstract launchOTP(
      input: UserGatewaysTypes.NonAuth.ILaunchOTP
    ): Promise<UserGatewaysTypes.NonAuth.ILaunchOTPReturn>;
    abstract validate(
      input: UserGatewaysTypes.NonAuth.IValidate
    ): Promise<
      UserGatewaysTypes.IBundleTokens
    >
  }

  export abstract class LoginUserGateway {
    abstract throwTFA(input: UserGatewaysTypes.NonAuth.IThrowTFA): Promise<void>;
    abstract launchLoginOTP(
      input: UserGatewaysTypes.NonAuth.ILaunchOTP
    ): Promise<UserGatewaysTypes.NonAuth.ILaunchOTPReturn>;
    abstract login(
      input: UserGatewaysTypes.NonAuth.ILogin
    ): Promise<
      UserGatewaysTypes.IBundleTokens
    >;
  }
  
  export abstract class UpdateUserGateway {
    abstract update(input: UserGatewaysTypes.Auth.IUpdateUser): Promise<void>;
  }
  
  export abstract class DeleteUserGateway {
    abstract delete(input: UserGatewaysTypes.Auth.IDelete): Promise<void>;
  }

  export abstract class ForgotUserPasswordGateway {
    abstract start(input: UserGatewaysTypes.NonAuth.IStartForgotPassFlow): Promise<void>;
    abstract finish(input: UserGatewaysTypes.NonAuth.IEndForgotPassFlow): Promise<void>;
  }
}
