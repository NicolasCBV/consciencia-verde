import { Application } from "@/@core/application/container";
import { HttpError } from "@/@core/errors/HttpError";

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
			headers: { cookie },
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

			headers.set(
				"set-cookie", 
				Application.cookieFlow.createRefreshCookie.exec(
					resHeaders.get("set-cookie") as string
				)
			);
			return result.json();
		});
}
