import { HttpClient } from "@/@core/adapters/adapters.container"
import { RegisterContainer } from "@/@core/containers/register"
import { DeleteUserGateway } from "@/@core/infra/gateways/user/user.delete.gateway";
import { DeleteUserUseCase } from "./delete.use-case";

DeleteUserGateway.prototype.delete = jest.fn(async () => {});

describe("Delete user use case test", () => {
  const registers = {
    gateway: "delete user gateway",
    useCase: "delete user use case"
  }
  let container: RegisterContainer

  beforeEach(() => {
    container = new RegisterContainer({
      [registers.gateway]: {
        dependencies: {
          imports: [HttpClient]
        },
        instance: DeleteUserGateway
      },
      [registers.useCase]: {
        dependencies: {
          imports: [registers.gateway]
        },
        instance: DeleteUserUseCase 
      }
    })
  });

  it("should be able to delete user", async () => {
    const useCase = container.start(DeleteUserUseCase, registers.useCase);

    const gatewaySpy = jest.spyOn(DeleteUserGateway.prototype, "delete");

    await useCase.exec({
      access_token: "access_token"  
    });

    expect(gatewaySpy).toHaveBeenCalledTimes(1);
  })
})
