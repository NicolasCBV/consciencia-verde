import { Container } from "inversify"
import { useCaseIds } from "./useCaseIds";
import { storageIds } from "@infra/storages/ids";
import { InMemoryPostRepo } from "@tests/mocks/repositories/postRepo";
import { SetPostUseCase } from "./setPost.use-case";

describe("Set post use case test", () => {
  let container: Container;
  let setPostUseCase: SetPostUseCase;

  beforeEach(() => {
    container = new Container;
    container.bind(storageIds.external.postRepo).to(InMemoryPostRepo);
    container.bind(useCaseIds.post.create).to(SetPostUseCase);

    setPostUseCase = container.get<SetPostUseCase>(useCaseIds.post.create);
  })

  it("should be able to set post", async () => {
    const spy = jest.spyOn(InMemoryPostRepo.prototype, "setContent");

    const res = await setPostUseCase.exec({
        id: "randomId",
        name: "random name",
        content: ["random content"],
        description: "random description"
      });

    expect(typeof res).toEqual("string");
    expect(spy).toHaveBeenCalledTimes(1);
  })
})
