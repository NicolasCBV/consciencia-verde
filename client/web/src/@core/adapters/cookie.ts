export interface IPropsMakeCookie {
	name: string;
	value: string;
	options: Partial<{
		priority: "low" | "medium" | "high";
		encode: () => string;
		maxAge: number;
		httpOnly: boolean;
		secure: boolean;
		domain: string;
		path: string;
		expires: Date;
		sameSite: "strict" | "lax" | "none";
	}>;
}

export interface IPropsParseCookies {
	cookie: string;
	options?: {
		decode: () => string;
	};
}

export abstract class CookieAdapter {
	abstract make(input: IPropsMakeCookie): string;
	abstract parse(input: IPropsParseCookies): Record<string, string>;
}
