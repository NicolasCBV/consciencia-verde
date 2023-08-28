import { firestore } from "@/@core/config/firebase.config";
import { PostGateway } from "@/@core/domain/gateways/post.gateway";
import { PostGatewayTypes } from "@/@core/domain/gateways/types/post.gateway-types";
import { HttpError } from "@/@core/errors/HttpError";
import { 
  collection, 
  query, 
  where, 
  or,
  getDocs,
  limit, 
  orderBy, 
  Timestamp, 
  DocumentData,
  endAt,
  startAt
} from "firebase/firestore";
import { injectable } from "inversify";
import { GetPostDTO } from "../../DTO/post/getPost.DTO";
import { FirestorePostMapper } from "../../mappers/firebase/firestore/post";

type TPostContentArray = {
  post: DocumentData;
  id: string;
}[]

@injectable()
export class SearchPostGateway implements PostGateway.SearchPostGateway {
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

  async getPostsBySearch(input: PostGatewayTypes.ISearchPost) {
    const postCollections = collection(firestore, "posts");
    
    const q = query(
      postCollections, 
      where("name", "==", input.query.name),
      orderBy("createdAt"),
      limit(10)
    )
    return await getDocs(q)
      .then((snapshot): TPostContentArray => {
        const array: TPostContentArray = [];
        snapshot.forEach((content) => {
          return array.push({
            id: content.id,
            post: content.data()
          })
        })
        return array;
      })
      .catch((err) => {
        console.log(err)
        throw new HttpError({
          name: "Unauthorized",
          code: 401,
          message: "Could not get content"
        })
      })
  }

  async search(input: PostGatewayTypes.ISearchPost) {
    const rawArray = await this.getPostsBySearch(input);
    const promiseArray = rawArray.map(async (item) => {
      const transformedData = this.transformData(item.post);
        
      const dto = new GetPostDTO();
      const content = await dto.exec(transformedData)

      return {
        id: item.id,
        post: FirestorePostMapper.toClass(content)
      }
    })
    return await Promise.all(promiseArray);
  }
}

