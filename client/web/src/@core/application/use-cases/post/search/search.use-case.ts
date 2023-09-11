import { PostGateway } from "@/@core/domain/gateways/post.gateway";
import { PostGatewayTypes } from "@/@core/domain/gateways/types/post.gateway-types";
import { gateIds } from "@/@core/infra/gateways/gateIds";
import { inject, injectable } from "inversify";

@injectable()
export class SearchPostUseCase {
	constructor(
    @inject(gateIds.post.search)
    private readonly postGate: PostGateway.SearchPostGateway
	) {}

	async exec(input: PostGatewayTypes.ISearchPost) {
		return await this.postGate.search(input);
	}
}
