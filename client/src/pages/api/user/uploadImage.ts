import { NextApiRequest, NextApiResponse } from "next";

export default async function uploadImage(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "PATCH") 
    return res.status(404).end()

  const serverURL = process.env.SERVER_URL;
  res.redirect(`${serverURL}/users/upload-image`)
}

