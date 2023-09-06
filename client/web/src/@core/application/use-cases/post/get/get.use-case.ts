import { PostGateway } from "@/@core/domain/gateways/post.gateway";
import { PostGatewayTypes } from "@/@core/domain/gateways/types/post.gateway-types";
import { gateIds } from "@/@core/infra/gateways/gateIds";
import { inject, injectable } from "inversify";

@injectable()
export class GetPostUseCase {
  constructor(
    @inject(gateIds.post.get)
    private readonly postGate: PostGateway.GetPostGateway
  ) {}

  async exec(input: PostGatewayTypes.IGetPost) {
    return await this.postGate.get(input);
  }
}
