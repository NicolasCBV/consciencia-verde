import { Container } from "inversify";
import { useCasesIds } from "../useCasesId";
import { ProcessImageUseCase } from "./processImage.use-case";

export function startImageContent(container: Container) {
	container.bind(useCasesIds.image.process).to(ProcessImageUseCase);
}
