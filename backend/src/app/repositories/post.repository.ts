import { PostTypes } from "./types/post.types";

export abstract class PostRepo {
  abstract setContent(input: PostTypes.ISetContent): Promise<string>;
  abstract setImage(input: PostTypes.ISetImage): Promise<void>;
  abstract deletePost(input: PostTypes.IDelete): Promise<void>
}
