import { GetPostDTO } from "./getPost.DTO";

describe("Get post DTO test", () => {
	it("should be able to get expected body", async () => {
		const getPostDTO = new GetPostDTO();

		const body = {
			name: "default",
			imageURI: "default url",
			description: "default description",
			content: ["default content"],
			createdAt: new Date(),
			updatedAt: new Date()
		};

		expect(getPostDTO.exec(body)).resolves;
	});

	it("should throw one error: wrong name input", async () => {
		const getPostDTO = new GetPostDTO();
	
		const body = {
			name: 0,
			imageURI: "default url",
			description: "default description",
			content: ["default content"],
			createdAt: new Date(),
			updatedAt: new Date()
		};
	
		expect(getPostDTO.exec(body)).rejects.toThrow();
	});
	
	it("should throw one error: wrong id input", async () => {
		const getPostDTO = new GetPostDTO();
	
		const body = {
			id: 0,
			name: "default",
			imageURI: "default url",
			description: "default description",
			content: ["default content"],
			createdAt: new Date(),
			updatedAt: new Date()
		};
	
		expect(getPostDTO.exec(body)).rejects.toThrow();
	});
	
	it("should throw one error: wrong imageURI input", async () => {
		const getPostDTO = new GetPostDTO();
	
		const body = {
			name: "default",
			imageURI: 0,
			description: "default description",
			content: ["default content"],
			createdAt: new Date(),
			updatedAt: new Date()
		};
	
		expect(getPostDTO.exec(body)).rejects.toThrow();
	});
	
	it("should throw one error: wrong description input", async () => {
		const getPostDTO = new GetPostDTO();
	
		const body = {
			name: "default",
			imageURI: "default url",
			description: 0,
			content: ["default content"],
			createdAt: new Date(),
			updatedAt: new Date()
		};
	
		expect(getPostDTO.exec(body)).rejects.toThrow();
	});
	
	it("should throw one error: wrong content input", async () => {
		const getPostDTO = new GetPostDTO();
	
		const body = {
			name: "default",
			imageURI: "default url",
			description: "default description",
			content: 0,
			createdAt: new Date(),
			updatedAt: new Date()
		};
	
		expect(getPostDTO.exec(body)).rejects.toThrow();
	});
	
	it("should throw one error: wrong createdAt input", async () => {
		const getPostDTO = new GetPostDTO();
	
		const body = {
			name: "default",
			imageURI: "default url",
			description: "default description",
			content: ["default content"],
			createdAt: 0,
			updatedAt: new Date()
		};
	
		expect(getPostDTO.exec(body)).rejects.toThrow();
	});
	
	it("should throw one error: wrong updatedAt input", async () => {
		const getPostDTO = new GetPostDTO();
	
		const body = {
			name: "default",
			imageURI: "default url",
			description: "default description",
			content: ["default content"],
			createdAt: new Date(),
			updatedAt: 0
		};
	
		expect(getPostDTO.exec(body)).rejects.toThrow();
	});
});
