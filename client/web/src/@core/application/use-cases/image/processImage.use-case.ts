import { AbstractImageGateway } from "@/@core/domain/gateways/image.gateway";
import { ImageGatewayTypes } from "@/@core/domain/gateways/types/image.gateway-types";
import { gateIds } from "@/@core/infra/gateways/gateIds";
import { inject, injectable } from "inversify";

@injectable()
export class ProcessImageUseCase {
	constructor(
		@inject(gateIds.image)
		private readonly image: AbstractImageGateway,
	) {}

	async exec(
		input: ImageGatewayTypes.IPropsProcessImage,
	): Promise<ImageGatewayTypes.IProcessImage> {
		return await this.image.process(input);
	}
}
