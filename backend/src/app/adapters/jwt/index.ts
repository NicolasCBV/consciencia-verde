import { z } from "zod";
import { IRefreshToken, IValidateToken, TokenAdapter } from "../token.adapter";
import * as jwt from "jsonwebtoken";
import { injectable } from "inversify";

@injectable()
export class JwtAdapter implements TokenAdapter {
  private signToken(input: IRefreshToken): string {
    const secret = String(process.env.TOKEN_SECRET ?? "secret");
    return jwt.sign(input, secret);
  }

  private verify(token: string) {
    const secret = String(process.env.TOKEN_SECRET ?? "secret");
    const data = jwt.verify(token, secret);
    return data;
  }

  private validateTokenContent(input: any) {
    const expectedInput = z.object({
      type: z.string(),
      sub: z.string(),
      email: z.string(), 
      deviceId: z.optional(z.string().or(z.null()).or(z.undefined())), 
      iat: z.number(), 
      exp: z.number(),
      userData: z.object({ 
        name: z.string(),
        description: z.optional(z.string().or(z.null()).or(z.undefined())),
        imageUrl: z.optional(z.string().or(z.null()).or(z.undefined())),
        createdAt: z.string(), 
        updatedAt: z.string()
      })
    });

    expectedInput.parseAsync(input)
      .catch(() => {
        throw new jwt.JsonWebTokenError("Malformed token content.")
      });

    return input as IRefreshToken;
  }

  async validate(input: IValidateToken) {
    const unsafeData = this.verify(input.token);
    const data = this.validateTokenContent(unsafeData);
    return data;
  }

  async create(input: IRefreshToken) {
    const token = this.signToken(input);
    return token;
  }
}
