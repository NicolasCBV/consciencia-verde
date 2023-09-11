import { Post } from "../entities/post";
import { PostGatewayTypes } from "./types/post.gateway-types";

export namespace PostGateway {
  export abstract class GetPostGateway {
    abstract get(input: PostGatewayTypes.IGetPost): Promise<Post | null>;
    abstract pagination(input: PostGatewayTypes.IPagination): Promise<
      PostGatewayTypes.TPaginationReturn
    >;
  }

  export abstract class SearchPostGateway {
    abstract search(input: PostGatewayTypes.ISearchPost): Promise<
      PostGatewayTypes.ISearchPostReturn
    >;
  }

  export abstract class ExistentPostGateway {
    abstract exist(input: PostGatewayTypes.IExistPost): Promise<boolean>;
  }

  export abstract class CreatePostGateway {
    abstract create(input: PostGatewayTypes.Server.ICreatePost): Promise<
      PostGatewayTypes.Server.ICreatePostReturn
    >;
  }

  export abstract class UpdatePostGateway {
    abstract update(input: PostGatewayTypes.Server.IUpdatePost): Promise<void>;
  }

  export abstract class DeletePostGateway {
    abstract remove(input: PostGatewayTypes.Server.IDeletePost): Promise<void>
  }
}
