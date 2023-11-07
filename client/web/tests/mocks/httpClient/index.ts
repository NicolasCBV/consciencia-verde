import { HttpAdapter, IHttpClientCallReturn } from "@/@core/adapters/http";
import { injectable } from "inversify";

@injectable()
export class FakeHttpClient implements HttpAdapter {
	async call(): Promise<IHttpClientCallReturn> {
		return {
			body: {},
			status: 200,
			headers: new Headers(),
		};
	}
}
