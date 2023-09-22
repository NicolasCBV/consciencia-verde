import { Container } from "inversify";
import { useCasesIds } from "../useCasesId";
import { MakeRefreshCookieUseCase } from "./makeRefreshCookie.use-case";

export function startCookiesContent(container: Container) {
	container.bind(useCasesIds.cookie.makeRefreshCookie).to(MakeRefreshCookieUseCase);
}
