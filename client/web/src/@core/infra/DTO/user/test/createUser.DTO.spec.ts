import { CreateUserDTO } from "../createUser.DTO";

describe("Create user DTO test", () => {
	it("should be able to get expected body", async () => {
		const createUserDTO = new CreateUserDTO();

		const body = {
			cancelKey: "cancelKey",
		};

		expect(createUserDTO.exec(body)).resolves.toEqual(body);
	});

	it("should throw one error: wrong cancelKey input", async () => {
		const createUserDTO = new CreateUserDTO();

		const body = {
			cancelKey: 0,
		};

		expect(createUserDTO.exec(body)).rejects.toThrow();
	});
});
