import { HttpError } from "./HttpError";

export class Unauthorized extends HttpError {
  constructor() {
    super({
      name: "Unauthorized",
      message: "Access unauthorized",
      code: 401,
    });
  }
}
