import { HttpError } from "./HttpError";

export class BadRequest extends HttpError {
	constructor() {
		super({
			name: "Bad Request",
			message: "Invalid body.",
			code: 400
		});
	}
}
