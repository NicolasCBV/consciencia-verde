import { Application } from "@/@core/application/container";
import { HttpError } from "@/@core/errors/HttpError";
import { HttpErrorMapper } from "@/@core/errors/mappers/httpError";
import { NextApiRequest, NextApiResponse } from "next";

export default async function deletePost(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method, headers, query } = req;

  if(method !== "DELETE" || typeof query.postId !== "string") 
    return res.status(404).end();

  const adminUrl = process.env.ADMIN_SERVER_URL; 
  return await Application.httpClient.call({
    method: "DELETE",
    url: `${adminUrl}/post/${query.postId}`,
    headers: {
      authorization: String(headers.authorization)
    }
  })
    .then((result) => {
      res.status(result.status).end();
    })
    .catch((err) => {
      if(err instanceof HttpError) {
        const httpError = HttpErrorMapper.toObject(err);
        res.status(httpError.code ?? 500).json(httpError);
      } else
        res.status(500).end();
    })
}
