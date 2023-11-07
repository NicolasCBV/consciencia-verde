import { Post } from "@/@core/domain/entities/post";

export interface IPostObject {
	name: string;
	image: {
		URI?: string;
		file?: File | null;
	};
	description: string;
	content: string[];
	createdAt: string;
	updatedAt: string;
}

export class PostMapper {
	static toObject(input: Post): IPostObject {
		return {
			name: input.name,
			description: input.description,
			image: {
				URI: input.image.URI,
				file: input.image.file ?? null,
			},
			content: input.content,
			createdAt: new Date(input.createdAt).toUTCString(),
			updatedAt: new Date(input.updatedAt).toUTCString(),
		};
	}

	static toClass(input: IPostObject): Post {
		return new Post({
			...input,
			createdAt: new Date(input.createdAt),
			updatedAt: new Date(input.updatedAt),
		});
	}
}
