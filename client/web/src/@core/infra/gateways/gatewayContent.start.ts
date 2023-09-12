import { Container } from "inversify";
import { RefreshCookieGateway } from "./cookie/refreshCookie.gateway";
import { gateIds } from "./gateIds";
import { CreatePostGateway } from "./post/post.create.gateway";
import { DeletePostGateway } from "./post/post.delete.gateway";
import { ExistentPostGateway } from "./post/post.exist.gateway";
import { GetPostGateway } from "./post/post.get.gateway";
import { SearchPostGateway } from "./post/post.search.gateway";
import { UpdatePostGateway } from "./post/post.update.gateway";
import { CreateUserGateway } from "./user/user.create.gateway";
import { DeleteUserGateway } from "./user/user.delete.gateway";
import { ForgotPasswordGateway } from "./user/user.forgotPassword.gateway";
import { LoginUserGateway } from "./user/user.login.gateway";
import { RefreshUserTokenGateway } from "./user/user.refreshToken.gateway";
import { UpdateUserGateway } from "./user/user.update.gateway";

export function startGatewayContent(container: Container) {
	container.bind(gateIds.cookie.refreshCookie).to(RefreshCookieGateway);

	container.bind(gateIds.post.create).to(CreatePostGateway);
	container.bind(gateIds.post.update).to(UpdatePostGateway);
	container.bind(gateIds.post.delete).to(DeletePostGateway);
	container.bind(gateIds.post.exist).to(ExistentPostGateway);
	container.bind(gateIds.post.get).to(GetPostGateway);
	container.bind(gateIds.post.search).to(SearchPostGateway);

	container.bind(gateIds.user.create).to(CreateUserGateway);
	container.bind(gateIds.user.login).to(LoginUserGateway);
	container.bind(gateIds.user.delete).to(DeleteUserGateway);
	container.bind(gateIds.user.update).to(UpdateUserGateway);
	container.bind(gateIds.user.refreshToken).to(RefreshUserTokenGateway);
	container.bind(gateIds.user.forgotPassword).to(ForgotPasswordGateway);
}
