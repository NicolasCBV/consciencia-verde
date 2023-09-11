import { Post } from "../../entities/post";

export namespace PostGatewayTypes {
  export interface IExistPost {
    name: string;
  }

  export interface IGetPost {
    id: string;
  }

  export interface IPagination {
    date: Date;
    number: number;
  }

  export type TPaginationReturn = {
    post: Post;
    id: string;
  }[];

  export interface ISearchPost {
    page?: number;
    query: string;
  }

  export interface ISearchPostReturn {
    pages: number;
    posts: {
      post: Post;
      id: string;
    }[];
  }

  export namespace Server {
    export interface IDeletePost {
      id: string;
      access_token: string;
    }

    export interface IUpdatePost {
      id: string;
      access_token: string;
      post: Post;
    }

    export interface ICreatePost {
      access_token: string;
      post: Post;
    }

    export interface ICreatePostReturn {
      id: string;
    }

    export interface IUpdatePost {
      access_token: string;
      id: string;
      post: Post;
    }

    export interface IUploadImagePost {
      access_token: string;
      file: File;
      id: string;
    }
  }
}
