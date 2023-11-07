import { PostGateway } from "@/@core/domain/gateways/post.gateway";
import { PostGatewayTypes } from "@/@core/domain/gateways/types/post.gateway-types";
import { gateIds } from "@/@core/infra/gateways/gateIds";
import { inject, injectable } from "inversify";

@injectable()
export class DeletePostUseCase {
	constructor(
		@inject(gateIds.post.delete)
		private readonly postGate: PostGateway.DeletePostGateway,
	) {}

	async exec(input: PostGatewayTypes.Server.IDeletePost) {
		return await this.postGate.remove(input);
	}
}
