import { ImageGatewayTypes } from "./types/image.gateway-types";

export abstract class AbstractImageGateway {
	abstract process(
		input: ImageGatewayTypes.IPropsProcessImage,
	): Promise<ImageGatewayTypes.IProcessImage>;
}
