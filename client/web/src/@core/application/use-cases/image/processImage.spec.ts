import { gateIds } from "@/@core/infra/gateways/gateIds";
import { ImageGateway } from "@/@core/infra/gateways/image/image.gateway";
import { IncomingMessage } from "http";
import { Container } from "inversify";
import { Socket } from "net";
import { useCasesIds } from "../useCasesId";
import { ProcessImageUseCase } from "./processImage.use-case";

ImageGateway.prototype.process = jest.fn(async () => ({
	name: "",
    buffer: Buffer.from([]),
    mimeType: ""
}));

describe("Process image use case test", () => {
	const container = new Container();
	container.bind(gateIds.image).to(ImageGateway);
	container.bind(useCasesIds.image.process).to(ProcessImageUseCase);

	it("should be able to process image use case", async () => {
		const useCase = container.get<ProcessImageUseCase>(
			useCasesIds.image.process
		);

		const gatewaySpy = jest.spyOn(ImageGateway.prototype, "process");

		useCase.exec({
			request: new IncomingMessage(new Socket())
		});

		expect(gatewaySpy).toHaveBeenCalledTimes(1);
	});
});
