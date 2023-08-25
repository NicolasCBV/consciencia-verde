import { HttpClient } from "@/@core/adapters/adapters.container"
import { RegisterContainer } from "@/@core/containers/register"
import { ForgotPasswordGateway } from "@/@core/infra/gateways/user/user.forgotPassword.gateway"
import { EndForgotPassUseCase } from "./endForgotPass.use-case";
import { StartForgotPassUseCase } from "./startForgotPass.use-case";

export const forgotPasswordRegister = {
  gateway: "forgot password gateway",
  useCases: {
    start: "start forgot password use case",
    finish: "finish forgot password use case"
  }
}

const forgotPasswordGatewayInstance = new RegisterContainer({
  [forgotPasswordRegister.gateway]: {
    dependencies: {
      imports: [HttpClient]
    },
    instance: ForgotPasswordGateway
  }
}).start(ForgotPasswordGateway, forgotPasswordRegister.gateway);

export const ForgotPasswordContainer = new RegisterContainer({
  [forgotPasswordRegister.useCases.start]: {
    dependencies: {
      imports: [forgotPasswordGatewayInstance]
    },
    instance: StartForgotPassUseCase
  },
  [forgotPasswordRegister.useCases.finish]: {
    dependencies: {
      imports: [forgotPasswordGatewayInstance]
    },
    instance: EndForgotPassUseCase
  }
});
