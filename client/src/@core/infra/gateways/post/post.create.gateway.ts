import { adapterIds } from "@/@core/adapters/adapterIds";
import { HttpAdapter } from "@/@core/adapters/http";
import { PostGateway } from "@/@core/domain/gateways/post.gateway";
import { PostGatewayTypes } from "@/@core/domain/gateways/types/post.gateway-types";
import { HttpError } from "@/@core/errors/HttpError";
import { inject, injectable } from "inversify";
import { CreatePostContentDTO } from "../../DTO/post/createPostContent.DTO";

@injectable()
export class CreatePostGateway implements PostGateway.CreatePostGateway {
  constructor(
    @inject(adapterIds.http)
    private readonly http: HttpAdapter
  ) {}

  private async sendContent(input: PostGatewayTypes.Server.ICreatePost) {
    const res = await this.http.call({
      url: "/api/posts/create",
      method: "POST",
      headers: {
        "content-type": "application/json",
        "authorization": String(input.access_token)
      },
      body: JSON.stringify({
        name: input.post.name,
        description: input.post.description,
        content: input.post.content
      })
    })

    const dto = new CreatePostContentDTO();
    const body = await dto.exec(res.body)
      
    return body;
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

  async create(input: PostGatewayTypes.Server.ICreatePost) {
    if(!input.post.image.file)
      throw new HttpError({
        name: "Bad Request",
        code: 400,
        message: "File field empty."
      })


    const { id } = await this.sendContent({
      access_token: input.access_token,
      post: input.post
    });

    await this.sendImage({
      id,
      access_token: input.access_token,
      file: input.post.image.file
    });

    return { id };
  }
}

