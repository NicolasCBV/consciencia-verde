interface IProps {
  name: string;
  message: string
  code?: number;
}

export class StorageError extends Error {
	code: number | undefined;

	constructor(input: IProps) {
		super();

		this.name = input.name;
		this.message = input.message;
		this.code = input.code;
	}
}
