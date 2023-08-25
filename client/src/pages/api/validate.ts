import { Application } from "@/@core/application/container";
import { HttpError } from "@/@core/errors/HttpError";
import { HttpErrorMapper } from "@/@core/errors/mappers/httpError";
import { NextApiRequest, NextApiResponse } from "next";
import { z } from "zod";

async function validateBody(input: any) {
  const expectedBody = z.object({
    code: z.string(),
    email: z.string().email()
  });

  return await expectedBody.parseAsync(input)
    .then(() => true)
    .catch(() => false);
}

export default async function validate(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { body } = req;
  const result = await validateBody(body);

  if (req.method !== "POST" || !result) 
    return res.status(404).end();

  const serverURL = process.env.SERVER_URI;
  return await Application
    .httpClient
    .call({
      url: `${serverURL}/users/validate`,
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify({
        email: body.email,
        OTP: body.code
      })
    })
    .then((result) => {
      const cookie = result.headers.get("set-cookie");

      if(typeof cookie !== "string")
        return res.status(500).end();

      res.setHeader("set-cookie", cookie);
      return res.status(result.status).json(result.body);
    })
    .catch((err) => {
      if(err instanceof HttpError) {
        const httpError = HttpErrorMapper.toObject(err);
        res.status(httpError.code ?? 500).json(httpError);
      } else
        res.status(500).end()
    });
}

