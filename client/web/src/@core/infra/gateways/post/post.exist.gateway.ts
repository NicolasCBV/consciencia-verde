import { firestore } from "@/@core/config/firebase.config";
import { PostGateway } from "@/@core/domain/gateways/post.gateway";
import { PostGatewayTypes } from "@/@core/domain/gateways/types/post.gateway-types";
import { HttpError } from "@/@core/errors/HttpError";
import { collection, doc, getDoc } from "firebase/firestore";
import { injectable } from "inversify";

@injectable()
export class ExistentPostGateway implements PostGateway.ExistentPostGateway {
	private formatData(input: string) {
		const name = encodeURIComponent(input);
		return name;
	}

	private async checkIfExist(input: string): Promise<boolean> {
		const postCollections = collection(firestore, "posts");

		const ref = doc(postCollections, input);
		return await getDoc(ref)
			.then((snapshot) => {
				return snapshot.exists();
			})
			.catch(() => {
				throw new HttpError({
					name: "Unauthorized",
					code: 401,
					message: "Could not send image",
				});
			});
	}

	async exist(input: PostGatewayTypes.IExistPost) {
		const name = this.formatData(input.name);
		const data = await this.checkIfExist(name);
		return data;
	}
}
