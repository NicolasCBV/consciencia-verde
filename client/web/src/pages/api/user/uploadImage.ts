import { Application } from "@/@core/application/container";
import { ServerOnlyApplication } from "@/@core/application/serverContainer";
import { HttpError } from "@/@core/errors/HttpError";
import { HttpErrorMapper } from "@/@core/errors/mappers/httpError";
import { NextApiRequest, NextApiResponse } from "next";

export const config = {
	api: {
		bodyParser: false,
	},
};

export default async function uploadImage(
	req: NextApiRequest,
	res: NextApiResponse,
) {
	const { method, headers } = req;
	if (method !== "PATCH") return res.status(404).end();

	return await ServerOnlyApplication.imageFlow.process
		.exec({ request: req })
		.then(async (data) => {
			const form = new FormData();
			form.append(
				"file",
				new Blob([data.buffer], {
					type: data.mimeType,
				}),
				data.name,
			);

			const serverURL = process.env.SERVER_URL;
			await Application.httpClient
				.call({
					url: `${serverURL}/users/upload-image`,
					method: "PATCH",
					headers: {
						authorization: `${headers.authorization}`,
					},
					body: form,
				})
				.then((data) => res.status(data.status).end());
		})
		.catch((err) => {
			if (err instanceof HttpError) {
				const httpError = HttpErrorMapper.toObject(err);
				res.status(httpError.code ?? 500).json(httpError);
			} else res.status(500).end();
		});
}
