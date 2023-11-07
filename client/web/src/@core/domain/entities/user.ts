export interface IUser {
	name: string;
	description: null | string;
	imageUrl: null | string;
	createdAt: string;
	updatedAt: string;
}

export class User {
	private props: IUser;

	constructor(input: IUser) {
		this.props = input;
	}

	get name(): string {
		return this.props.name;
	}

	get description(): null | string {
		return this.props.description;
	}

	get imageUrl(): null | string {
		return this.props.imageUrl;
	}

	get createdAt(): string {
		return this.props.createdAt;
	}

	get updatedAt(): string {
		return this.props.updatedAt;
	}
}
