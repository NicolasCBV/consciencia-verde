import { firestore } from "@/@core/config/firebase.config";
import { PostGateway } from "@/@core/domain/gateways/post.gateway";
import { PostGatewayTypes } from "@/@core/domain/gateways/types/post.gateway-types";
import { HttpError } from "@/@core/errors/HttpError";
import { collection, doc, getDoc, Timestamp } from "firebase/firestore";
import { GetPostDTO } from "../../DTO/post/getPost.DTO";
import { FirestorePostMapper } from "../../mappers/firebase/firestore/post";

export class GetPostGateway implements PostGateway.GetPostGateway {
  private formatPostData(input: string) {
    const name = encodeURIComponent(input);
    return name;
  }

  private async getPost(input: string) {
    const postCollections = collection(firestore, "posts");
    
    const ref = doc(postCollections, input);
    return await getDoc(ref)
      .then((snapshot) => {
        if(!snapshot.exists)
          return null;

        return snapshot.data();
      })
      .catch(() => {
        throw new HttpError({
          name: "Unauthorized",
          code: 401,
          message: "Could not send image"
        })
      });
  }

  private transformData(data: any) {
    if(
      typeof data?.imageURI === "string" &&
      typeof data?.name === "string" &&
      typeof data?.description === "string" &&
      data?.content instanceof Array &&
      data?.createdAt instanceof Timestamp &&
      data?.updatedAt instanceof Timestamp
    )
      return FirestorePostMapper.format(data);
  }

  async get(input: PostGatewayTypes.IGetPost) {
    const name = this.formatPostData(input.name);
    const data = await this.getPost(name);
    
    if(!data) return null;

    const transformedData = this.transformData(data);

    const dto = new GetPostDTO();
    const content = await dto.exec(transformedData)
 
    return FirestorePostMapper.toClass(content);
  }
}

