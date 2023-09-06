import { UserGatewaysTypes } from "@/@core/domain/gateways/types/user.gateway-types";
import { HttpError } from "@/@core/errors/HttpError";
import { z } from "zod";

export class LaunchOTPDTO {
  async exec(body: any): Promise<UserGatewaysTypes.NonAuth.ILaunchOTPReturn> {
	const expectedBody = z.object({
		cancelKey: z.string() 
	}).strict();

	await expectedBody.parseAsync(body)
	  .catch(() => {
		throw new HttpError({
		  name: "Internal Server Error",
		  message: "Unexpected body",
		  code: 500
		});
	  });

	return body;
  }
}
