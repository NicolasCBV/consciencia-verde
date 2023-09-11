import { Application } from "@/@core/application/container";
import { HttpError } from "@/@core/errors/HttpError";
import { HttpErrorMapper } from "@/@core/errors/mappers/httpError";
import { parse, serialize } from "cookie";
import { NextApiRequest, NextApiResponse } from "next";

export default async function refreshToken(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const { method, headers } = req;
	if (method !== "POST") 
		return res.status(404).end();

	const serverURL = process.env.SERVER_URL;
	return await Application
		.httpClient
		.call({
			url: `${serverURL}/users/refresh-token`,
			method: "POST",
			headers: {
				cookie: String(headers.cookie),
				"content-type": "application/json"
			}
		})
		.then((result) => {
			const rawCookie = result.headers.get("set-cookie");
			if(!rawCookie)
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

