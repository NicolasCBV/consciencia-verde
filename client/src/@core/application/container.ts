import { HttpClient } from "../adapters/adapters.container";
import { PostContainer, postRegister } from "./post";
import { CreatePostUseCase } from "./post/create/create.use-case";
import { ExistPostUseCase } from "./post/exist/exist.use-case";
import { GetPostUseCase } from "./post/get/get.use-case";
import { DeleteUserContainer, deleteUserRegister } from "./user/delete";
import { DeleteUserUseCase } from "./user/delete/delete.use-case";
import { ForgotPasswordContainer, forgotPasswordRegister } from "./user/forgotPass";
import { EndForgotPassUseCase } from "./user/forgotPass/endForgotPass.use-case";
import { StartForgotPassUseCase } from "./user/forgotPass/startForgotPass.use-case";
import { LoginContainer, loginRegister } from "./user/login";
import { CancelLoginKeyUseCase } from "./user/login/cancelKey.use-case";
import { LaunchOTPLoginUseCase } from "./user/login/launchOTPLogin.use-case";
import { LoginUseCase } from "./user/login/login.use-case";
import { ThrowTFAUseCase } from "./user/login/throwTFA.use-case";
import { refreshTokensRegister, RefreshUserTokenContainer } from "./user/refresh";
import { RefreshUseCase } from "./user/refresh/refresh.use-case";
import { SiginContainer, siginRegister } from "./user/sigin";
import { CancelSiginKeyUseCase } from "./user/sigin/cancelKey.use-case";
import { CreateUserUseCase } from "./user/sigin/create.use-case";
import { LaunchOTPUseCase } from "./user/sigin/launchOTP.use-case";
import { ValidateUseCase } from "./user/sigin/validate.use-case";
import { UpdateUserContainer, updateUserRegister } from "./user/update";
import { UpdateUserUseCase } from "./user/update/update.use-case";

export namespace Application {
  export const httpClient = HttpClient;

  export const postFlow = {
    create: PostContainer.start(
      CreatePostUseCase, postRegister.useCases.create
    ),
    get: PostContainer.start(
      GetPostUseCase, postRegister.useCases.get
    ),
    exist: PostContainer.start(
      ExistPostUseCase, postRegister.useCases.exist
    )
  }

  export const forgotPasswordFlow = {
    start: ForgotPasswordContainer.start(
      StartForgotPassUseCase, forgotPasswordRegister.useCases.start
    ),
    end: ForgotPasswordContainer.start(
      EndForgotPassUseCase, forgotPasswordRegister.useCases.finish
    )
  };

  export const loginFlow = {
    login: LoginContainer.start(LoginUseCase, loginRegister.useCases.login),
    throwTFA: LoginContainer.start(ThrowTFAUseCase, loginRegister.useCases.throwTFA),
    cancelKey: LoginContainer.start(CancelLoginKeyUseCase, loginRegister.useCases.cancelKey),
    launchOTP: LoginContainer.start(LaunchOTPLoginUseCase, loginRegister.useCases.launchOTP)
  };

  export const siginFlow = {
    start: SiginContainer.start(CreateUserUseCase, siginRegister.useCases.create),
    validate: SiginContainer.start(ValidateUseCase, siginRegister.useCases.validate),
    launchOTP: SiginContainer.start(LaunchOTPUseCase, siginRegister.useCases.launchOTP),
    cancelKey: SiginContainer.start(CancelSiginKeyUseCase, siginRegister.useCases.cancelKey)
  };

  export const refreshTokensFlow = {
    refresh: RefreshUserTokenContainer.start(RefreshUseCase, refreshTokensRegister.useCase)
  };

  export const updateUserFlow = {
    update: UpdateUserContainer.start(UpdateUserUseCase, updateUserRegister.useCase)
  };

  export const deleteUserFlow = {
    delete: DeleteUserContainer.start(DeleteUserUseCase, deleteUserRegister.useCase)
  };
}
