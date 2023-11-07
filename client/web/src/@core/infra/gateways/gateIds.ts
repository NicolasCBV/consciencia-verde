export const gateIds = {
	image: Symbol.for("ImageGateway"),
	cookie: {
		refreshCookie: Symbol.for("RefreshCookieGateway"),
	},
	post: {
		create: Symbol.for("CreatePostGateway"),
		exist: Symbol.for("ExistentPostGateway"),
		get: Symbol.for("GetPostGateway"),
		search: Symbol.for("SearchPostGateway"),
		update: Symbol.for("UpdatePostGateway"),
		delete: Symbol.for("DeletePostGateway"),
	},
	user: {
		create: Symbol.for("CreateUserGateway"),
		delete: Symbol.for("DeleteUserGateway"),
		forgotPassword: Symbol.for("ForgotPasswordGateway"),
		login: Symbol.for("LoginUserGateway"),
		refreshToken: Symbol.for("RefreshUserTokenGateway"),
		update: Symbol.for("UpdateUserGateway"),
	},
};
