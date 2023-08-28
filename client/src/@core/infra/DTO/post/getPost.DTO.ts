import { HttpError } from "@/@core/errors/HttpError";
import { z } from "zod";
import { IFirestorePostObject } from "../../mappers/firebase/firestore/post";

export class GetPostDTO {
  async exec(body: any): Promise<IFirestorePostObject> {
	const expectedBody = z.object({
		name: z.string(),
		imageURI: z.string(),
		description: z.string(),
		content: z.array(z.string()),
		createdAt: z.date(),
		updatedAt: z.date()
	});

	await expectedBody.parseAsync(body)
	  .catch((err) => {
		throw new HttpError({
		  name: "Internal Server Error",
		  message: "Unexpected content.",
			code: 500
		});
	  });

	return body;
  }
}
