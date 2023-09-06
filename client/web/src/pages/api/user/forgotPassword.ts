import { Application } from "@/@core/application/container";
import { HttpError } from "@/@core/errors/HttpError";
import { HttpErrorMapper } from "@/@core/errors/mappers/httpError";
import { NextApiRequest, NextApiResponse } from "next";
import { z } from "zod";

async function validateBody(input: any) {
  const expectedBody = z.object({
    email: z.string().email()
  });

  return await expectedBody.parseAsync(input)
    .then(() => true)
    .catch(() => false);
}

export default async function forgotPassword(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { body, method, headers } = req;
  const result = await validateBody(body);

  if (method !== "POST" || !result) 
    return res.status(404).end();

  const serverURL = process.env.SERVER_URL;
  return await Application
    .httpClient
    .call({
      url: `${serverURL}/users/forgot-password`,
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: `${headers.authorization}`
      },
      body: JSON.stringify({ 
        email: body?.email 
      })
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

