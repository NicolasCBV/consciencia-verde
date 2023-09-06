import { ValidateUserDTO } from "../validateUser.DTO";

describe("Validate user DTO test", () => {
	it("should be able to get expected body", async () => {
		const validateUserDTO = new ValidateUserDTO();

		const body = {
			access_token: "access_token",
		};

		expect(validateUserDTO.exec(body)).resolves.toEqual(body);
	})


	it("should throw one error: wrong access_token input", async () => {
		const validateUserDTO = new ValidateUserDTO();

		const body = {
			access_token: 0,
		};

		expect(validateUserDTO.exec(body)).rejects.toThrow();
	})
})
