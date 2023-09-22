import { Container } from "inversify";
import { gateIds } from "./gateIds";
import { ImageGateway } from "./image/image.gateway";

export function startGatewayServerOnlyContent(container: Container) {
	container.bind(gateIds.image).to(ImageGateway);
}
