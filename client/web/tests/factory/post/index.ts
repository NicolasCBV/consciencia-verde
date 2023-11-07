import { Post } from "@/@core/domain/entities/post";

type TOverride = Partial<Post>;

export function postFactory(input?: TOverride) {
	return new Post({
		name: "default post name",
		description: "default post description",
		content: ["default content"],
		image: {
			URI: "default URI",
			file: new File(["foo"], "foo.txt", {
				type: "text/plain",
			}),
		},
		...input,
	});
}
