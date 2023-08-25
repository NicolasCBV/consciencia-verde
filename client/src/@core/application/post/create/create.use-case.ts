import { PostGateway } from "@/@core/domain/gateways/post.gateway";
import { PostGatewayTypes } from "@/@core/domain/gateways/types/post.gateway-types";

export class CreatePostUseCase {
  constructor(private readonly postGate: PostGateway.CreatePostGateway) {}

  async exec(input: PostGatewayTypes.ICreatePost) {
    await this.postGate.create(input);
  }
}
