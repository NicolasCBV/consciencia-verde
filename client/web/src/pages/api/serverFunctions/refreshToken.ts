import { HttpError } from "@/@core/errors/HttpError";
import { serialize, parse } from "cookie";

interface IRefreshTokenServerOnlyResponse {
  access_token: string;
}

interface IProps {
  cookie: string;
  headers: Headers;
}

export async function refreshTokenServerOnly({
	cookie,
	headers
}: IProps): Promise<IRefreshTokenServerOnlyResponse> {
	const serverUrl = process.env.SERVER_URL;
	return await fetch(
		`${serverUrl}/users/refresh-token`, 
		{
			method: "POST",
			credentials: "include",
			headers: {
				cookie
			},
		})
		.then(async (result) => {
			const resHeaders = result.headers;
			if(
				result.status !== 200 && 
				!headers.has("set-cookie")
			)
				throw new HttpError({
					headers: resHeaders,
					name: "Unauthorized",
					message: "Could not end the authentication",
					body: await result.json(),
					code: 401
				});

			const cookie = parse(resHeaders.get("set-cookie") as string);
			cookie["Domain"] = process.env.NEXT_PUBLIC_DOMAIN as string;

			headers.set(
				"set-cookie", 
				serialize(
					"refresh-cookie", 
					cookie["refresh-cookie"], {
						maxAge: parseInt(cookie["Max-Age"]),
						httpOnly: true,
						secure: false,
						domain: cookie["Domain"],
						path: cookie["Path"],
						expires: new Date(cookie["Expires"]),
						sameSite: "strict"
					}
				)
			);
			return result.json();
		});
}
