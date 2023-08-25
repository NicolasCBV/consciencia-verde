import { HttpClient } from "@/@core/adapters/adapters.container"
import { RegisterContainer } from "@/@core/containers/register"
import { CreateUserGateway } from "@/@core/infra/gateways/user/user.create.gateway"
import { CancelSiginKeyUseCase } from "./cancelKey.use-case"
import { CreateUserUseCase } from "./create.use-case"
import { LaunchOTPUseCase } from "./launchOTP.use-case"
import { ValidateUseCase } from "./validate.use-case"

export const siginRegister = {
  gateway: "create user gateway",
  useCases: {
    create: "create user use case",
    validate: "validate user use case",
    cancelKey: "cancel key use case",
    launchOTP: "launch OTP use case"
  }
}

const createUserGatewayInstance = new RegisterContainer({
  [siginRegister.gateway]: {
    dependencies: {
      imports: [HttpClient]
    },
    instance: CreateUserGateway
  }
}).start(CreateUserGateway, siginRegister.gateway);

export const SiginContainer = new RegisterContainer({
  [siginRegister.useCases.create]: {
    dependencies: {
      imports: [createUserGatewayInstance]
    },
    instance: CreateUserUseCase
  },
  [siginRegister.useCases.validate]: {
    dependencies: {
      imports: [createUserGatewayInstance]
    },
    instance: ValidateUseCase
  },
  [siginRegister.useCases.launchOTP]: {
    dependencies: {
      imports: [createUserGatewayInstance]
    },
    instance: LaunchOTPUseCase
  },
  [siginRegister.useCases.cancelKey]: {
    dependencies: {
      imports: [createUserGatewayInstance]
    },
    instance: CancelSiginKeyUseCase
  }
});

