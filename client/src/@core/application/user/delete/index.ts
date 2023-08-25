import { HttpClient } from "@/@core/adapters/adapters.container";
import { RegisterContainer } from "@/@core/containers/register";
import { DeleteUserGateway } from "@/@core/infra/gateways/user/user.delete.gateway";
import { DeleteUserUseCase } from "./delete.use-case";

export const deleteUserRegister = {
  gateway: "delete user gateway",
  useCase: "delete user use case"
};

const deleteUserGatewayInstance = new RegisterContainer({
  [deleteUserRegister.gateway]: {
    dependencies: {
      imports: [HttpClient]
    },
    instance: DeleteUserGateway
  }
}).start(DeleteUserGateway, deleteUserRegister.gateway);

export const DeleteUserContainer = new RegisterContainer({
  [deleteUserRegister.useCase]: {
    dependencies: {
      imports: [deleteUserGatewayInstance]
    },
    instance: DeleteUserUseCase
  }
});

