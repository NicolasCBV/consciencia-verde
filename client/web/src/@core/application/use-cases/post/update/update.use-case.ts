import { PostGateway } from "@/@core/domain/gateways/post.gateway";
import { PostGatewayTypes } from "@/@core/domain/gateways/types/post.gateway-types";
import { gateIds } from "@/@core/infra/gateways/gateIds";
import { inject, injectable } from "inversify";

@injectable()
export class UpdatePostUseCase {
	constructor(
		@inject(gateIds.post.update)
		private readonly postGate: PostGateway.UpdatePostGateway,
	) {}

	async exec(input: PostGatewayTypes.Server.IUpdatePost) {
		return await this.postGate.update(input);
	}
}
