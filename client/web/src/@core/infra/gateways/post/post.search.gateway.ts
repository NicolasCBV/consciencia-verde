import { searchClient } from "@/@core/config/algolia";
import { PostGateway } from "@/@core/domain/gateways/post.gateway";
import { PostGatewayTypes } from "@/@core/domain/gateways/types/post.gateway-types";
import { HttpError } from "@/@core/errors/HttpError";
import { injectable } from "inversify";
import { GetPostDTO, IExpectedGetPostBody } from "../../DTO/post/getPost.DTO";
import { AlgoliaHitMapper, IAlgoliaHitObject } from "../../mappers/algolia";
import { PostMapper } from "../../mappers/post";

@injectable()
export class SearchPostGateway implements PostGateway.SearchPostGateway {
	async getPostsBySearch(input: PostGatewayTypes.ISearchPost) {
		const index = searchClient.initIndex("posts");
		const data = await index.search(input.query, {
			page: input.page,
			hitsPerPage: 10
		})
			.then((data) => data)
			.catch(() => {
				throw new HttpError({
					name: "Unauthorized",
					code: 401,
					message: "Could not get content"
				});
			});
 
		return {
			posts: data.hits.map((item) => {
				const post = AlgoliaHitMapper.format(item as IAlgoliaHitObject);
				post.name = post.name.length >= 30
					? post.name.slice(0, 31) + "..."
					: post.name;
				post.description = post.description.length >= 50
					? post.description.slice(0, 51) + "..."
					: post.description;
				return {
					id: item.objectID,
					...post
				};
			}),
			pages: data.nbPages
		};
	}

	async search(
		input: PostGatewayTypes.ISearchPost
	): Promise<PostGatewayTypes.ISearchPostReturn> {
		const unparsedData = await this.getPostsBySearch(input);
		const promiseArray = unparsedData.posts.map(async (item) => {
			const shape: IExpectedGetPostBody = {
				...item,
				imageURI: item.image.URI,
				createdAt: new Date(item.createdAt),
				updatedAt: new Date(item.updatedAt)
			};
			const dto = new GetPostDTO();
			await dto.exec(shape);
 
			return {
				id: item.id,
				post: PostMapper.toClass(item)
			};
		});
		return {
			pages: unparsedData.pages,
			posts: await Promise.all(promiseArray)
		};
	}
}

