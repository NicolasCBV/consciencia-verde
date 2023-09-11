import { adapterIds } from "@/@core/adapters/adapterIds";
import { HttpAdapter } from "@/@core/adapters/http";
import { PostGateway } from "@/@core/domain/gateways/post.gateway";
import { PostGatewayTypes } from "@/@core/domain/gateways/types/post.gateway-types";
import { inject, injectable } from "inversify";

@injectable()
export class DeletePostGateway implements PostGateway.DeletePostGateway {
	constructor(
    @inject(adapterIds.http)
    private readonly http: HttpAdapter
	) {}

	async remove(input: PostGatewayTypes.Server.IDeletePost) {
		const route = `/api/posts/delete?postId=${input.id}`;
		await this.http.call({
			url: route,
			method: "DELETE",
			headers: {
				"content-type": "application/json",
				"authorization": String(input.access_token)
			}
		});
	}
}

