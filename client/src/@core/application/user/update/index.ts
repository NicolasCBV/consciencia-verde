import { HttpClient } from "@/@core/adapters/adapters.container";
import { RegisterContainer } from "@/@core/containers/register";
import { UpdateUserGateway } from "@/@core/infra/gateways/user/user.update.gateway";
import { UpdateUserUseCase } from "./update.use-case";

export const updateUserRegister = {
  gateway: "update user gateway",
  useCase: "update user use case"
};

const updateUserGatewayInstance = new RegisterContainer({
  [updateUserRegister.gateway]: {
    dependencies: {
      imports: [HttpClient] 
    },
    instance: UpdateUserGateway
  }
}).start(UpdateUserGateway, updateUserRegister.gateway);

export const UpdateUserContainer = new RegisterContainer({
  [updateUserRegister.useCase]: {
    dependencies: {
      imports: [updateUserGatewayInstance]
    },
    instance: UpdateUserUseCase
  }
});

