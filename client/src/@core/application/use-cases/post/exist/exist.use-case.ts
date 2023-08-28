import { PostGateway } from "@/@core/domain/gateways/post.gateway";
import { PostGatewayTypes } from "@/@core/domain/gateways/types/post.gateway-types";
import { gateIds } from "@/@core/infra/gateways/gateIds";
import { inject, injectable } from "inversify";

@injectable()
export class ExistPostUseCase {
  constructor(
    @inject(gateIds.post.exist)
    private readonly postGate: PostGateway.ExistentPostGateway
  ) {}

  async exec(input: PostGatewayTypes.IExistPost) {
    return await this.postGate.exist(input);
  }
}
