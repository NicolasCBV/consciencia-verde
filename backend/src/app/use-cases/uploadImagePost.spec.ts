import { Container } from "inversify"
import { useCaseIds } from "./useCaseIds";
import { storageIds } from "@infra/storages/ids";
import { InMemoryPostRepo } from "@tests/mocks/repositories/postRepo";
import { UploadImagePostUseCase } from "./uploadImageOnPost.use-case";
import { randomBytes } from "crypto";

describe("Upload image on post use case test", () => {
  let container: Container;
  let uploadImagePostUseCase: UploadImagePostUseCase;

  beforeEach(() => {
    container = new Container;
    container.bind(storageIds.external.postRepo).to(InMemoryPostRepo);
    container.bind(useCaseIds.post.uploadImage).to(UploadImagePostUseCase);

    uploadImagePostUseCase = container.get<UploadImagePostUseCase>(
      useCaseIds.post.uploadImage
    );
  })

  it("should be able to upload image on post", async () => {
    const spy = jest.spyOn(InMemoryPostRepo.prototype, "setImage");

    expect(
      uploadImagePostUseCase.exec({
        postId: "randomId",
        file: {
          originalName: "originalName",
          mimetype: "image/jpeg",
          buffer: randomBytes(32)
        }
      })
    ).resolves;
    expect(spy).toHaveBeenCalledTimes(1);
  })
})
