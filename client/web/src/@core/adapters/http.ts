export interface IHttpClientCall {
  url: string;
  method: "GET" | "POST" | "PATCH" | "PUT" | "DELETE",
  headers: Headers | {
    [key: string]: string;
  },
  body?: string | FormData | BodyInit;
}

export interface IHttpClientCallReturn {
  body: any;
  headers: Headers;
  status: number;
}

export abstract class HttpAdapter {
  abstract call(input: IHttpClientCall): Promise<IHttpClientCallReturn>;
}
