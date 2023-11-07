export interface IRefreshToken {
	deviceId: string | null;
	email: string;
	exp: number;
	iat: number;
	sub: string;
	type: "refresh_token";
}

export class RefreshToken {
	private readonly props: IRefreshToken;

	constructor(input: IRefreshToken) {
		this.props = input;
	}

	get deviceId(): string | null {
		return this.props.deviceId;
	}

	get email(): string {
		return this.props.email;
	}

	get exp(): number {
		return this.props.exp;
	}

	get iat(): number {
		return this.props.iat;
	}

	get sub(): string {
		return this.props.sub;
	}
}
