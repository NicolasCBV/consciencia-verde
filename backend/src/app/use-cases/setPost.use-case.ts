import { inject, injectable } from "inversify";
import { PostRepo } from "../repositories/post.repository";
import { PostTypes } from "../repositories/types/post.types";
import { storageIds } from "@infra/storages/ids";

@injectable()
export class SetPostUseCase {
	constructor(
    @inject(storageIds.external.postRepo)
    private readonly postRepo: PostRepo
	) {}

	async exec(input: PostTypes.ISetContent) {
		return await this.postRepo.setContent(input);
	}
}
