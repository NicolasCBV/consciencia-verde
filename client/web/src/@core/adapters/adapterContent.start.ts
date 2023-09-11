import { Container } from "inversify";
import { adapterIds } from "./adapterIds";
import { Fetcher } from "./fetch";

export function startAdapterContent(container: Container) {
	container.bind(adapterIds.http).to(Fetcher);
}
