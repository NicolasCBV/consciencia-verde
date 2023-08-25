import { HttpClient } from "@/@core/adapters/adapters.container"
import { RegisterContainer } from "@/@core/containers/register"
import { CreateUserGateway } from "@/@core/infra/gateways/user/user.create.gateway"
import { CancelSiginKeyUseCase } from "../cancelKey.use-case"

CreateUserGateway.prototype.cancelCreation = jest.fn(async () => {});

describe("Cancel user key use case test", () => {
  const registers = {
    gateway: "cancel user key gateway",
    useCase: "cancel user key use case"
  }
  let container: RegisterContainer

  beforeEach(() => {
    container = new RegisterContainer({
      [registers.gateway]: {
        dependencies: {
          imports: [HttpClient]
        },
        instance: CreateUserGateway
      },
      [registers.useCase]: {
        dependencies: {
          imports: [registers.gateway]
        },
        instance: CancelSiginKeyUseCase
      }
    })
  });

  it("should be able to cancel user key", async () => {
    const useCase = container.start(CancelSiginKeyUseCase, registers.useCase);

    const gatewaySpy = jest.spyOn(CreateUserGateway.prototype, "cancelCreation");

    await useCase.exec({
      email: "default@email.com",
      key: "random uuid"
    });

    expect(gatewaySpy).toHaveBeenCalledTimes(1);
  })
})
