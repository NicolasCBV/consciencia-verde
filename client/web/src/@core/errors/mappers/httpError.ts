import { HttpError } from "../HttpError";

interface IObject {
  name: string;
  message: string;
  code?: number;
  body?: string;
  headers?: Headers;
}

export class HttpErrorMapper {
  static toObject(input: HttpError): IObject {
    return {
      name: input.name,
      message: input.message,
      code: input.code,
      body: input.body,
      headers: input.headers
    }
  }
  
  static toClass(input: IObject): HttpError {
    return new HttpError({
      name: input.name,
      message: input.message,
      code: input.code,
      body: input.body,
      headers: input.headers
    });
  }
}
