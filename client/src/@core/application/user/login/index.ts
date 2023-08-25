import { HttpClient } from "@/@core/adapters/adapters.container";
import { RegisterContainer } from "@/@core/containers/register";
import { LoginUserGateway } from "@/@core/infra/gateways/user/user.login.gateway";
import { CancelLoginKeyUseCase } from "./cancelKey.use-case";
import { LaunchOTPLoginUseCase } from "./launchOTPLogin.use-case";
import { LoginUseCase } from "./login.use-case";
import { ThrowTFAUseCase } from "./throwTFA.use-case";

export const loginRegister = {
  gateway: "login gateway",
  useCases: {
    login: "login use case",
    launchOTP: "launch OTP login use case",
    cancelKey: "cancel key login use case",
    throwTFA: "throw TFA login use case"
  }
};

const gatewayInstance = new RegisterContainer({
  [loginRegister.gateway]: {
    dependencies: {
      imports: [HttpClient]
    },
    instance: LoginUserGateway
  }
}).start(LoginUserGateway, loginRegister.gateway);

export const LoginContainer = new RegisterContainer({
  [loginRegister.useCases.login]: {
    dependencies: {
      imports: [gatewayInstance]
    },
    instance: LoginUseCase
  },
  [loginRegister.useCases.launchOTP]: {
    dependencies: {
      imports: [gatewayInstance]
    },
    instance: LaunchOTPLoginUseCase
  },
  [loginRegister.useCases.cancelKey]: {
    dependencies: {
      imports: [gatewayInstance]
    },
    instance: CancelLoginKeyUseCase
  },
  [loginRegister.useCases.throwTFA]: {
    dependencies: {
      imports: [gatewayInstance]
    },
    instance: ThrowTFAUseCase
  },
});


