import { PostGateway } from "@/@core/domain/gateways/post.gateway";
import { PostGatewayTypes } from "@/@core/domain/gateways/types/post.gateway-types";

export class ExistPostUseCase {
  constructor(private readonly postGate: PostGateway.ExistentPostGateway) {}

  async exec(input: PostGatewayTypes.IExistPost) {
    return await this.postGate.exist(input);
  }
}
