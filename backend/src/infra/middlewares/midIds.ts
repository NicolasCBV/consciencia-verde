export const midIds = {
	error: Symbol.for("ErrorMiddleware"),
	fingerprint: {
		mid: Symbol.for("FingerprintMiddleware"),
	},
	auth: {
		mid: Symbol.for("AuthMiddleware")
	},
	admin: {
		mid: Symbol.for("AdminMiddleware")
	},
	DTO: {
		createPost: Symbol.for("CreatePostDTO"),
		updatePost: Symbol.for("UpdatePostDTO")
	}
};
