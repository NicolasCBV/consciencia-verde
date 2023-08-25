import { Container } from "inversify"
import { useCaseIds } from "./useCaseIds";
import { DeletePostUseCase } from "./deletePost.use-case";
import { storageIds } from "@infra/storages/ids";
import { InMemoryPostRepo } from "@tests/mocks/repositories/postRepo";

describe("Delete post use case test", () => {
  let container: Container;
  let deletePostUseCase: DeletePostUseCase;

  beforeEach(() => {
    container = new Container;
    container.bind(storageIds.external.postRepo).to(InMemoryPostRepo);
    container.bind(useCaseIds.post.delete).to(DeletePostUseCase);

    deletePostUseCase = container.get<DeletePostUseCase>(useCaseIds.post.delete);
  })

  it("should be able to delete post", async () => {
    const spy = jest.spyOn(InMemoryPostRepo.prototype, "deletePost");

    expect(
      deletePostUseCase.exec({
        id: "randomId"
      })
    ).resolves;
    expect(spy).toHaveBeenCalledTimes(1);
  })
})
