import { Container } from "inversify";
import { adapterIds } from "./adapterIds";
import { Cookie } from "./cookie/index";
import { Fetcher } from "./fetch";

export function startAdapterContent(container: Container) {
	container.bind(adapterIds.http).to(Fetcher);
	container.bind(adapterIds.cookie).to(Cookie);
}
