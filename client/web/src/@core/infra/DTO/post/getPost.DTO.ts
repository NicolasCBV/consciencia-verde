import { HttpError } from "@/@core/errors/HttpError";
import { z } from "zod";

export interface IExpectedGetPostBody {
	id?: string;
	name: string;
	imageURI?: string;
	description: string;
	content: string[];
	createdAt: Date;
	updatedAt: Date;
}

export class GetPostDTO {
	async exec(body: any) {
		const expectedBody = z.object({
			id: z.string().or(z.undefined()).or(z.null()),
			name: z.string(),
			imageURI: z.string().or(z.undefined()).or(z.null()),
			description: z.string(),
			content: z.array(z.string()),
			createdAt: z.date(),
			updatedAt: z.date()
		});

		await expectedBody.parseAsync(body)
			.catch(() => {
				throw new HttpError({
					name: "Internal Server Error",
					message: "Unexpected content.",
					code: 500
				});
			});
	}
}
