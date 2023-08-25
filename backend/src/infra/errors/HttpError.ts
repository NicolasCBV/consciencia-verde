interface IProps {
  name: string;
  code: number;
  message: string;
}

export class HttpError extends Error {
  code: number;

  constructor(input: IProps) {
    super();

    this.name = input.name;
    this.message = input.message;
    this.code = input.code;
  }
}
