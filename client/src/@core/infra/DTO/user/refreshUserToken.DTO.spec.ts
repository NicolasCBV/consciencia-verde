import { RefreshToken } from "@/@core/domain/entities/refreshToken";
import { RefreshUserTokenDTO } from "./refreshUserToken.DTO";

describe("Refresh user token DTO test", () => {
	it("should be able to get expected body", async () => {
		const refreshUserTokenDTO = new RefreshUserTokenDTO();

		const body = {
			access_token: "access_token",
		};

		expect(refreshUserTokenDTO.exec(body)).resolves.toEqual(body);
	})


	it("should throw one error: wrong access_token input", async () => {
		const refreshUserTokenDTO = new RefreshUserTokenDTO();

		const body = {
			access_token: 0,
		};

		expect(refreshUserTokenDTO.exec(body)).rejects.toThrow();
	})
})
