import { Container } from "inversify";
import "reflect-metadata";
import { startAdapterContent } from "../adapters/adapterContent.start";
import { adapterIds } from "../adapters/adapterIds";
import { Fetcher } from "../adapters/fetch";
import { startGatewayContent } from "../infra/gateways/gatewayContent.start";
import { CreatePostUseCase } from "./use-cases/post/create/create.use-case";
import { DeletePostUseCase } from "./use-cases/post/delete/delete.use-case";
import { ExistPostUseCase } from "./use-cases/post/exist/exist.use-case";
import { GetPostUseCase } from "./use-cases/post/get/get.use-case";
import { PaginationPostUseCase } from "./use-cases/post/get/pagination.use-case";
import { startPostContent } from "./use-cases/post/postContent.start";
import { SearchPostUseCase } from "./use-cases/post/search/search.use-case";
import { UpdatePostUseCase } from "./use-cases/post/update/update.use-case";
import { useCasesIds } from "./use-cases/useCasesId";
import { DeleteUserUseCase } from "./use-cases/user/delete/delete.use-case";
import { EndForgotPassUseCase } from "./use-cases/user/forgotPass/endForgotPass.use-case";
import { StartForgotPassUseCase } from "./use-cases/user/forgotPass/startForgotPass.use-case";
import { LaunchOTPLoginUseCase } from "./use-cases/user/login/launchOTPLogin.use-case";
import { LoginUseCase } from "./use-cases/user/login/login.use-case";
import { ThrowTFAUseCase } from "./use-cases/user/login/throwTFA.use-case";
import { RefreshUseCase } from "./use-cases/user/refresh/refresh.use-case";
import { CancelSiginKeyUseCase } from "./use-cases/user/sigin/cancelKey.use-case";
import { CreateUserUseCase } from "./use-cases/user/sigin/create.use-case";
import { LaunchOTPUseCase } from "./use-cases/user/sigin/launchOTP.use-case";
import { ValidateUseCase } from "./use-cases/user/sigin/validate.use-case";
import { UpdateUserUseCase } from "./use-cases/user/update/update.use-case";
import { startUserContent } from "./use-cases/user/userContent.start";

const container = new Container();

startAdapterContent(container);
startGatewayContent(container);
startUserContent(container);
startPostContent(container);

export namespace Application {
  export const httpClient = container.get<Fetcher>(adapterIds.http);

  export const postFlow = {
    create: container.get<CreatePostUseCase>(useCasesIds.post.create),
    delete: container.get<DeletePostUseCase>(useCasesIds.post.delete),
    update: container.get<UpdatePostUseCase>(useCasesIds.post.update),
    get: container.get<GetPostUseCase>(useCasesIds.post.get),
    pagination: container.get<PaginationPostUseCase>(
      useCasesIds.post.pagination
    ),
    search: container.get<SearchPostUseCase>(useCasesIds.post.search),
    exist: container.get<ExistPostUseCase>(useCasesIds.post.exist)
  }

  export const forgotPasswordFlow = {
    start: container.get<StartForgotPassUseCase>(useCasesIds.user.forgotPassword.start),
    end: container.get<EndForgotPassUseCase>(useCasesIds.user.forgotPassword.end
    )
  };

  export const loginFlow = {
    login: container.get<LoginUseCase>(useCasesIds.user.login.end),
    throwTFA: container.get<ThrowTFAUseCase>(useCasesIds.user.login.start),
    launchOTP: container.get<LaunchOTPLoginUseCase>(useCasesIds.user.login.launchOTP)
  };

  export const siginFlow = {
    start: container.get<CreateUserUseCase>(useCasesIds.user.sigin.create),
    validate: container.get<ValidateUseCase>(useCasesIds.user.sigin.validate),
    launchOTP: container.get<LaunchOTPUseCase>(useCasesIds.user.sigin.launchOTP),
    cancelKey: container.get<CancelSiginKeyUseCase>(useCasesIds.user.sigin.cancelKey)
  };

  export const refreshTokensFlow = {
    refresh: container.get<RefreshUseCase>(useCasesIds.user.refreshTokens)
  };

  export const updateUserFlow = {
    update: container.get<UpdateUserUseCase>(useCasesIds.user.update)
  };

  export const deleteUserFlow = {
    delete: container.get<DeleteUserUseCase>(useCasesIds.user.delete)
  };
}
