import { PostGatewayTypes } from "@/@core/domain/gateways/types/post.gateway-types";
import { HttpError } from "@/@core/errors/HttpError";
import { z } from "zod";

export class CreatePostContentDTO {
  async exec(body: any): Promise<PostGatewayTypes.Server.ICreatePostReturn> {
	const expectedBody = z.object({
		id: z.string() 
	}).strict();

	await expectedBody.parseAsync(body)
	  .catch(() => {
		throw new HttpError({
		  name: "Internal Server Error",
		  message: "Unexpected body",
			code: 500
		});
	  });

	return body;
  }
}
