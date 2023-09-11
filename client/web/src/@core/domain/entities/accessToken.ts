import { User } from "./user";

export interface IAccessToken {
  deviceId: string | null;
  email: string;
  exp: number;
  iat: number;
  sub: string;
  type: "access_token",
  userData: User;
}

export class AccessToken {
	private readonly props: IAccessToken;

	constructor(input: IAccessToken) {
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

	get userData(): User {
		return this.props.userData;
	}
}
