import { Application } from "@/@core/application/container";
import { HttpError } from "@/@core/errors/HttpError";
import { HttpErrorMapper } from "@/@core/errors/mappers/httpError";
import { parse, serialize } from "cookie";
import { NextApiRequest, NextApiResponse } from "next";
import { z } from "zod";

async function validateBody(input: any) {
	const expectedBody = z.object({
		code: z.string(),
		email: z.string().email()
	});

	return await expectedBody.parseAsync(input)
		.then(() => true)
		.catch(() => false);
}

export default async function login(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const { body, method } = req;
	const result = await validateBody(body);

	if (method !== "POST" || !result) 
		return res.status(404).end();

	const serverURL = process.env.SERVER_URL;
	return await Application
		.httpClient
		.call({
			url: `${serverURL}/users/login`,
			method: "POST",
			headers: {
				"content-type": "application/json"
			},
			body: JSON.stringify({
				email: body?.email,
				code: body?.code
			})
		})
		.then((result) => {
			const rawCookie = result.headers.get("set-cookie");
			if(typeof rawCookie !== "string")
				return res.status(500).end();

			const cookie = parse(rawCookie);
			cookie["Domain"] = process.env.NEXT_PUBLIC_DOMAIN as string;

			res.setHeader(
				"set-cookie", 
				serialize(
					"refresh-cookie", 
					cookie["refresh-cookie"], {
						maxAge: parseInt(cookie["Max-Age"]),
						httpOnly: true,
						secure: process.env.NODE_ENV === "production"
							? true
							: false,
						domain: cookie["Domain"],
						path: cookie["Path"],
						expires: new Date(cookie["Expires"]),
						sameSite: "strict"
					}
				)
			);
			res.status(result.status).json(result.body);
		})
		.catch((err) => {
			if(err instanceof HttpError) {
				const httpError = HttpErrorMapper.toObject(err);
				res.status(httpError.code ?? 500).json(httpError);
			} else
				res.status(500).end();
		});

}

