interface IProps {
  name: string;
  message: string;
  postId: string;
}

export class PostError extends Error {
	postId: string;

	constructor(input: IProps) {
		super();

		this.name = input.name;
		this.message = input.message;
		this.postId = input.postId;
	}
}
