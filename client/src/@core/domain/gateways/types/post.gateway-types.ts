import { Post } from "../../entities/post";

export namespace PostGatewayTypes {
  export interface IExistPost {
    name: string;
  }

  export interface IGetPost {
    name: string;
  }
  
  export interface ICreatePost {
    post: Post;
  }
}
