export const gateIds = {
  post: {
	create: Symbol.for("CreatePostGateway"),
    exist: Symbol.for("ExistentPostGateway"),
    get: Symbol.for("GetPostGateway"),
    search: Symbol.for("SearchPostGateway")
  },
  user: {
    create: Symbol.for("CreateUserGateway"),
    delete: Symbol.for("DeleteUserGateway"),
    forgotPassword: Symbol.for("ForgotPasswordGateway"),
    login: Symbol.for("LoginUserGateway"),
    refreshToken: Symbol.for("RefreshUserTokenGateway"),
    update: Symbol.for("UpdateUserGateway")
  }
}
