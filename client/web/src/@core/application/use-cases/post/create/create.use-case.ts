import { PostGateway } from "@/@core/domain/gateways/post.gateway";
import { PostGatewayTypes } from "@/@core/domain/gateways/types/post.gateway-types";
import { gateIds } from "@/@core/infra/gateways/gateIds";
import { inject, injectable } from "inversify";

@injectable()
export class CreatePostUseCase {
	constructor(
    @inject(gateIds.post.create)
    private readonly postGate: PostGateway.CreatePostGateway
	) {}

	async exec(input: PostGatewayTypes.Server.ICreatePost) {
		return await this.postGate.create(input);
	}
}
