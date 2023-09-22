import "reflect-metadata";
import { Container } from "inversify";
import { useCasesIds } from "./use-cases/useCasesId";
import { ProcessImageUseCase } from "./use-cases/image/processImage.use-case";
import { startImageContent } from "./use-cases/image/images.start";
import { startGatewayServerOnlyContent } from "../infra/gateways/gatewayContent-serverOnly.start";

const container = new Container();

startGatewayServerOnlyContent(container);
startImageContent(container);

export const ServerOnlyApplication = {
	imageFlow: {
		process: container.get<ProcessImageUseCase>(
			useCasesIds.image.process
		)
	},
};
