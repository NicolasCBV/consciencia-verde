import { adapterIds } from "@/@core/adapters/adapterIds";
import { HttpAdapter } from "@/@core/adapters/http";
import { PostGateway } from "@/@core/domain/gateways/post.gateway";
import { PostGatewayTypes } from "@/@core/domain/gateways/types/post.gateway-types";
import { HttpError } from "@/@core/errors/HttpError";
import { inject, injectable } from "inversify";

@injectable()
export class UpdatePostGateway implements PostGateway.UpdatePostGateway {
  constructor(
    @inject(adapterIds.http)
    private readonly http: HttpAdapter
  ) {}

  private async sendContent(input: PostGatewayTypes.Server.IUpdatePost) {
    await this.http.call({
      url: "/api/posts/update",
      method: "PUT",
      headers: {
        "content-type": "application/json",
        "authorization": String(input.access_token)
      },
      body: JSON.stringify({
        id: input.id,
        name: input.post.name,
        description: input.post.description,
        content: input.post.content
      })
    })
  } 

  private async sendImage(input: PostGatewayTypes.Server.IUploadImagePost) {
    const form = new FormData();
    form.append("file", input.file);

    return await this.http.call({
      url: `/api/posts/uploadImage?postId=${input.id}`,
      method: "POST",
      headers: {
        "authorization": String(input.access_token)
      },
      body: form
    });
  }

  async update(input: PostGatewayTypes.Server.IUpdatePost) {
    if(
      !input.post.image.file 
      && input.post.image.file
    )
      throw new HttpError({
        name: "Bad Request",
        code: 400,
        message: "File field empty."
      })


    await this.sendContent({
      id: input.id,
      access_token: input.access_token,
      post: input.post
    });

    if(input.post.image.file)
      await this.sendImage({
        id: input.id,
        access_token: input.access_token,
        file: input.post.image.file
      });
  }
}

