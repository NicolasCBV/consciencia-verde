import { Container } from "inversify";
import { useCasesIds } from "../useCasesId";
import { DeleteUserUseCase } from "./delete/delete.use-case";
import { EndForgotPassUseCase } from "./forgotPass/endForgotPass.use-case";
import { StartForgotPassUseCase } from "./forgotPass/startForgotPass.use-case";
import { LaunchOTPLoginUseCase } from "./login/launchOTPLogin.use-case";
import { LoginUseCase } from "./login/login.use-case";
import { ThrowTFAUseCase } from "./login/throwTFA.use-case";
import { RefreshUseCase } from "./refresh/refresh.use-case";
import { CancelSiginKeyUseCase } from "./sigin/cancelKey.use-case";
import { CreateUserUseCase } from "./sigin/create.use-case";
import { LaunchOTPUseCase } from "./sigin/launchOTP.use-case";
import { ValidateUseCase } from "./sigin/validate.use-case";
import { UpdateUserUseCase } from "./update/update.use-case";

export function startUserContent(container: Container) {
	container.bind(useCasesIds.user.sigin.create).to(CreateUserUseCase);
	container.bind(useCasesIds.user.sigin.validate).to(ValidateUseCase);
	container.bind(useCasesIds.user.sigin.cancelKey).to(CancelSiginKeyUseCase);
	container.bind(useCasesIds.user.sigin.launchOTP).to(LaunchOTPUseCase);

	container.bind(useCasesIds.user.login.start).to(ThrowTFAUseCase);
	container.bind(useCasesIds.user.login.end).to(LoginUseCase);
	container.bind(useCasesIds.user.login.launchOTP).to(LaunchOTPLoginUseCase);

	container.bind(useCasesIds.user.forgotPassword.start).to(StartForgotPassUseCase);
	container.bind(useCasesIds.user.forgotPassword.end).to(EndForgotPassUseCase);

	container.bind(useCasesIds.user.update).to(UpdateUserUseCase);

	container.bind(useCasesIds.user.delete).to(DeleteUserUseCase);

	container.bind(useCasesIds.user.refreshTokens).to(RefreshUseCase);
}
