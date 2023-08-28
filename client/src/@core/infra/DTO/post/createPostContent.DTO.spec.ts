import { CreatePostContentDTO } from "./createPostContent.DTO";

describe("Create post content DTO test", () => {
	it("should be able to get expected body", async () => {
		const createUserDTO = new CreatePostContentDTO();

		const body = {
			id: "cancelKey"
		};

		expect(createUserDTO.exec(body)).resolves.toEqual(body);
	})

	it("should throw one error: wrong id input", async () => {
		const createUserDTO = new CreatePostContentDTO();

		const body = {
			id: 0
		};

		expect(createUserDTO.exec(body)).rejects.toThrow();
	})
})
