import { PostGateway } from "@/@core/domain/gateways/post.gateway";
import { PostGatewayTypes } from "@/@core/domain/gateways/types/post.gateway-types";

export class GetPostUseCase {
  constructor(private readonly postGate: PostGateway.GetPostGateway) {}

  async exec(input: PostGatewayTypes.IGetPost) {
    return await this.postGate.get(input);
  }
}
