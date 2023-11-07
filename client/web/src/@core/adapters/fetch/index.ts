import { HttpError } from "@/@core/errors/HttpError";
import { injectable } from "inversify";
import { IHttpClientCall, HttpAdapter, IHttpClientCallReturn } from "../http";

@injectable()
export class Fetcher implements HttpAdapter {
	async call(input: IHttpClientCall): Promise<IHttpClientCallReturn> {
		return await fetch(input.url, {
			method: input.method,
			headers: input.headers,
			body: input.body,
		})
			.then(async (res) => {
				const status = res.status;
				const headers = res.headers;
				const body = res.headers
					.get("content-type")
					?.includes("application/json")
					? await res.json()
					: undefined;

				if (res.status >= 300)
					throw new HttpError({
						name: "Status Error",
						message: `The status "${res.status}" is not in the right range of status code.`,
						code: res.status,
						body,
						headers,
					});

				return {
					status,
					headers,
					body,
				};
			})
			.catch((err) => {
				if (!(err instanceof HttpError))
					throw new HttpError({
						name: "Http Client Error",
						message: "Something went wrong with the http client.",
						code: 500,
					});

				throw err;
			});
	}
}
