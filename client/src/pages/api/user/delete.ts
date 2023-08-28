import { Application } from "@/@core/application/container";
import { HttpError } from "@/@core/errors/HttpError";
import { HttpErrorMapper } from "@/@core/errors/mappers/httpError";
import { NextApiRequest, NextApiResponse } from "next";

export default async function deleteUser(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method, headers } = req;
  if (method !== "DELETE") 
    return res.status(404).end();

  const serverURL = process.env.SERVER_URL;
  return await Application
    .httpClient
    .call({
      url: `${serverURL}/users/delete`,
      method: "DELETE",
      headers: {
        authorization: `${headers.authorization}`
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

