import { LaunchOTPDTO } from "../launchOTP.DTO";

describe("Launch OTP DTO test", () => {
	it("should be able to get expected body", async () => {
		const launchOTPDTO = new LaunchOTPDTO();

		const body = {
			cancelKey: "cancelKey"
		};

		expect(launchOTPDTO.exec(body)).resolves.toEqual(body);
	})

	it("should throw one error: wrong cancelKey input", async () => {
		const launchOTPDTO = new LaunchOTPDTO();

		const body = {
			cancelKey: 0
		};

		expect(launchOTPDTO.exec(body)).rejects.toThrow();
	})
})
