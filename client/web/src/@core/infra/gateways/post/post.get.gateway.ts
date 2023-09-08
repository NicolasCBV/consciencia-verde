import { firestore } from "@/@core/config/firebase.config";
import { PostGateway } from "@/@core/domain/gateways/post.gateway";
import { PostGatewayTypes } from "@/@core/domain/gateways/types/post.gateway-types";
import { HttpError } from "@/@core/errors/HttpError";
import { 
	collection, 
	query, 
	where, 
	doc, 
	getDoc, 
	getDocs,
	limit, 
	orderBy, 
	Timestamp, 
	DocumentData
} from "firebase/firestore";
import { injectable } from "inversify";
import { GetPostDTO } from "../../DTO/post/getPost.DTO";
import { FirestorePostMapper } from "../../mappers/firebase/firestore/post";

type TPostContentArray = {
  post: DocumentData;
  id: string;
}[]

@injectable()
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
				});
			});
	}

	private transformData(data: any) {
		if(
			typeof data?.imageURI === "string" ||
      !data.imageURI &&
      typeof data?.name === "string" &&
      typeof data?.description === "string" &&
      data?.content instanceof Array &&
      data?.createdAt instanceof Timestamp &&
      data?.updatedAt instanceof Timestamp
		)
			return FirestorePostMapper.format(data);

		throw new Error("Could not transform post content on 'GetPostGateway'");
	}

	async getPagination(input: PostGatewayTypes.IPagination) {
		const postCollections = collection(firestore, "posts");
    
		const q = query(
			postCollections, 
			where("createdAt", ">", input.date), 
			orderBy("createdAt"), 
			limit(22)
		);
		return await getDocs(q)
			.then((snapshot): TPostContentArray => {
				const array: TPostContentArray = [];
				snapshot.forEach((content) => {
					return array.push({
						id: content.id,
						post: content.data()
					});
				});
				return array;
			})
			.catch(() => {
				throw new HttpError({
					name: "Unauthorized",
					code: 401,
					message: "Could not send image"
				});
			});
	}

	async pagination(input: PostGatewayTypes.IPagination) {
		const rawArray = await this.getPagination(input);
		const promiseArray = rawArray.map(async (item) => {
			const transformedData = this.transformData(item.post);
        
			const dto = new GetPostDTO();
			await dto.exec(transformedData);

			const post = FirestorePostMapper.toClass(transformedData);
			post.name = post.name.length >= 30
				? post.name.slice(0, 31) + "..."
				: post.name;
			post.description = post.description.length >= 50
				? post.description.slice(0, 51) + "..."
				: post.description;
			return { id: item.id, post };
		});
		return await Promise.all(promiseArray);
	}

	async get(input: PostGatewayTypes.IGetPost) {
		const name = this.formatPostData(input.id);
		const data = await this.getPost(name);
    
		if(!data) return null;

		const transformedData = this.transformData(data);

		const dto = new GetPostDTO();
		await dto.exec(transformedData);
 
		return FirestorePostMapper.toClass(transformedData);
	}
}

