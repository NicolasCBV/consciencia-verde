import { PostRepo } from "@app/repositories/post.repository";
import { injectable } from "inversify";

@injectable()
export class InMemoryPostRepo implements PostRepo {
	async setContent(): Promise<string> {
		return "random_id";
	}

	async setImage(): Promise<void> {}
 
	async deletePost(): Promise<void> {}
}
