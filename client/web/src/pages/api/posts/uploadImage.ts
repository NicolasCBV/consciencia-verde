import { NextApiRequest, NextApiResponse } from "next";

export const config = {
	api: {
		bodyParser: {
			sizeLimit: "4mb"
		}
	}
};

export default async function uploadImage(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const { query } = req;
	if (req.method !== "POST" || typeof query.postId !== "string") 
		return res.status(404).end();

	const serverURL = process.env.ADMIN_SERVER_URL;
	res.redirect(`${serverURL}/post/${query.postId}/upload-image`);
}

