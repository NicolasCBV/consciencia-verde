import { Application } from "@/@core/application/container";
import { HttpError } from "@/@core/errors/HttpError";
import { HttpErrorMapper } from "@/@core/errors/mappers/httpError";
import { NextApiRequest, NextApiResponse } from "next";
import { z } from "zod";

async function validateBody(input: any) {
	const expectedBody = z.object({
		name: z.string(),
		description: z.string(),
		content: z.array(z.string()).min(1)
	}).strict();

	return await expectedBody.parseAsync(input)
		.then(() => true)
		.catch(() => false);
}

export default async function createPost(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const { body, method, headers } = req;

	const validate = await validateBody(body);
	if(method !== "POST" || !validate) 
		return res.status(404).end();

	const adminUrl = process.env.ADMIN_SERVER_URL; 
	return await Application.httpClient.call({
		method: "POST",
		url: `${adminUrl}/post`,
		headers: {
			authorization: String(headers.authorization),
			"content-type": "application/json"
		},
		body: JSON.stringify(body)
	})
		.then((result) => {
			res.status(result.status).json(result.body);
		})
		.catch((err) => {
			console.log(err);
			if(err instanceof HttpError) {
				const httpError = HttpErrorMapper.toObject(err);
				res.status(httpError.code ?? 500).json(httpError);
			} else
				res.status(500).end();
		});
}
