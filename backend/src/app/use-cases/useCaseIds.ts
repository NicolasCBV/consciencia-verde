export const useCaseIds = {
	post: {
		create: Symbol.for("SetPostUseCase"),
		uploadImage: Symbol.for("UploadImagePostUseCase"),
		delete: Symbol.for("DeletePostUseCase"),
	}
};
