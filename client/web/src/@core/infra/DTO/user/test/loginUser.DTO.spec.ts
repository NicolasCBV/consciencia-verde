import { LoginUserDTO } from "../loginUser.DTO";

describe("Login DTO test", () => {
	it("should be able to get expected body", async () => {
		const loginUserDTO = new LoginUserDTO();

		const body = {
			access_token: "access_token",
		};

		expect(loginUserDTO.exec(body)).resolves.toEqual(body);
	});

	it("should throw one error: wrong access_token input", async () => {
		const loginUserDTO = new LoginUserDTO();

		const body = {
			access_token: 0,
		};

		expect(loginUserDTO.exec(body)).rejects.toThrow();
	});
});
