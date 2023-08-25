export namespace TokensTypes {
  export interface ICreateToken {
    ttl: number;
    id: string;
    type: string;
    content: string;
  }

  export interface IGetToken {
    id: string;
  }

  export interface IExistToken {
    id: string;
  }
}
