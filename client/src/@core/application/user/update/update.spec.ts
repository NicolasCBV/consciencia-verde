import { HttpClient } from "@/@core/adapters/adapters.container"
import { RegisterContainer } from "@/@core/containers/register"
import { UpdateUserGateway } from "@/@core/infra/gateways/user/user.update.gateway";
import { UpdateUserUseCase } from "./update.use-case";

UpdateUserGateway.prototype.update = jest.fn(async () => {});

describe("Update user use case test", () => {
  const registers = {
    gateway: "update user gateway",
    useCase: "update user use case"
  }
  let container: RegisterContainer

  beforeEach(() => {
    container = new RegisterContainer({
      [registers.gateway]: {
        dependencies: {
          imports: [HttpClient]
        },
        instance: UpdateUserGateway
      },
      [registers.useCase]: {
        dependencies: {
          imports: [registers.gateway]
        },
        instance: UpdateUserUseCase 
      }
    })
  });

  it("should be able to update user", async () => {
    const useCase = container.start(UpdateUserUseCase, registers.useCase);

    const gatewaySpy = jest.spyOn(UpdateUserGateway.prototype, "update");

    await useCase.exec({
      access_token: "access_token",
      name: "new name",
      description: "new description"
    });

    expect(gatewaySpy).toHaveBeenCalledTimes(1);
  })
})
