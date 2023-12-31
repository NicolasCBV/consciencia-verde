export const useCasesIds = {
	image: {
		process: Symbol.for("ProcessImageUseCase"),
	},
	cookie: {
		makeRefreshCookie: Symbol.for("MakeRefreshCookieUseCase"),
	},
	post: {
		create: Symbol.for("CreatePostUseCase"),
		delete: Symbol.for("DeletePostUseCase"),
		update: Symbol.for("UpdatePostUseCase"),
		exist: Symbol.for("ExistPostUseCase"),
		get: Symbol.for("GetPostUseCase"),
		pagination: Symbol.for("PaginationPostUseCase"),
		search: Symbol.for("SearchPostUseCase"),
	},
	user: {
		delete: Symbol.for("DeleteUserUseCase"),
		refreshTokens: Symbol.for("RefreshUseCase"),
		update: Symbol.for("UpdateUserUseCase"),
		forgotPassword: {
			start: Symbol.for("StartForgotPassUseCase"),
			end: Symbol.for("EndForgotPassUseCase"),
		},
		sigin: {
			cancelKey: Symbol.for("CancelSiginKeyUseCase"),
			create: Symbol.for("CreateUserUseCase"),
			launchOTP: Symbol.for("LaunchOTPUseCase"),
			validate: Symbol.for("ValidateUseCase"),
		},
		login: {
			launchOTP: Symbol.for("LaunchOTPLoginUseCase"),
			start: Symbol.for("ThrowTFAUseCase"),
			end: Symbol.for("LoginUseCase"),
		},
	},
};
