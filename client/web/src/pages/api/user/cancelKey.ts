import { Application } from "@/@core/application/container";
import { HttpError } from "@/@core/errors/HttpError";
import { HttpErrorMapper } from "@/@core/errors/mappers/httpError";
import { NextApiRequest, NextApiResponse } from "next";
import { z } from "zod";

async function validateBody(input: any) {
	const expectedBody = z.object({
		email: z.string().email(),
		cancelKey: z.string().uuid(),
	});

	return await expectedBody
		.parseAsync(input)
		.then(() => true)
		.catch(() => false);
}

export default async function deleteUser(
	req: NextApiRequest,
	res: NextApiResponse,
) {
	const { body, headers, method } = req;

	const result = await validateBody(body);
	if (method !== "DELETE" || !result) return res.status(404).end();

	const serverURL = process.env.SERVER_URL;
	return await Application.httpClient
		.call({
			url: `${serverURL}/users/cancel`,
			method: "DELETE",
			headers: {
				authorization: `${headers.authorization}`,
			},
		})
		.then((result) => {
			res.status(result.status).end();
		})
		.catch((err) => {
			if (err instanceof HttpError) {
				const httpError = HttpErrorMapper.toObject(err);
				res.status(httpError.code ?? 500).json(httpError);
			} else res.status(500).end();
		});
}
