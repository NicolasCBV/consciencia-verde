interface IProps {
  name: string;
  message: string;
  code?: number;
  body?: string;
  headers?: Headers;
}

export class HttpError extends Error {
  code: number | undefined;
  body: string | undefined;
  headers: Headers | undefined;

  constructor(input: IProps) {
    super();

    this.name = input.name;
    this.message = input.message;
    this.code = input.code;
    this.body = input.body;
    this.headers = input.headers;
  }
}
