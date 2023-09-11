import { PostRepo } from "@app/repositories/post.repository";
import { PostTypes } from "@app/repositories/types/post.types";
import { injectable } from "inversify";

@injectable()
export class InMemoryPostRepo implements PostRepo {
  async setContent(input: PostTypes.ISetContent): Promise<string> {
    return "random_id"
  }

  async setImage(input: PostTypes.ISetImage): Promise<void> {

  }
 
  async deletePost(input: PostTypes.IDelete): Promise<void> {

  }
}
