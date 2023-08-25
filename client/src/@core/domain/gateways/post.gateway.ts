import { Post } from "../entities/post";
import { PostGatewayTypes } from "./types/post.gateway-types";

// type IUpdatePost = Pick<Post, "name" | "description" | "imageURI" | "content">;

export namespace PostGateway {
  export abstract class GetPostGateway {
    abstract get(input: PostGatewayTypes.IGetPost): Promise<Post | null>;
  }

  export abstract class ExistentPostGateway {
    abstract exist(input: PostGatewayTypes.IExistPost): Promise<boolean>;
  }

  export abstract class CreatePostGateway {
    abstract create(input: PostGatewayTypes.ICreatePost): Promise<void>;
    // abstract update(input: IUpdatePost): Promise<void>;
    // abstract delete(key: string): Promise<void>;
  }
}
